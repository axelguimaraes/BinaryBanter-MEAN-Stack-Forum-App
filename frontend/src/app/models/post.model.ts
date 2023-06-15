export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  thread: string;
  createdAt: Date;
  createdBy: string;
  upvotes: number;
  downvotes: number;
  tags: string[]
}
