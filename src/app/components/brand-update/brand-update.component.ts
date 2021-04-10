import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { LocalStrogeServiceService } from 'src/app/services/local-stroge-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandNameLenght: number = 0;
  brand: Brand;
  brandUpdateForm: FormGroup;
  dataloaded: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private localStrogeService: LocalStrogeServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _location:Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['brandId']) {
        this.getBrand(param['brandId']);
        console.log(param["brandId"])
      }
    });

  }

  createCarUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      id: [this.brand.id],
      brandName: [
        this.brand.brandName,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
  btnBack()
  {
    this._location.back();
  }
  getBrand(brandId: number) {
    this.brandService.getBrand(brandId).subscribe(
      (response) => {
        this.brand = response.data;
        this.createCarUpdateForm();
        this.dataloaded = true;
        this.brandNameLenght = this.brand.brandName.length;
        console.log(response)
      },
      (responseError) => {}
    );
  }
  update() {
    if (this.getBrandValidContorol()) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          location.replace("/cars")
        },
        (responseError) => {
          if (responseError.error.StatusCode == 500) {
            this.localStrogeService.removeToken();

            this.toastrService.error(
              'Yetkiniz yok tekrar sisteme giriş yapmalısınız'
            );
            this.router.navigate(['login/'], {
              queryParams: {},
            });
            window.location.replace('/login');
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
  getBrandValidContorol(): boolean {
    if (this.brandUpdateForm.valid) {
      return true;
    }    else {
      if (this.brandUpdateForm.controls.description.errors.minlength) {
        this.toastrService.error('Marka adı minimum 3 karakter olmalıdır');
        return false;
      } else {
        this.toastrService.error('Marka adı bölümünü doldurunuz!');
        return false;
      }
    }
  }

  onChangeBrandName(UpdatedValue: string): void {
    this.brandNameLenght = UpdatedValue.length;
  }

}
