import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {
  }

  canActivate(): boolean {
    // console.log("YYYYYYYY", this.cookieService.check("todo_token"));
    if (!this.cookieService.check("todo_token")) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}


