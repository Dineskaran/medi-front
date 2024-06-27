import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LogInfoService } from '../services/log-info.service';
import { LogInfo } from '../model/log-info';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-log-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-info.component.html',
  styleUrl: './log-info.component.css'
})
export class LogInfoComponent {

  __user:UserDetailsService=inject(UserDetailsService);


  ngOnInit(): void{
    this.LoadLoginfo();

  }

  LoadLoginfo(): void {
    this.__user.getAllLoginfo().subscribe((resultList)=> {
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
