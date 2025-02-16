export interface Discussion {
  id?: number;
  title: string;
  content: string;
  userId: number;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}