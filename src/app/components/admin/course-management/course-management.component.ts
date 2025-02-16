import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { ProgramService } from '../../../services/program.service';
import { NotificationService } from '../../../services/notification.service';
import { Course } from '../../../models/course.model';
import { Program } from '../../../models/program.model';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courseForm: FormGroup;
  courses: Course[] = [];
  programs: Program[] = [];
  selectedProgram: Program | null = null;
  isEditing = false;
  selectedCourseId: number | null = null;
  semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
  groups = ['A', 'B', 'C', 'D'];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private programService: ProgramService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      programId: ['', Validators.required],
      name: ['', Validators.required],
      semester: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      videoUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPrograms();
    this.route.params.subscribe(params => {
      if (params['programId']) {
        this.courseForm.patchValue({ programId: params['programId'] });
        this.loadCoursesByProgram(params['programId']);
      } else {
        this.loadAllCourses();
      }
    });
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

  loadAllCourses() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        this.notificationService.notifyError('Failed to load courses');
      }
    });
  }

  loadCoursesByProgram(programId: number) {
    this.courseService.getCoursesByProgram(programId).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        this.notificationService.notifyError('Failed to load courses');
      }
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const courseData = {
        ...this.courseForm.value,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (this.isEditing && this.selectedCourseId) {
        this.courseService.updateCourse(this.selectedCourseId, courseData).subscribe({
          next: () => {
            this.notificationService.notifySuccess('Course updated successfully');
            this.resetForm();
            this.loadCoursesByProgram(courseData.programId);
          },
          error: (error) => {
            this.notificationService.notifyError('Failed to update course');
          }
        });
      } else {
        this.courseService.createCourse(courseData).subscribe({
          next: () => {
            this.notificationService.notifySuccess('Course created successfully');
            this.resetForm();
            this.loadCoursesByProgram(courseData.programId);
          },
          error: (error) => {
            this.notificationService.notifyError('Failed to create course');
          }
        });
      }
    }
  }

  editCourse(course: Course) {
    this.isEditing = true;
    this.selectedCourseId = course.id!;
    this.courseForm.patchValue({
      programId: course.programId,
      name: course.name,
      semester: course.semester,
      group: course.group,
      description: course.description,
      imageUrl: course.imageUrl,
      videoUrl: course.videoUrl
    });
  }

  deleteCourse(courseId: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.notificationService.notifySuccess('Course deleted successfully');
          this.loadCoursesByProgram(this.courseForm.get('programId')?.value);
        },
        error: (error) => {
          this.notificationService.notifyError('Failed to delete course');
        }
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.selectedCourseId = null;
    this.courseForm.reset();
    if (this.route.snapshot.params['programId']) {
      this.courseForm.patchValue({ programId: this.route.snapshot.params['programId'] });
    }
  }

  onProgramChange(programId: string) {
    if (programId) {
      this.loadCoursesByProgram(Number(programId));
    }
  }
}