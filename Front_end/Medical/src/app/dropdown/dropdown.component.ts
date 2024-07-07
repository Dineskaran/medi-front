import { filter } from 'rxjs/operators';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { DropdownService } from '../services/dropdown.service';
import { MainService } from '../services/main.service';
import { Dropdown } from '../model/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ButtonModule, CommonModule,FormsModule,ReactiveFormsModule,FormsModule,RouterLink,RouterModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

  drop_downServise:DropdownService = inject(DropdownService)
  __main:MainService = inject(MainService)

  ListTypeArray:Dropdown[]=[];
  FilterbyArray:any[]=[];


  ngOnInit(){

    // this.loadAlldropDown();
    this.selected_drodown(this.drop_downServise.drop_DownObj.list_type,'');
    this.loadListType();



  }

  selected_drodown(droplist_type:string,filter_by:string){
    // debugger
    this.drop_downServise.drop_downList = []
    this.__main.getDropdownitems(droplist_type,filter_by).subscribe((resultList) => {
      resultList.forEach((goods:any)=>{
      let a:Dropdown =JSON.parse(goods)
      this.drop_downServise.drop_downList.push(a)
      console.log("print data",a)

    })
    })
    this. loadFilterby();


  }

  selected_drodown_filterby(droplist_type:string,filter_by:string){
    // debugger
    this.drop_downServise.drop_downList = []
    this.__main.getDropdownitems(droplist_type,filter_by).subscribe((resultList) => {
      resultList.forEach((goods:any)=>{
      let a:Dropdown =JSON.parse(goods)
      this.drop_downServise.drop_downList.push(a)
      console.log("print data",a)

    })
    })
    // this. loadFilterby();


  }

  loadListType():void{
    this.drop_downServise.getAll_ListType().subscribe(( resultList)=>{
      this.ListTypeArray = []
      resultList.forEach((personType:any)=>{
      // console.log(personType)
      let a:Dropdown =JSON.parse(personType)
      this.ListTypeArray.push(a)
      //  console.log(personType)
    })
    })
  }


  // loadAlldropDown(): void {
  //   this.__main.getDropdownitems('Bywhom','').subscribe((resultList) => {
  //     this.drop_downServise.drop_downList = []
  //     resultList.forEach((goods:any)=>{
  //     let a:Dropdown =JSON.parse(goods)
  //     this.drop_downServise.drop_downList.push(a)

  //   })
  //   })
  // }

  loadFilterby(){
    this.FilterbyArray=[]
    if(this.drop_downServise.drop_DownObj.list_type=='Effect'){
      this.__main.getDropdownitems('Effect status','').subscribe((resultList) => {
        resultList.forEach((goods:any)=>{
        let a:Dropdown =JSON.parse(goods)
        this.FilterbyArray.push(a)
      })
      })
    }
    if(this.drop_downServise.drop_DownObj.list_type=='Bywhom'){
      this.__main.getDropdownitems('Designation','').subscribe((resultList) => {
        resultList.forEach((goods:any)=>{
        let a:Dropdown =JSON.parse(goods)
        this.FilterbyArray.push(a)
      })
      })
    }
    if(this.drop_downServise.drop_DownObj.list_type=='Item name'){
      this.__main.getDropdownitems('Thing type','').subscribe((resultList) => {
        resultList.forEach((goods:any)=>{
        let a:Dropdown =JSON.parse(goods)
        this.FilterbyArray.push(a)
      })
      })
    }



  }




  // insert drop_down list
  insert_drop_downDetails(){
      let getData = this.drop_downServise.insert_drop_down();
      getData.subscribe(data=>{
        console.log(data);
        alert("Nurse Duty details successfully Added")
        // this.drop_downServise.clearDropObj()
        this.drop_downServise.drop_DownObj.list_value ='';
        this.drop_downServise.drop_DownObj.id =0;
        this.selected_drodown(this.drop_downServise.drop_DownObj.list_type,this.drop_downServise.drop_DownObj.filter_by);
      },error=>{
        console.log(error);
        alert("Error try again")
      })
    // }
  }


  // delete drop_down list

  delete_dropDown(id:number){

    this.drop_downServise.delete_dropDownDetail(id)
    .subscribe((result)=>{
      alert("Home admission details successfully delete")
      this.selected_drodown(this.drop_downServise.drop_DownObj.list_type,this.drop_downServise.drop_DownObj.filter_by);
    },
    error=>{
      console.log(error);
      alert("Error try again")
    });

  }







}
