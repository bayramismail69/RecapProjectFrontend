import { ApiServiceService } from './api-service.service';
import { LocalStrogeServiceService } from './local-stroge-service.service';
import { Register } from './../models/register';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/ResponseModels/singleResponseModel';
import { TokenModel } from '../models/ResponseModels/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient,private localStrogeService:LocalStrogeServiceService,private apiService:ApiServiceService) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiService.ApiUrl("auth/login"),loginModel)
  }
  register(register:Register){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiService.ApiUrl("auth/register"),register)
  }
  isAuthenticated(){
    if(this.localStrogeService.getToken()){
      return true;
    }
    else{
      return false;
    }
  }
  
}
