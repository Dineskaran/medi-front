import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { MainService } from '../services/main.service';
import { UserDetailsService } from '../services/user-details.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,AppComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  __main:MainService=inject(MainService);
  __user:UserDetailsService=inject(UserDetailsService);


  constructor(private router: Router) {}


  userid: string = 'Mat01';
  password: string = 'Mat01#';
  privilege: string = '';


  LoginList:Login[]=[];


    // ngOnInit(){
    //   this.loadAll_User_log();

    // }

    log_user():void {
      this.__user.login_user(this.userid, this.password).subscribe((resultList) => {
        resultList.forEach((obj:any)=>{
           let a:any =JSON.parse(obj)
           if (a.status === "Success") {
            alert('Loggedin successfull!');
            this.__user.loggedUserObj = a;
            this.__user.isLogined = true;
            this.router.navigate(['/dashboard']); // Navigate to dashboard on successful login
          } else {
            alert("Log status " + a.status)
          }
         })
        })
    }













}


