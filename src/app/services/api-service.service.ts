import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }
  ApiUrl(url:string){
    return 'https://localhost:44309/api/'+url
  }
  ApiImageUrl(){
    return 'https://localhost:44309/'
  }
}
