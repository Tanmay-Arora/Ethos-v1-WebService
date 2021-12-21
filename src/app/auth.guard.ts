import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _sessionStorage:LocalstorageService, private router:Router, private route:ActivatedRoute){}

  canActivate(): boolean {
    let loginState:boolean = this._sessionStorage.getFromStorage('loginState') === '' ? false : true;
    if(loginState == false){
      this.router.navigate(['/users/login'], {relativeTo: this.route});
    }

    return true;
  }
  
}
