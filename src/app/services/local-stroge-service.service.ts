import { Rental } from './../models/rental';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStrogeServiceService {
  constructor() {}
  getToken() {
    return localStorage.getItem('token');
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  removeToken(){
    localStorage.removeItem('token');
    
  }
 
}
