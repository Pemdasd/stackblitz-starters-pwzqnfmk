import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../../../services/program.service';
import { NotificationService } from '../../../services/notification.service';
import { Program } from '../../../models/program.model';

@Component({
  selector: 'app-program-management',
  templateUrl: './program-management.component.html',
  styleUrls: ['./program-management.component.css']
})
export class ProgramManagementComponent implements OnInit {
  programForm: FormGroup;
  programs: Program[] = [];
  isEditing = false;
  selectedProgramId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private notificationService: NotificationService
  ) {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
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
    if (this.programForm.valid) {
      const programData = {
        ...this.programForm.value,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (this.isEditing && this.selectedProgramId) {
        this.programService.updateProgram(this.selectedProgramId, programData).subscribe({
          next: () => {
            this.notificationService.notifySuccess('Program updated successfully');
            this.resetForm();
            this.loadPrograms();
          },
          error: (error) => {
            this.notificationService.notifyError('Failed to update program');
          }
        });
      } else {
        this.programService.createProgram(programData).subscribe({
          next: () => {
            this.notificationService.notifySuccess('Program created successfully');
            this.resetForm();
            this.loadPrograms();
          },
          error: (error) => {
            this.notificationService.notifyError('Failed to create program');
          }
        });
      }
    }
  }

  editProgram(program: Program) {
    this.isEditing = true;
    this.selectedProgramId = program.id!;
    this.programForm.patchValue({
      name: program.name,
      description: program.description,
      imageUrl: program.imageUrl
    });
  }

  deleteProgram(programId: number) {
    if (confirm('Are you sure you want to delete this program?')) {
      this.programService.deleteProgram(programId).subscribe({
        next: () => {
          this.notificationService.notifySuccess('Program deleted successfully');
          this.loadPrograms();
        },
        error: (error) => {
          this.notificationService.notifyError('Failed to delete program');
        }
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.selectedProgramId = null;
    this.programForm.reset();
  }
}