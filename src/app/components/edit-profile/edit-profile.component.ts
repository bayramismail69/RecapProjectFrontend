import { TokenDecorderService } from './../../services/token-decorder.service';
import { TokenDecord } from './../../models/tokenDecord';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  dataloaded: boolean = false;
  userUpdateForm: FormGroup;
  user: User;
  tokenDecord: TokenDecord;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private _location: Location,
    private userService: UserService,
    private tokenDecordService: TokenDecorderService
  ) {}

  ngOnInit(): void {
    this.tokenDecord = this.tokenDecordService.tokenDecoder();
    this.getUser();
  }
  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.user.id],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password],
      status: [this.user.status, Validators.requiredTrue],
    });
  }
  getUser() {
    this.userService.getUserById(this.tokenDecord.id).subscribe((response) => {
      this.user = response.data;
      this.dataloaded = true;
      this.createUserUpdateForm();
    });
  }
  update() {
    if (this.getUserValidContorol()) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      this.userService.update(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          location.replace('/editProfile');
        },
        (responseError) => {
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
  getUserValidContorol(): boolean {
    if (this.userUpdateForm.valid) {
      return true;
    } else {
      console.log(this.userUpdateForm)
      this.toastrService.error('Tüm form u doldurunuz!');
      return false;
    }
  }
  btnBack() {
    this._location.back();
  }
}
