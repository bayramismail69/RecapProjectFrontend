import { Car } from './../models/car';
import { SingleResponseModel } from './../models/ResponseModels/singleResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../models/carDto';
import { ListResponseModel } from '../models/ResponseModels/listResponseModel';
import { ApiServiceService } from './api-service.service';
import { ResponseModel } from '../models/ResponseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiServiceService
  ) {}
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("cars/add"),car)
  }
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("cars/update"),car)
  }
  getCarDtos(): Observable<ListResponseModel<CarDto>> {
    return this.httpClient.get<ListResponseModel<CarDto>>(
      this.apiService.ApiUrl('cars/getalldetail')
    );
  }
  getCar(carId:number): Observable<SingleResponseModel<Car>> {
    return this.httpClient.get<SingleResponseModel<Car>>(
      this.apiService.ApiUrl('cars/getCar?carId='+carId)
    );
  }
  getCarDtosByBrandId(brandId: number): Observable<ListResponseModel<CarDto>> {
    return this.httpClient.get<ListResponseModel<CarDto>>(
      this.apiService.ApiUrl('cars/getByBrandIdDetail?brandId=' + brandId)
    );
  }
  getCarDtosByColorId(colorId: number): Observable<ListResponseModel<CarDto>> {
    return this.httpClient.get<ListResponseModel<CarDto>>(
      this.apiService.ApiUrl('cars/getByColorIdDetail?colorId=' + colorId)
    );
  }
  getCarDtosByBrandIdColorId(
    colorId: number,
    brandId: number
  ): Observable<ListResponseModel<CarDto>> {
    return this.httpClient.get<ListResponseModel<CarDto>>(
      this.apiService.ApiUrl(
        'cars/getByColorIdBrandIdDetail?colorId=' +
          colorId +
          '&brandId=' +
          brandId
      )
    );
  }
  getCarDtoByCarId(carId: number): Observable<SingleResponseModel<CarDto>> {
    return this.httpClient.get<SingleResponseModel<CarDto>>(
      this.apiService.ApiUrl('cars/getCarDetailByCarId?carId=' + carId)
    );
  }
}
