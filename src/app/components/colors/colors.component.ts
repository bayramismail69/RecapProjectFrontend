import { ColorService } from './../../services/color.service';
import { Color } from './../../models/color';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenDecord } from 'src/app/models/tokenDecord';
import { TokenDecorderService } from 'src/app/services/token-decorder.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css'],
})
export class ColorsComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  colorEmpty: Color;
  filterText: string = '';
  tokenDecord:TokenDecord;
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private tokenDecorderServic:TokenDecorderService
  ) {}

  ngOnInit(): void {
    this.getColors();
  }
  getTokenDecord(){
    this.tokenDecord=this.tokenDecorderServic.tokenDecoder()
  }
  getColors() {
    this.colorService.getColors().subscribe(
      (response) => {
        this.colors = response.data;
      },
      (responseError) => {
        this.toastrService.error('Color servisi sunucuya bağlanamadı');
      }
    );
  }
  setAllColor() {
    this.currentColor = this.colorEmpty;
    this.activatedRoute.queryParams.subscribe((param) => {
      this._router.navigate(['cars/'], {
        queryParams: { brandId: param["brandId"] },
      });
  });
  }
  setColor(color: Color) {
    this.currentColor = color;
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param['coloId'] && param['brandId']) {
        this._router.navigate(['cars/'], {
          queryParams: { colorId: color.id, brandId: param['brandId'] },
        });
      } else {
        this._router.navigate(['cars/'], {
          queryParams: { colorId: color.id, brandId: param['brandId'] },
        });
      }
    });
  }
  allNavlinkClass() {
    if (this.currentColor) {
      return 'nav-item';
    } else {
      return 'nav-item badge badge-primary mt-1';
    }
  }
  colorNavLinkClass(color: Color) {
    if (this.currentColor == color) {
      return 'nav-item badge badge-secondary mt-1';
    } else {
      return 'nav-item';
    }
  }
}
