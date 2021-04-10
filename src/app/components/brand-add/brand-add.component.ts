import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { LocalStrogeServiceService } from 'src/app/services/local-stroge-service.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandNameLenght: number = 0;
  brandAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private localStrogeService: LocalStrogeServiceService,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: [
      '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
  btnBack() {
    this._location.back();
  }

  add() {
    if (this.getBrandValidContorol()) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          location.replace('/cars');
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
    if (this.brandAddForm.valid) {
      return true;
    } else {
      if (this.brandAddForm.controls.description.errors.minlength) {
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
