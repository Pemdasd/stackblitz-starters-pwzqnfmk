import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProgramService } from '../../services/program.service';
import { NotificationService } from '../../services/notification.service';
import { Program } from '../../models/program.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  programs: Program[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private programService: ProgramService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      subscribedPrograms: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.programService.getPrograms().subscribe({
      next: (programs) => {
        this.programs = programs;
      },
      error: (error) => {
        this.notificationService.notifyError('Failed to load programs');
      }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        ...this.registerForm.value,
        role: 'user',
        isApproved: false,
        createdAt: new Date()
      };

      this.authService.register(userData).subscribe({
        next: () => {
          this.notificationService.notifyUser('Registration successful! Please wait for admin approval.');
          this.notificationService.notifyAdmin('New user registration pending approval');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.notificationService.notifyError(error.message || 'Registration failed');
        }
      });
    }
  }
}