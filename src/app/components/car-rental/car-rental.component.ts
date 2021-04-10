import {  Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { Rental } from 'src/app/models/rental';
import { TokenDecord } from 'src/app/models/tokenDecord';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { TokenDecorderService } from 'src/app/services/token-decorder.service';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css'],
})
export class CarRentalComponent implements OnInit {
  date: Date = new Date();
  rentalAddForm: FormGroup;
  carDto: CarDto;
  rental: Rental;
  dataLoded: boolean = false;
  tokenDecord: TokenDecord;
  constructor(
    private rentalService: RentalService,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private tokenDecorderServic: TokenDecorderService,
    private router:Router,
  
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      // this.rentalController(param["carId"]);
      this.getCarDtosByCarId(param['carId']);
    });
   
  }
  getCreateForm() {
    if (this.tokenDecord&&this.dataLoded==true) {
      this.createRentalAddForm();
    }
  }
  createRentalAddForm() {
   
    this.rentalAddForm = this.formBuilder.group({
      customerId: [this.tokenDecord.id, Validators.required],
      carId: [this.carDto.carId, Validators.required],
      rentDate: [this.date.toLocaleString(), Validators.required],
      returnDate: ['', Validators.required],
    });
  }
  getTokenDecoder() {
    this.tokenDecord = this.tokenDecorderServic.tokenDecoder();
  }
  getCarDtosByCarId(carId: number) {
    this.carService.getCarDtoByCarId(carId).subscribe(
      (response) => {
        this.carDto = response.data;
        this.dataLoded = true; 
        this.getTokenDecoder();
        this.getCreateForm();
      },
      (responseError) => {}
    );
  }
  add() {
    if (this.getCarValidContorol()) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
     
      console.log(rentalModel);
      this.router.navigate(['/payment'],{
        queryParams: {rental:[rentalModel.customerId,rentalModel.carId,rentalModel.rentDate,rentalModel.returnDate,]},
      });
     
    }
  }
  getCarValidContorol(): boolean {
    if (this.rentalAddForm.valid) {
      return true;
    } else{
     
        this.toastrService.error('Dönüs tarihini şeçiniz!');
        return false;
    } 
  }
}
