import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import {AuthService} from "../service/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor( private router: Router, private authService: AuthService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const token = '';
    if (token){
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
