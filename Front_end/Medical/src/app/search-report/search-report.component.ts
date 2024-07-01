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

  isAddNew: boolean = true;
  isAddNew_1: boolean = false;

  duty_option: string = '';

  ngOnInit(): void {
    this.loadDutyoption();
    this.get_optionPerson();
  }

  changeclick() {
    this.isAddNew = false;
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
        console.error('ResultList is not an array:', resultList);
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
}
