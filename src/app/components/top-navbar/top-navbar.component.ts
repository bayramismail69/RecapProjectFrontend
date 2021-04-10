import { LocalStrogeServiceService } from './../../services/local-stroge-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
 token:string="";

  constructor(private localStrogeService:LocalStrogeServiceService) { }

  ngOnInit(): void {
    this.tokenGet();
  }
tokenGet(){
this.token= this.localStrogeService.getToken()
}
}
