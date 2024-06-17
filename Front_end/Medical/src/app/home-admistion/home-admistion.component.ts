import { Component,inject,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdmistionService } from '../services/home-admistion.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeAdmistion } from '../model/home-admistion';
import { RouterLink, RouterModule } from '@angular/router';
import { PersonDetailsService } from '../services/person-details.service';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { PersonDetails } from '../model/person-details';
import { Dropdown } from '../model/dropdown';
import { MainService } from '../services/main.service';



@Component({
  selector: 'app-home-admistion',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,FormsModule,RouterLink,RouterModule,PersonDetailsComponent],
  templateUrl: './home-admistion.component.html',
  styleUrl: './home-admistion.component.css'
})
export class HomeAdmistionComponent implements OnInit{

  home_AdmistionService:HomeAdmistionService = inject(HomeAdmistionService)
  person_detailsService:PersonDetailsService=inject(PersonDetailsService)
  __main:MainService=inject(MainService)
  
  homeAdmistion!:HomeAdmistion;

  reasonArray:Dropdown[]=[]


 

  ngOnInit(): void {

      this.loadAllAdmitions();
      this.loadAllPersondetails();
      this.loadReasons();
      // this.person_detailsList();

  }
  

  // person_detailsList():void{}

          
  // }
  loadAllAdmitions(): void {
    this.home_AdmistionService.getAllHomeadmition().subscribe((resultList) => {
      this.home_AdmistionService.home_admistionList = []
   
     resultList.forEach((goods:any)=>{
      // console.log(goods)
       let a:HomeAdmistion =JSON.parse(goods)
       this.home_AdmistionService.home_admistionList .push(a)
      //  console.log(goods)
     })
    })
  }



  deleteHomeadmission(id:number){
    // debugger
    this.home_AdmistionService.deleteHomeadmissionDetail(id)
    .subscribe((result)=>{
      alert("Home admission details succesfully delete")
      this.loadAllAdmitions();
    },
    error=>{
      console.log(error);
      alert("Error try again")
    });
    
  }

  insertHomeAddmissionDetails(){
    
    


      let getData = this.home_AdmistionService.homeadmistioninsertdetails();
      getData.subscribe(data=>{
        // console.log(data);
        alert("Home admission details succesfully Added")
        this.loadAllAdmitions();
        // this.HomeAdmistionReactiveForm.reset();
      },error=>{
        console.log(error);
        alert("Error try again")
      })
    // }
  }

  // onChangeif(event: any): void {
  //   if (event.target['checked']){
  //     console.log("it's true");
  //     this.home_AdmistionService.home_admistionObj.if_new = 1;
  //   } 

  //   else {

  //     console.log("it's false");
  //     this.home_AdmistionService.home_admistionObj.if_new = 0;
  //   }
    

  loadAllPersondetails():void{
    this.person_detailsService.getAllPerson('Member').subscribe(( resultList)=>{
      this.person_detailsService.person_detailsList = []
     resultList.forEach((person:any)=>{
      // console.log(person)
       let a:PersonDetails =JSON.parse(person)
       this.person_detailsService.person_detailsList .push(a)
      //  console.log(person)
     })
    })
  }

  // drop down loads  only reason array

  loadReasons():void{
    this.__main.getDropdownitems('Resaon','').subscribe(( resultList)=>{
      this.reasonArray = []
     resultList.forEach((item:any)=>{
      // console.log(person)
       let a:Dropdown =JSON.parse(item)
       this.reasonArray.push(a)
      //  console.log(person)
     })
    })
  }

  
  
 
}
