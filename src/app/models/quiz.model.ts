export interface Quiz {
  id?: number;
  programId: number;
  name: string;
  duration: number;
  questions: QuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id?: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizSubmission {
  id?: number;
  quizId: number;
  userId: number;
  answers: { [key: string]: string };
  score: number;
  submittedAt: Date;
}