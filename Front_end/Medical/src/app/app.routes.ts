import { Routes } from '@angular/router';
import { HomeAdmistionComponent } from './home-admistion/home-admistion.component';
import { SearchReportComponent } from './search-report/search-report.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { NurseDutyComponent } from './nurse-duty/nurse-duty.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { LogInfoComponent } from './log-info/log-info.component';
import {authGuard} from './auth.gaurd'

export const routes: Routes = [

    {path:'', redirectTo:'login', pathMatch:'full'},

    {path:'',component:LoginComponent,title:'login'},
    {path:'dashboard',component:MainHomeComponent,title:'dashboard',canActivate:[authGuard]},
    {path:'homeadmision',component:HomeAdmistionComponent,title:'homeadmision',canActivate:[authGuard]},
    {path:'search&report',component:SearchReportComponent,title:'search&report',canActivate:[authGuard]},
    {path:'notification',component:NotificationComponent,title:'notification',canActivate:[authGuard]},
    {path:'dropdown',component:DropdownComponent,title:'dropdown',canActivate:[authGuard]},
    {path:'nurseduty',component:NurseDutyComponent,title:'nurseduty',canActivate:[authGuard]},
    {path:'userDetails',component:UserDetailsComponent,title:'user details',canActivate:[authGuard]},
    {path:'person',component:PersonDetailsComponent,title:'person',canActivate:[authGuard]},
    {path:'settings',component:SettingsComponent,title:'settings',canActivate:[authGuard]},
    {path:'change-password',component:ChangePasswordComponent,title:'changepassword',canActivate:[authGuard]},
    {path:'log-info',component:LogInfoComponent,title:'log-info',canActivate:[authGuard]},





];
