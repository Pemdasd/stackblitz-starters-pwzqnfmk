export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isApproved: boolean;
  subscribedPrograms: number[];
  createdAt: Date;
}