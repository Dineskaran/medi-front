import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserDetailsService } from '../services/user-details.service';
import { MainService } from '../services/main.service';
import { NurseDutyService } from '../services/nurse-duty.service';
import { FormsModule } from '@angular/forms';
import {  MatButtonModule} from "@angular/material/button";
import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatBadgeModule } from "@angular/material/badge";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatToolbarModule } from "@angular/material/toolbar";
import {  MatMenuModule} from "@angular/material/menu";
import {  MatIconModule} from "@angular/material/icon";
// import {  MatButtonModule} from "@angular/material/button";
import {  MatSidenavModule} from "@angular/material/sidenav";
import {  MatListModule} from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from '@angular/material/form-field';
import{MatTabsModule} from '@angular/material/tabs'

@Component({
  selector: 'app-search-report',
  standalone: true,
  imports: [CommonModule,FormsModule,MatButtonModule,MatMenuModule],
  templateUrl: './search-report.component.html',
  styleUrl: './search-report.component.css'
})
export class SearchReportComponent {
  __user:UserDetailsService=inject(UserDetailsService)
  __main:MainService=inject(MainService);
  __nurse:NurseDutyService=inject(NurseDutyService);

  duty_countArray:any=[]
  getreports:boolean=false;

  isAddNew:boolean=true;
  isAddNew_1:boolean=false;

  ngOnInit(): void{
    this.loaddutycount();
  }

  changeclick(){
    this.isAddNew=false;
  }

  start_date_str:string='';
  end_date_str:string='';


  loaddutycount(){
    this.__nurse.getduty_Count(this.start_date_str,this.end_date_str).subscribe((resultList) => {
      this.duty_countArray=[]
      resultList.forEach((countobj:any)=>{
        console.log("dutycounts",countobj)
        let a:any =JSON.parse(countobj)
        this.duty_countArray.push(a)
        })
        })
  }


}
