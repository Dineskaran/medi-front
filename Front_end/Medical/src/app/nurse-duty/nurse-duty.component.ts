import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseDuty } from '../model/nurse-duty';
import { NurseDutyService } from '../services/nurse-duty.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { PersonDetails } from '../model/person-details';
import { PersonDetailsService } from '../services/person-details.service';

@Component({
  selector: 'app-nurse-duty',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,FormsModule,RouterLink,RouterModule],
  templateUrl: './nurse-duty.component.html',
  styleUrl: './nurse-duty.component.css'
})
export class NurseDutyComponent {
  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =false;

  nurse_dutyService:NurseDutyService=inject(NurseDutyService)
  person_detailsService:PersonDetailsService=inject(PersonDetailsService)

  ngOnInit(): void{

    this.loadAllNurseduty();
    this.loadAllPersondetails();
  }


  loadAllNurseduty(): void {
    this.nurse_dutyService.getAllNurseduty().subscribe((resultList) => {
      this.nurse_dutyService.nurse_dutyList = []
     resultList.forEach((goods:any)=>{
      console.log(goods)
       let a:NurseDuty =JSON.parse(goods)
       this.nurse_dutyService.nurse_dutyList .push(a)
       console.log(goods)
     })
    })
  }

  
  insertNursedutyDetails(){
    // debugger

      let getData = this.nurse_dutyService.insertnursedutydetails();
      getData.subscribe(data=>{
        // console.log(data);
        alert("Nurse Duty details succesfully Added")
        this.loadAllNurseduty();
        this.nurse_dutyService.clearDutyObj()
        // this.nurse_dutyService.nurse_dutyObj=new <class name> () model class using 
      },error=>{
        console.log(error);
        alert("Error try again")
      })
    // }
  }

  deleteNurseduty(id:number){
    debugger
    this.nurse_dutyService.deleteNursedutyDetail(id)
    .subscribe((result)=>{
      alert("Home admission details succesfully delete")
      this.loadAllNurseduty();
    },
    error=>{
      console.log(error);
      alert("Error try again")
    });
    
  }




  loadAllPersondetails():void{
    this.person_detailsService.getAllPerson('').subscribe(( resultList)=>{
      this.person_detailsService.person_detailsList = []
     resultList.forEach((person:any)=>{
      // console.log(person)
       let a:PersonDetails =JSON.parse(person)
       this.person_detailsService.person_detailsList .push(a)
      //  console.log(person)
     })
    })
  }
}
