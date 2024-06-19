import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,AppComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';


  user: string = 'user01';
  logpass: string ='12345';

 

  isLoggedIn: boolean = false;

  constructor(private router: Router, private loginService: LoginService){}


  login(){
    if(this.username === this.user && this.password === this.logpass){
      this.isLoggedIn = true;
      alert("Login Success")
      this.router.navigate(['/homeadmision']);

    } else {
      alert("Invalid username or password") ;
      this.isLoggedIn = false;
      }


  // login() {
  //   this.errorMessage = '';
  //   this.loginService.login({ username: this.username, password: this.password })
  //     .subscribe(
  //       (isLoggedIn) => {
  //         if (isLoggedIn) {
  //           this.router.navigate(['/']); // Redirect to desired URL after successful login
  //         } else {
  //           this.errorMessage = 'Invalid credentials';
  //         }
  //       },
  //       (error: any) => {
  //         console.error(error);
  //         this.errorMessage = 'An error occurred. Please try again later.';
  //       }
  //     );
  // }
}
}
