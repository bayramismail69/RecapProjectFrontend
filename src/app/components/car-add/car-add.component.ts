import { LocalStrogeServiceService } from './../../services/local-stroge-service.service';
import { BrandService } from './../../services/brand.service';
import { ColorService } from './../../services/color.service';
import { Brand } from './../../models/brand';
import { CarService } from 'src/app/services/car.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carNameLenght: number = 0;
  descriptionLenght: number = 0;
  brands: Brand[] = [];
  colors: Color[] = [];
  carAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService,
    private localStrogeService: LocalStrogeServiceService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      carName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  add() {
    if (this.getCarValidContorol()) {
      let productModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(productModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if(responseError.error.StatusCode==500) {
          
            this.localStrogeService.removeToken();
           
            this.toastrService.error(
              'Yetkiniz yok tekrar sisteme giriş yapmalısınız'
            ); 
            this.router.navigate(['login/'], {
              queryParams: { },
            });
            window.location.replace("/login");
          }
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          } 
        }
      );
    }
  }
  getCarValidContorol(): boolean {
    console.log(this.carAddForm);
    if (this.carAddForm.valid) {
      return true;
    } else if (this.carAddForm.controls.carName.errors) {
      if (this.carAddForm.controls.carName.errors.minlength) {
        this.toastrService.error('Araba adı minimum 3 karakter olmalıdır');
        return false;
      } else {
        this.toastrService.error('Araba adı bölümünü doldurunuz!');
        return false;
      }
    } else if (this.carAddForm.controls.brandId.errors) {
      this.toastrService.error('Marka Seçmelisiniz!');
      return false;
    } else if (this.carAddForm.controls.colorId.errors) {
      this.toastrService.error('Renk Seçmelisiniz!');
      return false;
    } 
    else if (this.carAddForm.controls.modelYear.errors) {
      this.toastrService.error('Model yılı  bölümünü doldurunuz!');
      return false;
    }
    else if (this.carAddForm.controls.dailyPrice.errors) {
      this.toastrService.error('Ücret  bölümünü doldurunuz!');
      return false;
    }
    else {
      if (this.carAddForm.controls.description.errors.minlength) {
        this.toastrService.error('Açıklama minimum 3 karakter olmalıdır');
        return false;
      } else {
        this.toastrService.error('Açıklama  bölümünü doldurunuz!');
        return false;
      }
    }
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  onChangeDescription(UpdatedValue: string): void {
    this.descriptionLenght = UpdatedValue.length;
  }
  onChangeCarName(UpdatedValue: string): void {
    this.carNameLenght = UpdatedValue.length;
  }
}
