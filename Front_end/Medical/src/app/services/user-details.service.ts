import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { UserDetails } from '../model/user-details';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  LoginList: any;
  http: any;

  constructor(private httpclient:HttpClient, private __main : MainService, private router: Router,) { }

  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;
  isMinimized:boolean =true;


  isLogined:boolean=false;

 loggedUserObj:UserDetails={} as UserDetails;

  logout(){

    if(this.isLogined){

        this.isLogined=false;
       this.router.navigate(['/']);

      }
  }

  minimizedToggle(){
   this.isMinimized = !this.isMinimized;
  }

  userdetailsList:UserDetails[] = []

  changeOption(){

    this.isAddNew = !this.isAddNew;

  }


  insertuserDetails(userObj:UserDetails):Observable<UserDetails[]>{
    console.log(userObj)
    return this.httpclient.post<UserDetails[]>(`${this.__main.URL}/insert_user_details`,userObj);
  }


  getAll_user_DetailsList():Observable<UserDetails[]>{
    return this.httpclient.get<UserDetails[]>(`${this.__main.URL}/insert_user_details`);
  }

  delete_user_Details(id:number){
    console.log("Id is " + id)
    const params = new HttpParams().set('id', id.toString());
    return this.httpclient.delete<UserDetails>(`${this.__main.URL}/manage_user_details`, { params });

  }

    login_user(userid:string,password:string):Observable<any[]>{
      let paramList = new HttpParams()
      .set('userid', userid)
      .set('password', password);
      console.log("userid ", userid, 'password ', password);
      return this.httpclient.get<any[]>(`${this.__main.URL}/login`,{params:paramList});
    }

    // change_password():Observable<any>{
    //   return this.httpclient.post<any>(`${this.__main.URL}/change password`);

    // }


}

