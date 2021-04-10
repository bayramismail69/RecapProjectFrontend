import { Bank } from './../models/bank';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/ResponseModels/responseModel';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiServiceService
  ) {}
  verify(bank:Bank):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("banks/getByCardVerify"),bank)
  }
}
