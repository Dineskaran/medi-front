import { Component,inject,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdmistionService } from '../services/home-admistion.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeAdmistion } from '../model/home-admistion';
import { RouterLink, RouterModule } from '@angular/router';



@Component({
  selector: 'app-home-admistion',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,FormsModule,RouterLink,RouterModule],
  templateUrl: './home-admistion.component.html',
  styleUrl: './home-admistion.component.css'
})
export class HomeAdmistionComponent implements OnInit{

  home_AdmistionService:HomeAdmistionService = inject(HomeAdmistionService)
  homeAdmistion!:HomeAdmistion;
  // homeAdmissionList:HomeAdmistion[]=[];
  HomeAdmistionReactiveForm !: FormGroup;

  ngOnInit(): void {

    this.HomeAdmistionReactiveForm = new FormGroup({
      
      id:new FormControl(),
      person_details:new FormControl('',[Validators.required,]),
      if_new:new  FormControl('',[Validators.required,]),
      disease:new FormControl('',[Validators.required,]),
      admission_date:new FormControl('',[Validators.required,]),
      room_no:new FormControl('',[Validators.required,]),
      given_things:new FormControl('',[Validators.required,]),
      is_go_clinic:new FormControl('',[Validators.required,]),
      hospital_name:new FormControl('',[Validators.required,]),
      bed_source_image:new FormControl('',[Validators.required,]),
      able_to_act_independently:new FormControl('',[Validators.required,]),
      toilet_managing:new FormControl('',[Validators.required,]),
      urine_managing:new FormControl('',[Validators.required,]),
      work_in_uyirilai:new FormControl('',[Validators.required,]),
      discharge_date:new FormControl('',[Validators.required,]),
      discharge_reason:new FormControl('',[Validators.required,]),
      note:new FormControl('')
      })

      this.loadAllAdmitions();

  }

  // home_admistionObj : HomeAdmistion = {

  //   id:0 ,
  //   person_details: "",
  //   if_new: "",
  //   disease: "",
  //   admission_date: "",
  //   room_no: "",
  //   given_things: "",
  //   is_go_clinic: "",
  //   hospital_name: "",
  //   bed_source_image: "",
  //   able_to_act_independently: "",
  //   toilet_managing: "",
  //   urine_managing: "",
  //   work_in_uyirilai: "",
  //   discharge_date: "",
  //   discharge_reason: "",
  //   note: ""
    
          
  // }
  loadAllAdmitions(): void {
    this.home_AdmistionService.getAllHomeadmition().subscribe((resultList) => {
      this.home_AdmistionService.home_admistionList = []
   
     resultList.forEach((goods:any)=>{
      console.log(goods)
       let a:HomeAdmistion =JSON.parse(goods)
       this.home_AdmistionService.home_admistionList .push(a)
      //  console.log(goods)
     })
    })
  }
  deleteHomeadmission(id:number){
    debugger
    this.home_AdmistionService.deleteHomeadmissionDetail(id)
    .subscribe((result)=>{
      alert("Home admission details succesfully delete")
      this.loadAllAdmitions();
    },
    error=>{
      console.log(error);
      alert("Error try again")
    });
    
  }

  insertHomeAddmissionDetails(){
    debugger
    // if(this.HomeAdmistionReactiveForm.valid){
      // let getData = this.home_AdmistionService.homeadmistioninsertdetails(this.HomeAdmistionReactiveForm.value);
      let getData = this.home_AdmistionService.homeadmistioninsertdetails();
      getData.subscribe(data=>{
        console.log(data);
        alert("Home admission details succesfully Added")
        this.loadAllAdmitions();
        this.HomeAdmistionReactiveForm.reset();
      },error=>{
        console.log(error);
        alert("Error try again")
      })
    // }
  }
  
 
}
