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


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,AppComponent,FormsModule,],
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
  password: string = '123';
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



    log_user():void {
      this.__user.login_user(this.userid, this.password).subscribe((resultList) => {
        this.__user.loginfoObj.userid=this.userid;
        // this.__user.loginfoObj.location='kilinochchi';
        this.num_of_attempt= this.num_of_attempt + 1
        this.__user.loginfoObj.num_of_attempt=this.num_of_attempt;

        resultList.forEach((obj:any)=>{
           let a:any =JSON.parse(obj);
           this.__user.loginfoObj.log_status=a.status

           if (a.status === "Success") {
            this.__user.loginfoObj.user_details_id= a.id
            this.__user.insertLoginfo().subscribe((data)=>
              {
                // alert("Add succesfully"+ data)
                this.__user.loginfoObj.id= Number(data)
              })

            alert('Loggedin successfull!');
            sessionStorage.setItem('user',a.userid)

            this.__user.loggedUserObj = a;
            this.__user.isLogined = true;
            this.router.navigate(['/dashboard']); // Navigate to dashboard on successful login

          } else {

            alert("Log status " + a.status)
            if(this.num_of_attempt>2){
              // this.blockUser(a.id);
              this.__user.insertLoginfo().subscribe((data)=>
                {
                  // alert("Add succesfully"+ data)
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


