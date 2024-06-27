import { CommonModule } from '@angular/common';
import { Component,OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserDetailsService } from '../services/user-details.service';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule,AppComponent,FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  __user:UserDetailsService=inject(UserDetailsService);
  __main:MainService=inject(MainService);
  constructor(private router: Router) {}

  isAddNew:boolean=false

  confirmpassword:string='';
  new_password:string='';
  old_password: string='';
  userlogid:string | null='';

  changeOption(){

    // this.isAddNew = !this.isAddNew;
    this.router.navigate([this.__main.previousUrlvalue])

  }


  ngOnInit(){
    this.userlogid = sessionStorage.getItem('user');
    if(this.userlogid === null){
      alert('please login first');
    }
  }
  changepassword(): void {
    if (this.userlogid) {
      console.log("check log user id is:", this.userlogid);
      if (this.new_password === this.confirmpassword) {
        console.log("password matched");
        this.__user.change_password(this.userlogid, this.old_password, this.new_password).subscribe((response )=> {
          response.forEach((obj:any)=>{
            let a:any = JSON.parse(obj);
            if(a.status==="changed successfully"){
              alert("Password changed successfully");
              this.__user.isLogined = false;
              this.router.navigate(['/']);
            }else{
              alert("Old password is incorrect");
            }
          })
        })
      }else{
        alert("password not matched");
      }


      }
    }
}
