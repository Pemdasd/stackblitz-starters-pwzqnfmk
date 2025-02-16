export interface Course {
  id?: number;
  programId: number;
  name: string;
  semester: string;
  group: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}