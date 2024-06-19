import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dropdown } from '../model/dropdown';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private httpclient:HttpClient, private router:Router) { }
  currentUrlValue!:string;
  currentUrl(){
    return this.router.url;
  }
  ngOnInit(){
    this.currentUrlValue = this.router.url;
    
    console.log("mainurls: ", this.currentUrlValue);
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
    return this.httpclient.get<Dropdown[]>(`${this.URL}/insert_drop_down`,{params:paramList});
  } 

}
