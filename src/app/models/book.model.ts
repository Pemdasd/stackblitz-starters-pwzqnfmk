export interface Book {
  id?: number;
  title: string;
  description: string;
  fileUrl: string;
  likes: number;
  comments: Comment[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}