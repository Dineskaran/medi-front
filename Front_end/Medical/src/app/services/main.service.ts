import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dropdown } from '../model/dropdown';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MainService {
location: any;
  // constructor(private httpclient:HttpClient, private router:Router) { }
  constructor(private httpClient:HttpClient,private http:HttpClient,@Inject(DOCUMENT) private document: HTMLDocument,private router:Router) {
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.previousUrlvalue = this.currentUrlValue;
        this.currentUrlValue = event.urlAfterRedirects;
      }
    })
    //this is for show an alert message as would you like to reload the page it will not work properly

  }

// privilege:string="Admin";
checkadmin:boolean=true;
index: number=1;

isAddNew:boolean=true;


  previousUrlvalue!:string;
  currentUrlValue!:string;
  currentUrl(){
    return this.router.url;
  }
  ngOnInit(){
    this.currentUrlValue = this.router.url;
    // this.get_home_person_report("admision_date","2024-01-01","2024-07-02")


  }

  //this is the method for store the router value
  showBar():boolean{
    if(this.currentUrlValue === '/'){
      return false;
    }else if(this.currentUrlValue === '/change-password'){
      return false;
    }else{
      return true;
    }
  }

  isMinimized:boolean=true;
  toggle(){
    this.isMinimized=!this.isMinimized;
  }
  URL = "http://127.0.0.1:8000/userservice"

  getDropdownitems(list_type:string,filter_by:string):Observable<Dropdown[]>{
    let paramList = new HttpParams().set('list_type',list_type.toString());
    paramList.set('filter_by',filter_by.toString());
    console.log("list_type ",list_type , 'filter_by ',filter_by)
    return this.httpClient.get<Dropdown[]>(`${this.URL}/insert_drop_down`,{params:paramList});
  }


  get_dutyperson(duty_option: string): Observable<any> {
    let paramList = new HttpParams().set('duty_option', duty_option.toString());
    console.log("show the details ", duty_option)
    return this.httpClient.get<any>(`${this.URL}/nurse_duty_report`, { params: paramList });
  }

  get_home_person_report(date_option: string, start_date: string, end_date: string): Observable<any> {
    let paramList = new HttpParams()
      .set('date_option', date_option.toString())
      .set('start_date', start_date.toString())
      .set('end_date', end_date.toString());
    console.log("date_option", date_option, 'start_date', start_date, 'end_date', end_date);
    return this.httpClient.get<any>(`${this.URL}/home_admission_report`, { params: paramList });
  }


  print(): void {
    window.print();
    // console.log(message);
  }


}
