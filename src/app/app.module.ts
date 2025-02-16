import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { UserProgramsComponent } from './components/user/user-programs/user-programs.component';
import { UserCoursesComponent } from './components/user/user-courses/user-courses.component';
import { UserMaterialsComponent } from './components/user/user-materials/user-materials.component';
import { UserQuizzesComponent } from './components/user/user-quizzes/user-quizzes.component';
import { UserLiveClassesComponent } from './components/user/user-live-classes/user-live-classes.component';
import { UserForumComponent } from './components/user/user-forum/user-forum.component';
import { UserBooksComponent } from './components/user/user-books/user-books.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProgramManagementComponent,
    CourseManagementComponent,
    MaterialManagementComponent,
    QuizManagementComponent,
    LiveClassManagementComponent,
    ForumManagementComponent,
    BookManagementComponent,
    AttendanceManagementComponent,
    UserProgramsComponent,
    UserCoursesComponent,
    UserMaterialsComponent,
    UserQuizzesComponent,
    UserLiveClassesComponent,
    UserForumComponent,
    UserBooksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }