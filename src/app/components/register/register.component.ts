import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['',  Validators.compose([
        Validators.required,
        Validators.email
      ])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required], 
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);

      this.authService.register(registerModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          this.router.navigate(['login/'], {
            queryParams: {  },
          });
        },
        (responseError) => {
          
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      
      if (this.registerForm.controls.email.errors) {
        this.toastrService.error('Geçerli eposta giriniz');
      }
     
      else if(this.registerForm.controls.firstName.errors){
        this.toastrService.error('Ad alanı boş olamaz');
      }
      else if(this.registerForm.controls.lastName.errors){
        this.toastrService.error('Soyad  alanı boş olamaz');
      }
      else if(this.registerForm.controls.password.errors){
        if(this.registerForm.controls.password.errors.minlength){
          this.toastrService.error('Şifre alanı minimum 6 karakter içermelidir');
        }
        else{
          this.toastrService.error('Şifre alanını kontrol ediniz');
        }
      }
      else{
        this.toastrService.error('Form Eksik');
      }
    }
  }
}
