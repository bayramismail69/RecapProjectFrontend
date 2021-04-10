import { UserFindex } from './../../models/userFindex';
import { FindexService } from './../../services/findex.service';
import { ApiServiceService } from './../../services/api-service.service';
import { TokenDecorderService } from './../../services/token-decorder.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenDecord } from 'src/app/models/tokenDecord';
@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css'],
})
export class ProfileNavbarComponent implements OnInit {
  tokenDecord: TokenDecord;
  apiImageUrl: string;
  userFindex: UserFindex;
  constructor(
    private tokenDecordService: TokenDecorderService,
    private apiService: ApiServiceService,
    private findexService: FindexService
  ) {}

  ngOnInit(): void {
    this.tokenDecorder();
    this.getFindex(this.tokenDecord.id);
    this.apiImageUrl = this.apiService.ApiImageUrl();
  }

  tokenDecorder() {
    this.tokenDecord = this.tokenDecordService.tokenDecoder();
  }
  getFindex(userId: number) {
    if(userId){
      this.findexService.getUserFindex(userId).subscribe((response) => {
        this.userFindex = response.data;
      });
    }
  }
  logout() {
    localStorage.removeItem('token');
    location.reload();
  }
}
