import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  pendingUsers: User[] = [];
  approvedUsers: User[] = [];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.subscribeToNotifications();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.pendingUsers = users.filter(user => !user.isApproved);
        this.approvedUsers = users.filter(user => user.isApproved);
      },
      error: (error) => {
        this.notificationService.notifyError('Failed to load users');
      }
    });
  }

  approveUser(userId: number) {
    this.authService.approveUser(userId).subscribe({
      next: () => {
        this.notificationService.notifySuccess('User approved successfully');
        this.loadUsers();
      },
      error: (error) => {
        this.notificationService.notifyError('Failed to approve user');
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe({
        next: () => {
          this.notificationService.notifySuccess('User deleted successfully');
          this.loadUsers();
        },
        error: (error) => {
          this.notificationService.notifyError('Failed to delete user');
        }
      });
    }
  }

  private subscribeToNotifications() {
    this.notificationService.adminNotifications$.subscribe(message => {
      this.loadUsers();
    });
  }
}