import { Component, OnInit, inject } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
import { MainService } from '../services/main.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { UserDetails } from '../model/user-details';
import { LoginComponent } from '../login/login.component';
import { Observable, map } from 'rxjs';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from "primeng/floatlabel"
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,CardModule,FormsModule,ReactiveFormsModule,FormsModule,RouterLink,RouterModule,LoginComponent,DropdownModule,FloatLabelModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {



  user_detailsService:UserDetailsService=inject(UserDetailsService)
  __main:MainService= inject(MainService)

  user_detailReactiveForm!:FormGroup;
  privilegeArray: any;
  selectedPrivilege:string='privilage';
  MAX_PRIVILEGE_LENGTH: any;
  constructor(private formBuilder: FormBuilder){}

  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;
  changeButton:boolean=false;

  loginArray:UserDetails[] =[]


  message: string = '';
  errorMessage: string = '';
  useridAvailable: boolean | null = null;

  selectedprivilage:UserDetails  |undefined;

  start_date: string = '';
  end_date: string = '';


  // message1:string='';
  Search:boolean=false;

  input(str_date:string){
    // this.__main.checkDate(this.start_date);
    // this.__main.checkDate(this.end_date);
    if(this.__main.checkDate(str_date)){
      this.message="";
      this.Search=false;
    }
    else{
      this.message="Please enter valid date";
      this.Search=true;
    
      }
  }



  ngOnInit(): void {
    this.user_detailReactiveForm = this.formBuilder.group({
      id: new FormControl(),
      userid: new FormControl('', [Validators.required], [this.checkUserIdAvailability()]),
      user_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required]),
      privilege: new FormControl('', [Validators.required])
    });

    this.user_detailReactiveForm.valueChanges.subscribe(() => {
      this.checkpassword();
    });


    this.loadAll_User();
    this.loguser();
    this.loginArray=[]
    // console.log(this.loadAll_User)
    this.user_detailsService.isLogined = localStorage.getItem('isLogined') === 'true';

  }

  checkpassword() {
    const password = this.user_detailReactiveForm.value.password;
  const confirmPassword = this.user_detailReactiveForm.value.confirmPassword;

  if (password && confirmPassword && password === confirmPassword
    && password.length >= 8 && password.length <= 16) {
    return true;
  } else {
    return false;
  }
}


  checkUserIdAvailability(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.user_detailsService.checkUserIdAvailability(control.value).pipe(
        map(response => {
          this.useridAvailable = response.available;
          return response.available ? null : { useridTaken: true };
        })
      );
    };
  }



  insert_user_Details() {
    if (this.user_detailReactiveForm.valid && this.useridAvailable) {
      const adminUserId = sessionStorage.getItem('user');
      const requestPayload = {
        ...this.user_detailReactiveForm.value,
        create_by: adminUserId
      };

      this.user_detailsService.insertuserDetails(requestPayload).subscribe((data) => {
          this.message = data.message;
          this.errorMessage = '';
          this.user_detailReactiveForm.reset();
          this.loadAll_User()
          this.isAddNew = false;
          this.editflag=false;
        },
        (error) => {
          this.errorMessage = error;
          this.message = '';

        }
      );
    } else {
      this.message = 'Please fill all the fields and ensure UserID is available';
      // alert("Please fill all the fields and ensure UserID is available");
    }
  }

  changeOption(){
    this.user_detailsService.isAddNew = !this.user_detailsService.isAddNew;

    this.loadAll_User();
    this.user_detailReactiveForm.reset();
    this.changeButton= true;
  }

  edit_user(i:number){
    let user = this.user_detailsService.userdetailsList[i]
    this.populateForm(user);
    this.user_detailsService.isAddNew=!this.user_detailsService.isAddNew;
    this.editflag = true;
    this.index = i;
    this.changeButton= false;
    // this.user_detailReactiveForm.reset();


  }
  populateForm(data:UserDetails){
    console.log("populateForm" ,data)
  this.user_detailReactiveForm.patchValue({
    id: <Number>data.id,
    userid: data.userid,
    user_name: data.user_name,
    privilege:data.privilege,
    password:"Dineskaran1#",
    confirmPassword:"Dineskaran1#"
  })
  }



  loadAll_User():void{
    this.user_detailsService.getAll_user_DetailsList(this.start_date, this.end_date).subscribe((data)=>{
      this.user_detailsService.userdetailsList = []
      data.forEach((user:any) => {
        let x:UserDetails = JSON.parse(user)
        this.user_detailsService.userdetailsList .push(x)
        console.log(data)
      })

    })
  }

  // insert_user_Details(){
  //   debugger
  //   if (this.user_detailReactiveForm.valid) {
  //     const adminUserId = sessionStorage.getItem('user');
  //     console.log("current id ", adminUserId)

  //     const requestPayload = {
  //       ...this.user_detailReactiveForm.value,
  //       create_by: adminUserId
  //     };
  //     console.log("reactive form is valid",this.user_detailReactiveForm.valid)

  //     {
  //       this.user_detailsService.insertuserDetails(requestPayload).subscribe((data)=>
  //         {
  //           // console.log("reactive form value",this.user_detailReactiveForm.valid)
  //           alert("Add successfully")
  //           this.loadAll_User();
  //           this.user_detailReactiveForm.reset();
  //           this.isAddNew = false;
  //           this.editflag=false;
  //         })
  //     }


  //   }
  //   else{
  //         alert("Please fill all the fields")
  //       }
  // }

  delete_user(id:number){
    this.user_detailsService.delete_user_Details(id)
    .subscribe((data)=>{
      alert("user details delete successfully")
      this.loadAll_User();
    },
    (error)=>{
      alert("Error in deleting user details")
      })
  }





  loguser(): void {
    this.__main.getDropdownitems('privilege', '').subscribe((resultList) => {
      this.loginArray = [];
      resultList.forEach((loginArray: any) => {
        let a: any = JSON.parse(loginArray);
        console.log(a); // Log the data to inspect it
        if (a.privilege) {
          a.privilege = a.privilege.trim(); // Remove any leading/trailing whitespace
        }
        this.loginArray.push(a);
      });
    });
  }

  onPrivilegeChange(event: any) {
    console.log('Selected privilege:', this.selectedPrivilege);
  }

}








