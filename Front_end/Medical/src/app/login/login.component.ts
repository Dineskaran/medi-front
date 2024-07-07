import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { MainService } from '../services/main.service';
import { UserDetailsService } from '../services/user-details.service';
import { LogInfo } from '../model/log-info';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,AppComponent,FormsModule,MatProgressBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  __main:MainService=inject(MainService);
  __user:UserDetailsService=inject(UserDetailsService);


  constructor(private router: Router) {}

  isBlocked: boolean = false;
  blockMessage: string = '';
  userid: string = 'Mat01';
  password: string = 'Dineskaran13#';
  privilege: string = '';

  LoginList:Login[]=[];
  num_of_attempt=0;


  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.__user.loginfoObj.location = `Lat: ${lat}, Lng: ${lng}`;
      }, (error) => {
        console.error('Error getting location', error);
        this.__user.loginfoObj.location = 'Unknown';
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.__user.loginfoObj.location = 'Geolocation not supported';
    }
  }



  message:string=''

    log_user():void {
      this.__user.isLogined = false;
      this.__user.login_user(this.userid, this.password).subscribe((resultList) => {
        this.__user.loginfoObj.userid=this.userid;
        this.num_of_attempt= this.num_of_attempt + 1
        this.__user.loginfoObj.num_of_attempt=this.num_of_attempt;
        resultList.forEach((obj:any)=>{
          let a:any =JSON.parse(obj);
          this.__user.loginfoObj.log_status=a.status
          

          if (a.status === "Success") {
            this.__user.loginfoObj.user_details_id= a.id
            this.__user.insertLoginfo().subscribe((data)=>
              {
                // this.message="user login successfully"
                this.message=a.status
                this.__user.isLogined = true;
                // alert("Add successfully"+ data)

                this.__user.loginfoObj.id= Number(data)
              })

            // alert('Loggedin successful!');
            sessionStorage.setItem('user',a.userid)

            this.__user.loggedUserObj = a;
            
            this.router.navigate(['/dashboard']); // Navigate to dashboard on successful login

          } else {

            // alert("Log status " + a.status)
            this.__user.isLogined = false;
            this.message=a.status
            if(this.num_of_attempt>2){
              // this.blockUser(a.id);
              this.__user.insertLoginfo().subscribe((data)=>
                {
                  // alert("Add successfully"+ data)
                  alert("Too many login attempts. Your account has been blocked. Please contact the admin.")
                })
            }
            // } else {
            //   alert("Log status: " + a.status + ". Please try again.");
            // }

          }
        })
        })
    }


    // blockUser(userId: number): void {
    //   this.__user.blockUser(userId).subscribe(() => {
    //     this.isBlocked = true;
    //     this.blockMessage = 'Too many login attempts. Your account has been blocked. Please contact the admin.';
    //     this.__user.resetLoginInfo();
    //   }, error => {
    //     console.error('There was an error blocking the user!', error);
    //   });
    // }













}


