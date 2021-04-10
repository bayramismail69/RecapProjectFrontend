import { ResponseModel } from './../models/ResponseModels/responseModel';
import { RentalDto } from './../models/rentalDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';
import { ApiServiceService } from './api-service.service';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  constructor(private httpClient: HttpClient,private apiService:ApiServiceService) { }

  getProducts():Observable<ListResponseModel<RentalDto>> {
    return this.httpClient.get<ListResponseModel<RentalDto>>(this.apiService.ApiUrl("rentals/getRentalDetails"));
  }
  getRentalByCarIdControl(carId:number):Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiService.ApiUrl("rentals/getRentalByCarIdControl?carId="+carId));
  }
  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("rentals/add"),rental)
  }
}
