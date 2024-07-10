import { HostListener, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from './user-details.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  // __user:UserDetailsService=inject(UserDetailsService);

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLogged') === 'true';
  }

  login(): void {
    // Perform login logic here
    // Assuming login is successful:
    sessionStorage.setItem('isLogged', 'true');
  }

  logout(): void {
    // Perform logout logic here
    sessionStorage.removeItem('isLogged');
  }

}

