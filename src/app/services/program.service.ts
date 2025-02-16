import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from '../models/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = 'http://localhost:3000/programs';

  constructor(private http: HttpClient) {}

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.apiUrl);
  }

  getProgram(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.apiUrl}/${id}`);
  }

  createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(this.apiUrl, program);
  }

  updateProgram(id: number, program: Program): Observable<Program> {
    return this.http.put<Program>(`${this.apiUrl}/${id}`, program);
  }

  deleteProgram(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}