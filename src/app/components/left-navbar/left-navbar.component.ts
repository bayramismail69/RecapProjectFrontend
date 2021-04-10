import { TokenDecorderService } from './../../services/token-decorder.service';
import { Component, OnInit } from '@angular/core';
import { TokenDecord } from 'src/app/models/tokenDecord';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {
tokenDecord:TokenDecord;
  constructor(private tokenDecorderService:TokenDecorderService) { }

  ngOnInit(): void {
    this.getTokenDecoder();
  }
getTokenDecoder(){
 this.tokenDecord= this.tokenDecorderService.tokenDecoder();
}
}
