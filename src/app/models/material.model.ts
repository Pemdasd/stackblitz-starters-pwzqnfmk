export interface Material {
  id?: number;
  programId: number;
  title: string;
  description: string;
  fileUrl: string;
  type: 'pdf' | 'doc';
  likes: number;
  comments: Comment[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id?: number;
  userId: number;
  content: string;
  createdAt: Date;
}