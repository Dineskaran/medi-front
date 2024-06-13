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
    paramList = new HttpParams().set('filter_by',filter_by.toString());
    return this.httpclient.get<Dropdown[]>(`${this.URL}/get_drop_down`,{params:paramList});
  } 

}
