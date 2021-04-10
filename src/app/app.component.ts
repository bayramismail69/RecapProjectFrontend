import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import  jwt_decode from "jwt-decode";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecapProjectFrontend';
  mymodel: Date;
  mymodel2: Date;
  constructor(private toastr:ToastrService){
    // let decoded = Object.assign({"email":String,"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":String},jwt_decode((localStorage.getItem("token"))));
    // console.log(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
  }
  valuechange(car:unknown){
   
  }
  valuechange2(car:unknown){

  }
}
