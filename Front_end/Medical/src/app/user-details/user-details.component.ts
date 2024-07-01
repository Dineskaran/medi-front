import { Component, OnInit, inject } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
import { MainService } from '../services/main.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { UserDetails } from '../model/user-details';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,FormsModule,RouterLink,RouterModule,LoginComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  user_detailsService:UserDetailsService=inject(UserDetailsService)
  __main:MainService= inject(MainService)

  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;
  changeButton:boolean=false;

  user_detailReactiveForm!:FormGroup;
  // sessionStorage: any;

  ngOnInit():void{
    this.user_detailReactiveForm = new FormGroup({
      id:new FormControl(),
      userid:new FormControl('',[Validators.required]),
      user_name:new FormControl('',[Validators.required]),
      password:new FormControl(),
      confirmPassword:new FormControl(),
      privilege:new FormControl('',[Validators.required]),
    })

    this.loadAll_User();
    this.loguser();
    // this. getCurrentUserId();
    console.log(this.loadAll_User)
    this.user_detailsService.isLogined = localStorage.getItem('isLogined') === 'true';

  }

  changeOption(){
    this.user_detailsService.isAddNew = !this.user_detailsService.isAddNew;
    this.user_detailReactiveForm.reset();
    this.loadAll_User();
    this.changeButton= true;
  }

  edit_user(i:number){
    let user = this.user_detailsService.userdetailsList[i]
    this.populateForm(user);
    this.user_detailsService.isAddNew=!this.user_detailsService.isAddNew;
    this.editflag = true;
    this.index = i;
    this.changeButton= false;


  }
  populateForm(data:UserDetails){
    console.log("populateForm" ,data)
  this.user_detailReactiveForm.patchValue({
    id: <Number>data.id,
    userid: data.userid,
    user_name: data.user_name,
    privilege:data.privilege,
  })
  }



  loadAll_User():void{
    this.user_detailsService.getAll_user_DetailsList().subscribe((data)=>{
      this.user_detailsService.userdetailsList = []
      data.forEach((user:any) => {
        let x:UserDetails = JSON.parse(user)
        this.user_detailsService.userdetailsList .push(x)
        console.log(data)
      })

    })
  }


  getCurrentUserId(){

    // this.sessionStorage.getItem('create_by',this.user_detailsService.loggedUserObj)

  }



  insert_user_Details(){
    if (this.user_detailReactiveForm.valid) {
      const adminUserId = sessionStorage.getItem('user');
      console.log("current id ", adminUserId)

      const requestPayload = {
        ...this.user_detailReactiveForm.value,
        create_by: adminUserId
      };
      console.log("reactive form is valid",this.user_detailReactiveForm.valid)
      this.user_detailsService.insertuserDetails(requestPayload).subscribe((data)=>
        {
          console.log("reactive form value",this.user_detailReactiveForm.valid)
          alert("Add succesfully")
          this.loadAll_User();
          this.user_detailReactiveForm.reset();
          this.isAddNew = false;
          this.editflag=false;
        })
    }
    else{
          alert("Please fill all the fields")
        }
  }

  delete_user(id:number){
    this.user_detailsService.delete_user_Details(id)
    .subscribe((data)=>{
      alert("user details delete succesfully")
      this.loadAll_User();
    },
    (error)=>{
      alert("Error in deleting user details")
      })
  }


  loginArray:UserDetails[]=[];

  loguser():void{
    this.__main.getDropdownitems('privilege','').subscribe(( resultList)=>{
      this.loginArray = []
     resultList.forEach((loginArray:any)=>{
       let a:any =JSON.parse(loginArray)
       this.loginArray.push(a)
     })
    })
  }



}




