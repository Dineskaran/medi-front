import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
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


  user_name: string = '';
  // password: string = '';
  privilege: string = '';


  user: string = 'user01';
  password: string ='12345';

  LoginList:Login[]=[];


    ngOnInit(){
      this.loadAll_User_log();

    }

  loadAll_User_log():void{
   
    this. __user.getAll_user_DetailsList().subscribe((data)=>{
      this.LoginList = []
      data.forEach((user:any) => { 
        let x:Login = JSON.parse(user)
        this.LoginList .push(x)
      })

    })
  }
 

  // isLoggedIn: boolean = false;

  constructor(private router: Router,private http:HttpClient){
    
  }


  // login(){
  //   if(this.user_name === this. user_name&& this.password === this.password){
  //     this.LoginList.forEach((user:Login) => { 
  //     this.__main.logde("user")
  //     this.__user.isLogined = true;
  //     alert("Login Success")
  //     this.router.navigateByUrl('/dashboard');
  //     })

  //   } else {
  //     alert("Invalid username or password") ;
  //     this.__user.isLogined = false;
  //     }

    
  // }
  

  // login(){
  //   debugger
  //   this.LoginList.forEach((user:Login) =>{
  //     if(user !== null){
  //       if(this.user_name === user.user_name && this.password === user.password){
  //         console.log(this.LoginList)
  //         // this.isLoggedIn = true;
  //         this.__main.logde(user.privilege)
  //         this.__user.isLogined = false;
  //         alert("Login Success")
  //         this.router.navigateByUrl('dashboard')
  //         }
        

  //     }
      
  //   },(_error: any)=>{
  //     alert("Invalid username or password")
  //     this.__user.isLogined = false;
  //     })

  //   }
  // }


  


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

}


