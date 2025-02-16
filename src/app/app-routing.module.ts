import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { ProgramManagementComponent } from './components/admin/program-management/program-management.component';
import { CourseManagementComponent } from './components/admin/course-management/course-management.component';
import { MaterialManagementComponent } from './components/admin/material-management/material-management.component';
import { QuizManagementComponent } from './components/admin/quiz-management/quiz-management.component';
import { LiveClassManagementComponent } from './components/admin/live-class-management/live-class-management.component';
import { ForumManagementComponent } from './components/admin/forum-management/forum-management.component';
import { BookManagementComponent } from './components/admin/book-management/book-management.component';
import { AttendanceManagementComponent } from './components/admin/attendance-management/attendance-management.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'programs', component: ProgramManagementComponent },
      { path: 'courses', component: CourseManagementComponent },
      { path: 'materials', component: MaterialManagementComponent },
      { path: 'quizzes', component: QuizManagementComponent },
      { path: 'live-classes', component: LiveClassManagementComponent },
      { path: 'forum', component: ForumManagementComponent },
      { path: 'books', component: BookManagementComponent },
      { path: 'attendance', component: AttendanceManagementComponent }
    ]
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'programs', component: UserProgramsComponent },
      { path: 'courses', component: UserCoursesComponent },
      { path: 'materials', component: UserMaterialsComponent },
      { path: 'quizzes', component: UserQuizzesComponent },
      { path: 'live-classes', component: UserLiveClassesComponent },
      { path: 'forum', component: UserForumComponent },
      { path: 'books', component: UserBooksComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }