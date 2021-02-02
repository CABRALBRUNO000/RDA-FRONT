import { AuthService } from './../login/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  showAuthenticatedRoute: boolean = false
  
  constructor(private authService: AuthService, private router: Router) {}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    this.authService.authenticated().subscribe(
      auth => this.showAuthenticatedRoute = auth
    )

    if (this.showAuthenticatedRoute) {
      console.log(this.showAuthenticatedRoute);
      return true;
      
    }
    this.router.navigate(['/LoginUser'])
    return false
  }
  
}
