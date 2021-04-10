import { ApiServiceService } from './api-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  constructor(private httpClient: HttpClient,private apiService:ApiServiceService) { }

  getCarImages():Observable<ListResponseModel<CarImage>> {

    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiService.ApiUrl("carsImages/getall"));
  }
  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiService.ApiUrl("carsImages/getCarImagesByCarId?carId="+carId));
  }
}
