import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank';
import { ResponseModel } from '../models/ResponseModels/responseModel';
import { UserBank } from '../models/userBank';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class BankSaveService {

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiServiceService
  ) {}
  add(bank:UserBank):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("banks/userBankSave"),bank)
  }
  
}
