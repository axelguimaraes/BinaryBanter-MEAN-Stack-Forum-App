export interface Thread {
  _id: string;
  name: string;
  description: string;
  createdBy: string; // Assuming it represents the user ID
  author: string;
  posts: string[]; // Assuming it represents an array of post IDs
  createdAt: Date;
}
