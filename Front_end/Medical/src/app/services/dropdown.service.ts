import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Dropdown } from '../model/dropdown';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpclient:HttpClient, private __main : MainService) { }

  isMinimized:boolean =true;
  editflag:boolean=false;
  index: number=1;
  isAddNew: boolean =true;

  drop_downList:Dropdown[] = [];

  drop_DownObj:Dropdown={
    id:0,
    list_type:"Bywhom",
    list_value:"",
    filter_by:"",

  }


   changeOption(){
    this.isAddNew=!this.isAddNew;
    this.clearDroplist();
   }

   clearDroplist(){
    this.drop_DownObj={
      id:0,
      list_type:"",
      list_value:"",
      filter_by:"",
      }
   }

   edit_Dropdown(i:number):void{
    this.drop_DownObj = this.drop_downList[i];
    this.editflag=true;
    // this.isAddNew=false;
    this.index=i;
    
   }

   minimizedToggle(){
    this.isMinimized = !this.isMinimized;
  }

  insert_drop_down():Observable<Dropdown[]>{
    return this.httpclient.post<Dropdown[]>(`${this.__main.URL}/insert_drop_down`,this.drop_DownObj);
  }


  getAlldrop_down():Observable<Dropdown[]>{
    return this.httpclient.get<Dropdown[]>(`${this.__main.URL}/insert_drop_down`);
  } 

  getAll_ListType():Observable<Dropdown[]>{
    return this.httpclient.get<Dropdown[]>(`${this.__main.URL}/drop_down_distin`);
  } 



  
  delete_dropDownDetail(id:number){
    // console.log("Id is " + id)
    const params = new HttpParams().set('id', id.toString());
    return this.httpclient.delete<Dropdown>(`${this.__main.URL}/delete_dropdown`, { params });

  }

  

}
