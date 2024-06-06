import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }
  isMinimized:boolean=true;
  toggle(){
    this.isMinimized=!this.isMinimized;
  }
  URL = "http://127.0.0.1:8000/userservice"
}
