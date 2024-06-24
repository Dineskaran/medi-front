import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";

@Component({
    selector: 'app-main-home',
    standalone: true,
    templateUrl: './main-home.component.html',
    styleUrl: './main-home.component.css',
    imports: [HomeComponent]
})
export class MainHomeComponent {

}
