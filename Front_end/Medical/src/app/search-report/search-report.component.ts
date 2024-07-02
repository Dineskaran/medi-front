import { Component, inject } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
import { MainService } from '../services/main.service';
import { NurseDutyService } from '../services/nurse-duty.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-report',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatMenuModule],
  templateUrl: './search-report.component.html',
  styleUrls: ['./search-report.component.css']
})
export class SearchReportComponent {
  __user: UserDetailsService = inject(UserDetailsService)
  __main: MainService = inject(MainService);
  __nurse: NurseDutyService = inject(NurseDutyService);

  duty_countArray: any[] = [];
  duty_optionArray: any[] = [];
  getreports: boolean = false;

  isAddNew: boolean = false;
  isAddNew_1: boolean = false;
  isAddNew_2: boolean = false;
  showdate:boolean=false;

  duty_option: string = '';

  date_option:string='';
  end_date:string='';
  start_date:string='';


  ngOnInit(): void {
    this.loadDutyoption();
    this.get_optionPerson();
  }

  showdate_1(){
    this.showdate=true;
  }

  changeclick() {
    this.isAddNew = true;

    this.isAddNew_1 =false;
    this.isAddNew_2 = false;
  }
  changeclick_1() {
    this.isAddNew_1 =true;

    this.isAddNew=false;
    this.isAddNew_2 =false;
  }
  changeclick_2() {
    this.isAddNew_2 = true;

    this.isAddNew=false;
    this.isAddNew_1 =false;
    }



  start_date_str: string = '';
  end_date_str: string = '';

  loaddutycount() {
    this.__nurse.getduty_Count(this.start_date_str, this.end_date_str).subscribe(resultList => {
      this.duty_countArray = [];
      // Check if resultList is an array before using map
      if (Array.isArray(resultList)) {
        this.duty_countArray = resultList.map(countobj => JSON.parse(countobj));
      } else {
        // console.error('ResultList is not an array:', resultList);
      }
    });
  }

  loadDutyoption(): void {
    this.__main.getDropdownitems('DutyOption', '').subscribe(resultList => {
      this.duty_optionArray = [];
      // Check if resultList is an array before using map
      if (Array.isArray(resultList)) {
        this.duty_optionArray = resultList.map(item => typeof item === 'string' ? JSON.parse(item) : item);
      } else {
        console.error('ResultList is not an array:', resultList);
      }
    });
  }

  getoptionpersons: any[] = [];

  get_optionPerson() {
    if (this.duty_option.trim() !== '') {
      this.__main.get_dutyperson(this.duty_option).subscribe(resultList => {
        this.getoptionpersons = [];
        // Check if resultList is an array before using map
        if (Array.isArray(resultList)) {
          this.getoptionpersons = resultList.map(item => JSON.parse(item));
        } else {
          console.error('ResultList is not an array:', resultList);
        }
      });
    } else {
      console.error('duty_option is empty or undefined');
    }
  }

  reportlist:any[]=[];

  home_person_report() {
    this.__main.get_home_person_report(this.date_option, this.start_date, this.end_date).subscribe(
      reportlist => {
        // Check if reportlist is an array before using it
        if (Array.isArray(reportlist)) {
          this.reportlist = reportlist;
          console.log("Report list:", reportlist);
        } else {
          console.error('Report list is not an array:', reportlist);
        }
      },
      error => {
        console.error('Error fetching report list:', error);
      }
    );
}
}
