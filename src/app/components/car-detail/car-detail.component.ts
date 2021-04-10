import { CarDto } from './../../models/carDto';
import { CarService } from './../../services/car.service';
import { CarImageService } from './../../services/car-image.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDto: CarDto;
  carImages: CarImage[] = [];
  dataLoaded: boolean = false;
  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private carImageService: CarImageService,private _location:Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.getCarDtoByCarId(param['carId']);
      this.getCarImages(param['carId']);
      
    });
  }
  getCarDtoByCarId(carId: number) {
    this.carService.getCarDtoByCarId(carId).subscribe((response) => {
      this.carDto = response.data;
      this.dataLoaded = true;
     
    });
  }
  getCarImages(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
     
    });
  }
  getCarImagesClass(carImage: CarImage) {
    if (this.carImages[0] == carImage) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
  btnBack()
  {
    this._location.back();
  }
}
