export interface Attendance {
  id?: number;
  userId: number;
  programId: number;
  date: Date;
  status: 'present' | 'absent';
  createdAt: Date;
  updatedAt: Date;
}