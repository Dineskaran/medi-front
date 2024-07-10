import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<any>();
  notification$ = this.notificationSubject.asObservable();

  constructor() { }

  showMessage(message: string, type: 'success' | 'error') {
    this.notificationSubject.next({ message, type });
  }
}
