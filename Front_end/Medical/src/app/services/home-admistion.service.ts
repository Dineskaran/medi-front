import { Injectable } from '@angular/core';
import { HomeAdmistion } from '../model/home-admistion';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class HomeAdmistionService   {
  
  
  isAddNew: boolean =true;
  editflag: boolean = false;
  index: number=1;
    

  constructor(private httpclient:HttpClient, private __main : MainService) { }

  home_admistionObj : HomeAdmistion = {

    id:0 ,
    person_details: "",
    if_new: "",
    disease: "",
    admission_date: "",
    room_no: "",
    given_things: "",
    is_go_clinic: "",
    hospital_name: "",
    bed_source_image: "",
    able_to_act_independently: "",
    toilet_managing: "",
    urine_managing: "",
    work_in_uyirilai: "",
    discharge_date: "",
    discharge_reason: "",
    note: "",
     
  }
  

  addnew(){

    this.isAddNew=!this.isAddNew;
  }


  editAdmistion(i:number):void {

    this.home_admistionObj=this.home_admistionList[i];
    this.isAddNew=!this.isAddNew;
    this.editflag = true;
    this.index = i;

    

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

    this.home_admistionObj = {

      id:0 ,
      person_details: "",
      if_new: "",
      disease: "",
      admission_date: "",
      room_no: "",
      given_things: "",
      is_go_clinic: "",
      hospital_name: "",
      bed_source_image: "",
      able_to_act_independently: "",
      toilet_managing: "",
      urine_managing: "",
      work_in_uyirilai: "",
      discharge_date: "",
      discharge_reason: "",
      note: ""
      
            
    }

  } 
  home_admistionList:HomeAdmistion [] =[]
  // home_admistionList:HomeAdmistion [] =[

  //   {
    
  //     id:0 ,
  //     person_details:'string',
  //     if_new: "string",
  //     disease:"string",
  //     admission_date:"string",
  //     room_no:"string", 
  //     given_things:"string",
  //     is_go_clinic:"string",
  //     hospital_name:"string",
  //     bed_source_image:"string",
  //     able_to_act_independently:"string",
  //     toilet_managing:"string",
  //     urine_managing:"string",
  //     work_in_uyirilai:"string",
  //     discharge_date:"string",
  //     discharge_reason:"string",
  //     note:"string",
  //   },
  //   {

  //     id:0 ,  
  //     person_details:"string",
  //     if_new:"string",
  //     disease:"string",
  //     admission_date:"string",
  //     room_no:"string",
  //     given_things:"string",
  //     is_go_clinic:"string",
  //     hospital_name:"string",
  //     bed_source_image:"string",
  //     able_to_act_independently:"string",
  //     toilet_managing:"string",
  //     urine_managing:"string",
  //     work_in_uyirilai:"string",
  //     discharge_date:"string",
  //     discharge_reason:"string",
  //     note:"string",
  //   },
  // ]

  

  insert_homeadmisstion:HomeAdmistion[]=[];
  httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})} 
  

  isMinimized:boolean =true;
  
  minimizedToggle(){
    this.isMinimized = !this.isMinimized;
  }
  // homeadmisioninsertUrl="http://127.0.0.1:8000/userservice/home_admission_insert";

  // homeadmistioninsertdetails(data:HomeAdmistion):Observable<HomeAdmistion[]>{
    homeadmistioninsertdetails():Observable<HomeAdmistion[]>{
    return this.httpclient.post<HomeAdmistion[]>(`${this.__main.URL}/home_admission_insert`,this.home_admistionObj);


  } 

  
  getAllHomeadmition():Observable<HomeAdmistion[]>{
    return this.httpclient.get<HomeAdmistion[]>(`${this.__main.URL}/home_admission_insert`);
  } 

 
  deleteHomeadmissionDetail(id:number){
    console.log("Id is " + id)
    console.log(`${this.__main.URL+"/delete?"}/${id}`)
    const params = new HttpParams().set('id', id.toString());
    // return this.httpclient.delete<HomeAdmistion>(`${this.__main.URL+"/delete?id"}/${id}`);
    return this.httpclient.delete<HomeAdmistion>(`${this.__main.URL}/delete`, { params });

  }
}
