export interface Question {
  id?: number;
  courseId: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  createdAt: Date;
  updatedAt: Date;
}