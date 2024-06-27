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

  ngOnInit(){

    this.loadAlldropDown();
    this.loadListType();


  }

  selected_drodown(droplist_type:string){

    this.__main.getDropdownitems(droplist_type,'').subscribe((resultList) => {
      this.drop_downServise.drop_downList = []
      resultList.forEach((goods:any)=>{
      let a:Dropdown =JSON.parse(goods)
      this.drop_downServise.drop_downList.push(a)

     })
    })


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


  loadAlldropDown(): void {
    this.__main.getDropdownitems('Bywhom','').subscribe((resultList) => {
      this.drop_downServise.drop_downList = []
      resultList.forEach((goods:any)=>{
      let a:Dropdown =JSON.parse(goods)
      this.drop_downServise.drop_downList.push(a)

     })
    })
  }


  // insert drop_down list
  insert_drop_downDetails(){


      let getData = this.drop_downServise.insert_drop_down();
      getData.subscribe(data=>{
        console.log(data);
        alert("Nurse Duty details succesfully Added")
        this.loadAlldropDown();
        this.drop_downServise.clearDroplist()
        // this.drop_downServise.nurse_dutyObj=new <class name> () model class using
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
      alert("Home admission details succesfully delete")
      this.loadAlldropDown();
    },
    error=>{
      console.log(error);
      alert("Error try again")
    });

  }







}
