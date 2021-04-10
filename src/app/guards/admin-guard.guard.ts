import { ToastrService } from 'ngx-toastr';
import { TokenDecorderService } from './../services/token-decorder.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private tokenDecorderService:TokenDecorderService,private router:Router,private toastrService:ToastrService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.tokenDecorderService.tokenDecoder().roles[0]=="admin"||this.tokenDecorderService.tokenDecoder().roles[1]=="car.add"){
      return true
    }
    else{
      this.router.navigate(["cars"])
      this.toastrService.info("Bu sayfa için yetkiniz bulunmamaktadır")
      return false;
    }
  }
  
}
