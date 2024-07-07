import { Injectable, inject } from '@angular/core';
import { NurseDuty } from '../model/nurse-duty';
import { MainService } from './main.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NurseDutyService {

  constructor(private httpclient:HttpClient, private __main : MainService) { }


  isMinimized:boolean =true;
  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;

  nurse_dutyList:NurseDuty[] = []

  nurse_dutyObj:NurseDuty={
    id:0,
    date:"",
    time:"",
    person_details_id:0,
    person_type:"",
    duty_option:"",
    note:"",
    by_whom:"Ramani",
    designation:"Uyirilai nurse",
    person_details_first_name:'',
    person_details_last_name:''

  }


  changeOption(){

    this.isAddNew = !this.isAddNew;
    this.clearDutyObj()

  }

  editNurseduty(i:number):void {
    this.nurse_dutyObj=this.nurse_dutyList[i];
    this.isAddNew=!this.isAddNew;
    this.editflag = true;
    this.index = i;
  }

  // saveNurseduty(){
  //   if(this.editflag==false)
  //     {
  //       this.nurse_dutyList.push(this.nurse_dutyObj);
  //     }

  //     else{

  //       this.nurse_dutyList[this.index]=this.nurse_dutyObj;
  //       this.editflag=false;
  //     }

  //     this.clearDutyObj()
  // }

  clearDutyObj(){
    this.nurse_dutyObj={
      id:0,
      date:"",
      time:"",
      person_details_id:0,
      person_type:"",
      duty_option:"",
      note:"",
      designation:"Uyirilai nurse",
      by_whom:"Ramani",
      person_details_first_name:'',
      person_details_last_name:''

    }

  }



  minimizedToggle(){
    this.isMinimized = !this.isMinimized;
  }


  insertnursedutydetails():Observable<NurseDuty[]>{
    console.log(this.nurse_dutyObj)
    return this.httpclient.post<NurseDuty[]>(`${this.__main.URL}/insert_nurse_duty`,this.nurse_dutyObj);
  }



  deleteNursedutyDetail(id:number){
    console.log("Id is " + id)
    const params = new HttpParams().set('id', id.toString());
    // return this.httpclient.delete<HomeAdmistion>(`${this.__main.URL+"/delete?id"}/${id}`);
    return this.httpclient.delete<NurseDuty>(`${this.__main.URL}/delete_nurse_duty_details`, { params });

  }
  getAllNurseduty(start_date_str:string,end_date_str:string):Observable<NurseDuty[]>{
    const paramList = new HttpParams()
    .set('start_date_str',start_date_str.toString())
    .set('end_date_str',end_date_str.toString())
    return this.httpclient.get<NurseDuty[]>(`${this.__main.URL}/insert_nurse_duty`,{params:paramList});
  }

  // duty_option count get

  getduty_Count(start_date_str:string,end_date_str:string):Observable<any[]>{
    const paramList = new HttpParams()
    .set('start_date_str',start_date_str.toString())
    .set('end_date_str',end_date_str.toString())
    console.log("start_date ", start_date_str, 'end_date ', end_date_str);
    return this.httpclient.get<any[]>(`${this.__main.URL}/count_duty_option`,{params:paramList});
    // return this.httpclient.post<any[]>(`${this.__main.URL}/count_duty_option`);
  }
}

