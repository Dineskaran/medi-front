import { Injectable } from '@angular/core';
import { HomeAdmistion } from '../model/home-admistion';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class HomeAdmistionService   {


  constructor(private httpclient:HttpClient, private __main : MainService) { }

  isAddNew: boolean =true;
  editflag: boolean = false;
  index: number=1;
  dischargeButton:boolean=false;

  home_admistionList:HomeAdmistion [] =[]
  home_dischargeObj:HomeAdmistion[]=[]


  home_admistionObj : HomeAdmistion = {

    id:0 ,
    person_details_id:0,
    if_new:0,
    disease: "",
    admission_date: "",
    room_no: "",
    given_things: "",
    is_go_clinic:0,
    hospital_name: "",
    bed_sores_status: "",
    act_independently:0,
    toilet_managing: "",
    urine_managing: "",
    work_in_uyirilai: "",
    discharge_date: "",
    discharge_reason: "",
    note: "",
    person_details_first_name:'',
    person_details_last_name:''

  }


  changeOption(){

    this.isAddNew = !this.isAddNew;
    this.clearhomeObj()
    this.dischargeButton=false;

  }


  editAdmistion(i:number):void {

    console.log(this.home_admistionObj)
    this.home_admistionObj=this.home_admistionList[i];
    this.isAddNew=!this.isAddNew;
    this.editflag = true;
    this.index = i;
    this.dischargeButton=false;
  }


  dischargePerson(i:number){
    // console.log(this.home_admistionObj)
    this.home_admistionObj=this.home_admistionList[i];
    this.isAddNew=!this.isAddNew;
    this.editflag = true;
    this.index = i;
    this.dischargeButton=true;

  }



  saveAdmisstion(){
    if(this.editflag==false)
        {
          this.home_admistionList.push(this.home_admistionObj);
        }

      else{

          this.home_admistionList[this.index]=this.home_admistionObj;
          this.editflag=false;
      }

      this.clearhomeObj()

    }

  clearhomeObj(){
    this.home_admistionObj = {

      id:0 ,
      person_details_id:0,
      if_new: 0,
      disease: "",
      admission_date: "",
      room_no: "",
      given_things: "",
      is_go_clinic:0,
      hospital_name: "",
      bed_sores_status: "",
      act_independently:0,
      toilet_managing: "",
      urine_managing: "",
      work_in_uyirilai: "",
      discharge_date: "",
      discharge_reason: "",
      person_details_first_name:'',
      person_details_last_name:'',
      note: ""


    }

  }

  isMinimized:boolean =true;

  minimizedToggle(){
    this.isMinimized = !this.isMinimized;
  }

    homeadmistioninsertdetails():Observable<HomeAdmistion[]>{
      console.log(this.home_admistionObj)
    return this.httpclient.post<HomeAdmistion[]>(`${this.__main.URL}/home_admission_insert`,this.home_admistionObj);

  }

  getAllHomeadmition(start_date:string,end_date:string):Observable<HomeAdmistion[]>{
    const paramList = new HttpParams()
    .set('start_date',start_date.toString())
    .set('end_date',end_date.toString())

    return this.httpclient.get<HomeAdmistion[]>(`${this.__main.URL}/home_admission_insert`,{params:paramList});
  }


  deleteHomeadmissionDetail(id:number){
    // console.log("Id is " + id)
    // console.log(`${this.__main.URL+"/delete?"}/${id}`)

    const params = new HttpParams().set('id', id.toString());
    // return this.httpclient.delete<HomeAdmistion>(`${this.__main.URL+"/delete?id"}/${id}`);
    return this.httpclient.delete<HomeAdmistion>(`${this.__main.URL}/delete`, { params });

  }
}
