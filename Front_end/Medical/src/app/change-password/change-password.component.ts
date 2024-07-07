import { CommonModule } from '@angular/common';
import { Component,OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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

  currentPasswordError: string = '';
  newPasswordError: string = '';
  confirmPasswordError: string = '';

  changeOption(){

    // this.isAddNew = !this.isAddNew;
    this.router.navigate([this.__main.previousUrlvalue])

  }


  ngOnInit(){
    this.userlogid = sessionStorage.getItem('user');
    if(this.userlogid === null){
      alert('please login first');
      this.router.navigate(['/login']);
    }
  }

  validatePassword(password: string): [boolean, string] {
    if (password.length < 8 || password.length > 16) {
      return [false, "Password must be between 8 and 16 characters."];
    }
    if (!/[A-Z]/.test(password)) {
      return [false, "Password must at least one uppercase letter."];
    }
    if (!/[a-z]/.test(password)) {
      return [false, "Password must at least one lowercase letter."];
    }
    if (!/[0-9]/.test(password)) {
      return [false, "Password must  at least one number."];
    }
    if (!/[\W_]/.test(password)) {
      return [false, "Password must at least one special character."];
    }
    return [true, ""];
  }

  changepassword(form: any): void {
    if (form.valid && this.userlogid) {
      const [isValidPassword, passwordError] = this.validatePassword(this.new_password);
      if (!isValidPassword) {
        this.newPasswordError = passwordError;
        return;
      }

      if (this.new_password !== this.confirmpassword) {
        this.confirmPasswordError = "Password and confirm password do not match.";
        return;
      }

      this.__user.change_password(this.userlogid, this.old_password, this.new_password).subscribe(response => {
        response.forEach((obj: any) => {
          let a: any = JSON.parse(obj);
          if (a.status === "changed successfully") {
            alert("Password changed successfully");
            this.__user.isLogined = false;
            this.router.navigate(['/']);
          } else {
            this.currentPasswordError = "Old password is incorrect";
          }
        });
      });
    }
  }
}
