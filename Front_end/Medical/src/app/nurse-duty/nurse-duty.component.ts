import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseDuty } from '../model/nurse-duty';
import { NurseDutyService } from '../services/nurse-duty.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

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

  ngOnInit(): void{

    this.loadAllNurseduty();
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
}
