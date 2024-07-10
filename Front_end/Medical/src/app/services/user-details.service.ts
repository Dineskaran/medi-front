import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MainService } from './main.service';
import { UserDetails } from '../model/user-details';
import { Observable, tap ,throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LogInfo } from '../model/log-info';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  isEditMode: any;


  constructor(private httpclient:HttpClient, private router: Router,) {
    this.isLogined = localStorage.getItem('isLogined') === 'true';
  }

  __main : MainService=inject(MainService);
  __auth:AuthGuardService=inject(AuthGuardService);

  isLogined : boolean = false;
  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;
  isMinimized:boolean =true;


  loggedUserObj:UserDetails={} as UserDetails;
  loginfoObj:LogInfo={} as LogInfo;
  logInfoList: LogInfo[] = [];


  userid: string = 'Mat0';
  password: string = 'Dineskaran13#';
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
      this.insertLoginfo().subscribe((data)=>{// alert("update successfully"+ data)
          })
        // localStorage.removeItem('isLogined');
        this.__auth. logout();
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

  insertuserDetails(userObj:UserDetails):Observable<any>{
    console.log(userObj)
    return this.httpclient.post<any>(`${this.__main.URL}/insert_user_details`,userObj)
    .pipe(
      catchError(this.handleError)
    );
  }

  // check userid Availability

  checkUserIdAvailability(userid: string):Observable<any>{
    return this.httpclient.get<any>(`${this.__main.URL}/check_userid?userid=${userid}`)
    .pipe(
      catchError(this.handleError)
    );
  }




  getAll_user_DetailsList(start_date:string,end_date:string):Observable<UserDetails[]>{
    const paramList = new HttpParams()
      .set('start_date',start_date.toString())
      .set('end_date',end_date.toString())

    return this.httpclient.get<UserDetails[]>(`${this.__main.URL}/insert_user_details`,{params:paramList});
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

    getAllLoginfo(start_date:string,end_date:string):Observable<LogInfo[]>{
      const paramList = new HttpParams()
      .set('start_date',start_date.toString())
      .set('end_date',end_date.toString())
      return this.httpclient.get<LogInfo[]>(`${this.__main.URL}/insert_log_details`,{params:paramList});
    }

    insertLoginfo():Observable<LogInfo[]>{
      console.log(this.loginfoObj)
      return this.httpclient.post<LogInfo[]>(`${this.__main.URL}/insert_log_details`,this.loginfoObj);
    }


    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.error}`;
      }
      return throwError(() => new Error(errorMessage));
    }

}

