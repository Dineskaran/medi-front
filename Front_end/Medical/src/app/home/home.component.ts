import { Component, inject } from '@angular/core';
import { RightPanelComponent } from "../right-panel/right-panel.component";
import { LeftPanelComponent } from "../left-panel/left-panel.component";
import { CommonModule } from '@angular/common';
import { MainService } from '../services/main.service';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, RightPanelComponent, LeftPanelComponent]
})
export class HomeComponent {

    mainService: MainService = inject(MainService);

    currentUrls=this.mainService.currentUrl();

    logpage:boolean=false;

    removeHome(){
        if (this.currentUrls === " "){
            this.logpage=true;
            
        }
    }

    ngOnInit(){
        this.mainService.currentUrl()
        console.log("check current Url:  ", this.mainService.currentUrl())
        this. removeHome();
    }
}
