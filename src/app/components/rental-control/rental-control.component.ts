import { TokenDecorderService } from './../../services/token-decorder.service';
import { TokenDecord } from './../../models/tokenDecord';
import { FindexService } from './../../services/findex.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RentalService } from 'src/app/services/rental.service';
@Component({
  selector: 'app-rental-control',
  templateUrl: './rental-control.component.html',
  styleUrls: ['./rental-control.component.css'],
})
export class RentalControlComponent implements OnInit {
  success = false;
  error = false;
  message: string = '';
  carId: number = 0;
  tokenDecord:TokenDecord;

  constructor(
    private spinner: NgxSpinnerService,
    private rentalService: RentalService,
    private _location: Location,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private findexServices: FindexService,private tokenDecorderService:TokenDecorderService
  ) {}

  ngOnInit(): void {
    /** spinner starts on init */
    this.getTokenDecord();
    this.activatedRoute.params.subscribe((param) => {
      this.rentalController(param['carId']);
      this.carId = param['carId'];
    });
    this.spinner.show();
  }
  getFindexControl(carId: number, userId: number) {
    this.findexServices.getUserCarFindex(carId, userId).subscribe(
      (response) => {
       
      },
      (responseError) => {
      this.message= responseError.error.message;
      
        this.error=true;
        this.success=false;
      }
    );
  }
  getTokenDecord(){
    this.tokenDecord=this.tokenDecorderService.tokenDecoder()
  }
  rentalController(carId: number) {
    this.rentalService.getRentalByCarIdControl(carId).subscribe(
      (response) => {
        this.spinner.hide();
        this.success = true;
        this.getFindexControl(carId,this.tokenDecord.id)
      },
      (responseError) => {
        this.spinner.hide();
        this.error = true;
        this.message = responseError.error.message;
      }
    );
  }
  btnBack() {
    this._location.back();
  }
  btnIleri() {
    this._router.navigate(['rentals'], { queryParams: { carId: this.carId } });
  }
}
