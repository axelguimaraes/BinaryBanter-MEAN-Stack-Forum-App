export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  thread: string;
  image?: string; // Updated field to reflect the non-required image
  createdAt: Date;
  updatedAt: Date;
}
