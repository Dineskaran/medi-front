import { AuthGuardService } from './services/auth-guard.service';
import { MainService } from './services/main.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from './services/user-details.service';


 export const authGuard = () =>{
  const __main = inject(MainService);
  const __user = inject(UserDetailsService);
  const authService = inject(AuthGuardService);
  const router = inject(Router);

  const isLogged = sessionStorage.getItem('isLogged');
  console.log('isLogged',isLogged);
  console.log('authService.isLoggedIn()',authService.isLoggedIn());

  if(authService.isLoggedIn()){
    return true;
  }
  else{
    router.navigate(['/']);
    return false;
  }

}
