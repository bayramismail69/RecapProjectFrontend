import { TokenDecord } from './../../models/tokenDecord';
import { TokenDecorderService } from './../../services/token-decorder.service';
import { CarService } from './../../services/car.service';
import { CarDto } from './../../models/carDto';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
carDtos:CarDto[]=[];
dataLoaded=false;
btnClear:boolean=false;
filterText:string;
tokenDecord:TokenDecord;
  constructor(private carService:CarService,private toastrService:ToastrService,private activatedRoute:ActivatedRoute,private _router:Router,private tokenDecorderServic:TokenDecorderService) { }

  ngOnInit(): void {
    this.btnClear=false;
    this.getTokenDecord();
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['colorId'] && params['brandId']) {
        this.getCarsByColorIdBrandId(params['colorId'], params['brandId']);
        this.btnClear=true;
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
        this.btnClear=true;
      } else if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
        this.btnClear=true;
      } else {
        this.getAllCarDtos();
      }
    });
  }
  getTokenDecord(){
    this.tokenDecord=this.tokenDecorderServic.tokenDecoder()
  }
 getAllCarDtos(){
   this.carService.getCarDtos().subscribe(response=>{
     this.carDtos=response.data;
     this.carDtoNotification();
     this.dataLoaded=true;
   },responseError=>{
    this.toastrService.error("Sunucu hatası");
   })
 }
 getCarsByColorId(colorId:number){
  this.carService.getCarDtosByColorId(colorId).subscribe(response=>{
    this.carDtos=response.data;
    this.carDtoNotification();
    this.dataLoaded=true;
  },responseError=>{
  
  })
 }
 getCarsByBrandId(brandId:number){
  this.carService.getCarDtosByBrandId(brandId).subscribe(response=>{
    this.carDtos=response.data;
    this.carDtoNotification();
    this.dataLoaded=true;
  },responseError=>{
  
  })
 }
 getCarsByColorIdBrandId(colorId:number,brandId:number){
  this.carService.getCarDtosByBrandIdColorId(colorId,brandId).subscribe(response=>{
    this.carDtos=response.data;
    this.carDtoNotification();
    this.dataLoaded=true;
  },responseError=>{
  
  })
 }
 carDtoNotification(){
   console.log(this.carDtos);
  if(this.carDtos.length!==0)
    {
      this.toastrService.success(this.carDtos.length+" Adet ürün bulundu");
    }
    else{
      this.toastrService.error("Ürün bulunamadı")
    }
 }
 
}
