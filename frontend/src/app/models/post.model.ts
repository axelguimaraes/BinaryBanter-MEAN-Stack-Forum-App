export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  thread: string;
  createdAt: Date;
  updatedAt: Date;
}
