import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ProgramService } from '../../../services/program.service';
import { Program } from '../../../models/program.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  currentUser: User | null = null;
  subscribedPrograms: Program[] = [];

  constructor(
    private authService: AuthService,
    private programService: ProgramService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      this.loadSubscribedPrograms();
    }
  }

  loadSubscribedPrograms() {
    if (this.currentUser?.subscribedPrograms) {
      this.currentUser.subscribedPrograms.forEach(programId => {
        this.programService.getProgram(programId).subscribe({
          next: (program) => {
            this.subscribedPrograms.push(program);
          }
        });
      });
    }
  }
}