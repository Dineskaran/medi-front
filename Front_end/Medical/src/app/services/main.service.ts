import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dropdown } from '../model/dropdown';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private httpclient:HttpClient) { }

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
