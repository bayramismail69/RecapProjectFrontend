import { Color } from './../models/color';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';
import { ApiServiceService } from './api-service.service';
import { ResponseModel } from '../models/ResponseModels/responseModel';
import { SingleResponseModel } from '../models/ResponseModels/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor(private httpClient: HttpClient,private apiService:ApiServiceService) { }

  getColors():Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiService.ApiUrl("colors/getall"));
  }
  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("colors/add"),color)
  }
  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("colors/update"),color)
  }
  getColor(colorId:number):Observable<SingleResponseModel<Color>> {
    return this.httpClient.get<SingleResponseModel<Color>>(this.apiService.ApiUrl("colors/getColor?colorId="+colorId));
  }
}
