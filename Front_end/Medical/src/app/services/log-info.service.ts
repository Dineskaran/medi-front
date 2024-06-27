import { Injectable } from '@angular/core';
import { LogInfo } from '../model/log-info';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInfoService {

  constructor(private httpclient:HttpClient, private __main : MainService) { }

  isMinimized:boolean =true;
  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;

  
  // loginfoObj:LogInfo={
  //     id:0,
  //     user_details:"",
  //     log_date:"",
  //     log_time:"",
  //     location:"",
  //     log_out_time:"",
  //     num_of_attempt:"",
  //     log_status:"",
  // }




}
