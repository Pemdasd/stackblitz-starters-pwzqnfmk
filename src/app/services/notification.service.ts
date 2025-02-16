import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private adminNotifications = new Subject<string>();
  adminNotifications$ = this.adminNotifications.asObservable();

  constructor(private toastr: ToastrService) {}

  notifyAdmin(message: string) {
    this.adminNotifications.next(message);
    this.toastr.info(message, 'Admin Notification');
  }

  notifyUser(message: string) {
    this.toastr.success(message, 'Notification');
  }

  notifyError(message: string) {
    this.toastr.error(message, 'Error');
  }
}