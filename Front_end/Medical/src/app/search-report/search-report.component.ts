import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserDetailsService } from '../services/user-details.service';
import { MainService } from '../services/main.service';
import { NurseDutyService } from '../services/nurse-duty.service';

@Component({
  selector: 'app-search-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-report.component.html',
  styleUrl: './search-report.component.css'
})
export class SearchReportComponent {
  __user:UserDetailsService=inject(UserDetailsService)
  __main:MainService=inject(MainService);
  __nurse:NurseDutyService=inject(NurseDutyService);

  duty_countArray:any=[]

  isAddNew:boolean=true;

  ngOnInit(): void{
    this.loaddutycount();
  }

  changeclick(){
    this.isAddNew=!this.isAddNew;
  }

  changeclick1(){
    this.isAddNew=!this.isAddNew;
  }

  changeclick2(){
    this.isAddNew=!this.isAddNew;
  }

  loaddutycount():void{
    this.__nurse.getduty_Count().subscribe((resultList) => {
      this.duty_countArray=[]
      resultList.forEach((countobj:any)=>{
        console.log("dutycounts",countobj)
        let a:any =JSON.parse(countobj)
        this.duty_countArray.push(a)
        })
        })
  }

}
