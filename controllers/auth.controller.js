const jwt = require("jsonwebtoken");
const config = require("../jwt/config");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const AuthModel = require("../models/auth.model");

let authController = {};

// User registration
authController.register = (req, res) => {
  const { username, email, password } = req.body;

  UserModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }

        const user = new UserModel({
          username,
          email,
          password: hashedPassword,
        });

        user
          .save()
          .then((createdUser) => {
            res.status(201).json(createdUser);
          })
          .catch((error) => {
            res.status(500).json({ error: "Internal server error" });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// User login and generate JWT token
authController.login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }

        if (!isMatch) {
          return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email },
          config.secret,
          { expiresIn: "1h" }
        );

        // Save auth model in the database
        const auth = new AuthModel({
          user: user._id,
          token: token,
          expiresIn: 3600000, // 1 hour in milliseconds
        });

        auth
          .save()
          .then(() => {
            res.cookie("auth-token", token, {
              maxAge: 3600000,
              httpOnly: true,
            });
            res.status(200).json({ token });
          })
          .catch((error) => {
            res.status(500).json({ error: "Internal server error" });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Check if user is authenticated
authController.isAuthenticated = (req, res, next) => {
  const token = req.cookies["auth-token"]; // Access 'auth-token' cookie

  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userId = decoded.userId;

    AuthModel.findOne({ token })
      .then((auth) => {
        if (!auth) {
          return res
            .status(401)
            .json({ error: "Token doesnt exist in database" });
        }

        req.userId = userId;
        next();
      })
      .catch((error) => {
        console.error("Error saving post:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  });
};

// User logout and revoke JWT token
authController.logout = (req, res) => {
  const token = req.cookies["auth-token"]; // Access 'auth-token' cookie

  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }

  AuthModel.findOneAndDelete({ token })
    .then((deletedToken) => {
      if (!deletedToken) {
        return res.status(404).json({ error: "Token not found" });
      }
      res.clearCookie("auth-token"); // Clear the 'auth-token' cookie
      res.status(200).json({ message: "Logout successful" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = authController;
