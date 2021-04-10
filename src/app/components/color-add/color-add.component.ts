import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStrogeServiceService } from 'src/app/services/local-stroge-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorNameLenght: number = 0;
  colorAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private localStrogeService: LocalStrogeServiceService,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: [
      '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
  btnBack() {
    this._location.back();
  }

  add() {
    if (this.getColorValidContorol()) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(
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
  getColorValidContorol(): boolean {
    if (this.colorAddForm.valid) {
      return true;
    } else {
      if (this.colorAddForm.controls.description.errors.minlength) {
        this.toastrService.error('Renk adı minimum 3 karakter olmalıdır');
        return false;
      } else {
        this.toastrService.error('Renk adı bölümünü doldurunuz!');
        return false;
      }
    }
  }

  onChangeColorName(UpdatedValue: string): void {
    this.colorNameLenght = UpdatedValue.length;
  }

}
