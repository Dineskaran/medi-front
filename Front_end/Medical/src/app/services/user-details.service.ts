import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { UserDetails } from '../model/user-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private httpclient:HttpClient, private __main : MainService) { }

  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;


  isMinimized:boolean =true;
  
  minimizedToggle(){
    this.isMinimized = !this.isMinimized;
  }


  userdetailsList:UserDetails[] = []
 

  changeOption(){ 
    
    this.isAddNew = !this.isAddNew;
    
   
  }

  // userdetailsObj:UserDetails={
  //   id:0,
  //   userid:"",
  //   user_name:"",
  //   password:"",
  //   privilege:"",
  //   create_date:"",
  //   create_by:"",

  // }

  insertuserDetails(userObj:UserDetails):Observable<UserDetails[]>{
    console.log(userObj)
    return this.httpclient.post<UserDetails[]>(`${this.__main.URL}/insert_user_details`,userObj);
  } 


  getAll_user_DetailsList():Observable<UserDetails[]>{
    return this.httpclient.get<UserDetails[]>(`${this.__main.URL}/insert_user_details`);
  } 

  // getAll_user_Details(id:number):Observable<UserDetails>{
  //   const params = new HttpParams().set('id', id.toString());
  //   return this.httpclient.get<UserDetails>(`${this.__main.URL}/manage_user_details`, { params });
  // } 

  delete_user_Details(id:number){
    console.log("Id is " + id)
    const params = new HttpParams().set('id', id.toString());
    // return this.httpclient.delete<HomeAdmistion>(`${this.__main.URL+"/delete?id"}/${id}`);
    return this.httpclient.delete<UserDetails>(`${this.__main.URL}/manage_user_details`, { params });

  }


    


}
