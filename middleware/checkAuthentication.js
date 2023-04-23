module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log("You must log in!");
        res.redirect("/");
    }
}