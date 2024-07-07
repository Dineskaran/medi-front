import { Injectable } from '@angular/core';
import { PersonDetails } from '../model/person-details';
import { MainService } from './main.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {

  constructor(private httpclient:HttpClient, private __main : MainService) { }

  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;

  person_detailsList:PersonDetails[] = []

  person_detailsObj:PersonDetails={

    id:0,
    person_type:"",
    person_no:"",
    first_name:"",
    last_name:"",
    date_of_birth:"",
    gender:"",
    civil_status:"",
    nic:"",
    effect:"",
    effect_type:"",
    effect_status:"",
    effect_reason:"",
    effect_date:"",
    is_bed_sore:"",
    contact_number:"",
    address :"",
    district:"",
    now_status:"",

  }


  changeOption(){

    this.isAddNew = !this.isAddNew;
    this.clearPersonObj()

  }

  editPerson(i:number):void {
    this.person_detailsObj=this.person_detailsList[i];
    this.isAddNew=!this.isAddNew;
    this.editflag = true;
    this.index = i;



  }


  saveNurseduty(){
    if(this.editflag==false)
      {
        this.person_detailsList.push(this.person_detailsObj);
      }

      else{

        this.person_detailsList[this.index]=this.person_detailsObj;
        this.editflag=false;
      }

      this.clearPersonObj()
  }

  clearPersonObj(){
    this.person_detailsObj={

      id:0,
      person_type:"",
      person_no:"",
      first_name:"",
      last_name:"",
      date_of_birth:"",
      gender:"",
      civil_status:"",
      nic:"",
      effect:"",
      effect_type:"",
      effect_status:"",
      effect_reason:"",
      effect_date:"",
      is_bed_sore:"",
      contact_number:"",
      address:"",
      district:"",
      now_status:"",

    }

  }

  isMinimized:boolean =true;

  minimizedToggle(){
    this.isMinimized = !this.isMinimized;
  }


  insertpersonDetails():Observable<PersonDetails[]>{
    console.log(this.person_detailsObj)
    return this.httpclient.post<PersonDetails[]>(`${this.__main.URL}/insert_prson_details`,this.person_detailsObj);
  }



  deletepersonDetail(id:number){
    console.log("Id is " + id)
    const params = new HttpParams().set('id', id.toString());
    // return this.httpclient.delete<HomeAdmistion>(`${this.__main.URL+"/delete?id"}/${id}`);
    return this.httpclient.delete<PersonDetails>(`${this.__main.URL}/delete_prson_details`, { params });

  }


}
