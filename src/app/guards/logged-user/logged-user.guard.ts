import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth-service/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(map((user) => {
      if (user) {
        this.router.navigate(['./admin']).catch(console.warn);
        return false;
      } else {
        return true;
      }
    }))
  }

}
