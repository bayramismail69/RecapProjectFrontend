import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { LeftNavbarComponent } from './components/left-navbar/left-navbar.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { CarsComponent } from './components/cars/cars.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarDtoFilterPipe } from './pipes/car-dto-filter.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorsComponent } from './components/colors/colors.component';
import { CarsFilterSearchBarComponent } from './components/cars-filter-search-bar/cars-filter-search-bar.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalControlComponent } from './components/rental-control/rental-control.component';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { CarRentalComponent } from './components/car-rental/car-rental.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileNavbarComponent } from './components/profile-navbar/profile-navbar.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { AdminLeftNavbarComponent } from './components/admin-left-navbar/admin-left-navbar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LeftNavbarComponent,
    TopNavbarComponent,
    CarsComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    CarDtoFilterPipe,
    PaymentComponent,
    BrandComponent,
    ColorsComponent,
    CarsFilterSearchBarComponent,
    CarDetailComponent,
    RentalControlComponent,
    CarRentalComponent,
  
    RegisterComponent,
  
    LoginComponent,
       ProfileNavbarComponent,
       CarAddComponent,
       AdminLeftNavbarComponent,
       CarUpdateComponent,
       BrandAddComponent,
       ColorAddComponent,
       BrandUpdateComponent,
       ColorUpdateComponent,
       EditProfileComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
   
    NgxMaskModule.forRoot(maskConfig),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
    }),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  
  //provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  providers: [ {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
