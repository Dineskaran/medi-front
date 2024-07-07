import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { PersonDetailsService } from '../services/person-details.service';
import { PersonDetails } from '../model/person-details';
import { HomeAdmistionService } from '../services/home-admistion.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,FormsModule,RouterLink,RouterModule],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent {

  editflag:boolean=false;
  index:number=1;
  isAddNew:boolean=false;
  __main:MainService=inject(MainService)

  person_detailsService:PersonDetailsService=inject(PersonDetailsService)
  home_AdmistionService:HomeAdmistionService = inject(HomeAdmistionService)

  ngOnInit():void{
    this.loadAllPersondetails();

    this.person_detailsList();
  }

  person_detailsList():void{this.person_detailsService.person_detailsList = []}



  loadAllPersondetails():void{
    this.__main.getAllPerson('Member').subscribe(( resultList)=>{
      this.person_detailsService.person_detailsList = []
    resultList.forEach((person:any)=>{
      console.log(person)
      let a:PersonDetails =JSON.parse(person)
      this.person_detailsService.person_detailsList .push(a)
      console.log(person)
    })
    })
  }
}
