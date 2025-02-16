export interface LiveClass {
  id?: number;
  programId: number;
  title: string;
  description: string;
  link: string;
  scheduledAt: Date;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}