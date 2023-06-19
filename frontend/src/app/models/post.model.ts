import { Thread } from "./thread.model";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  thread: Thread;
  createdAt: Date;
  createdBy: string;
  upvotes: number;
  downvotes: number;
  tags: string[]
}
