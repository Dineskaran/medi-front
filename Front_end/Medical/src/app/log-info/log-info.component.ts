import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LogInfoService } from '../services/log-info.service';
import { LogInfo } from '../model/log-info';
import { UserDetailsService } from '../services/user-details.service';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-log-info',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatMenuModule],
  templateUrl: './log-info.component.html',
  styleUrl: './log-info.component.css'
})
export class LogInfoComponent {

  __user:UserDetailsService=inject(UserDetailsService);


  ngOnInit(): void{
    this.LoadLoginfo();

  }

  start_date: string = '';
  end_date: string = '';

  LoadLoginfo(): void {
    this.__user.getAllLoginfo(this.start_date, this.end_date).subscribe((resultList)=> {
      this.__user.logInfoList = []
      resultList.forEach((item:any)=>{
        // console.log(goods)
        let a:LogInfo =JSON.parse(item)
        this.__user.logInfoList.push(a)
        console.log("Loginfo", a)
     })
    })
  }


}
