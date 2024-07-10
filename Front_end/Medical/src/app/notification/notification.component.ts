import { Component, inject, OnInit } from '@angular/core';




@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  message: string = '';
  type: 'success' | 'error' | '' = '';
  visible: boolean = false;


  constructor(__notification:NotificationComponent=inject(NotificationComponent)) { }

  // ngOnInit() {
  //   this.__notification.notification$.subscribe(notification => {
  //     this.message = notification.message;
  //     this.type = notification.type;
  //     this.visible = true;
  //     setTimeout(() => this.visible = false, 3000);
  //   });
  // }

}
