import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { UserDetails } from '../model/user-details';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { LogInfo } from '../model/log-info';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  isLogined:boolean=false;
  constructor(private httpclient:HttpClient, private __main : MainService, private router: Router,) {
    this.isLogined = localStorage.getItem('isLogined') === 'true';
  }

  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;
  isMinimized:boolean =true;

 loggedUserObj:UserDetails={} as UserDetails;

 loginfoObj:LogInfo={} as LogInfo;
 logInfoList: LogInfo[] = [];


 userid: string = 'Mat01';
 password: string = '123.0';
 num_of_attempt=0;

 resetLoginInfo(): void {
  this.userid = '';
  this.password = '';
  this.num_of_attempt = 0;
  this.loginfoObj = {} as LogInfo;
}

  

  logout(){

    if(this.isLogined){
       this.isLogined=false;
       this.insertLoginfo().subscribe((data)=>{// alert("update succesfully"+ data)
          })
        localStorage.removeItem('isLogined');
       this.router.navigate(['/']);
      }
      this.resetLoginInfo()
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
      return this.httpclient.get<any[]>(`${this.__main.URL}/login`,{params:paramList}).pipe(
        tap(() =>{
          this.isLogined = true;
          localStorage.setItem('isLogined', 'true');

        })
      );
    }

    change_password(userid:string,old_password:string,new_password:string):Observable<any>{
      let userobj={userid,
        old_password,
        new_password}
      return this.httpclient.post<any>(`${this.__main.URL}/change password`,userobj)
    }

    blockUser(userId: number): Observable<any> {
      return this.httpclient.post<any>(`${this.__main.URL}/blockuser`,{ user_id: userId })

    }

    getAllLoginfo():Observable<LogInfo[]>{
      return this.httpclient.get<LogInfo[]>(`${this.__main.URL}/insert_log_details`);
    }

    insertLoginfo():Observable<LogInfo[]>{
      console.log(this.loginfoObj)
      return this.httpclient.post<LogInfo[]>(`${this.__main.URL}/insert_log_details`,this.loginfoObj);
    }



}

