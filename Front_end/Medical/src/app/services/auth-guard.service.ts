import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn,GuardResult,MaybeAsync,Router, RouterStateSnapshot } from '@angular/router';
import { UserDetailsService } from './user-details.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  __user:UserDetailsService=inject(UserDetailsService);

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (this.__user.isLogined) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login page if not logged in
      return false;
    }
  }
}

