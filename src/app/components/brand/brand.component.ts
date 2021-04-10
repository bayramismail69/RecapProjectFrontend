import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenDecorderService } from 'src/app/services/token-decorder.service';
import { TokenDecord } from 'src/app/models/tokenDecord';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  brandEmpty:Brand;
  filterText: string = '';
  tokenDecord:TokenDecord;
  constructor(
    private brandService: BrandService,
    private toasterService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private tokenDecorderServic:TokenDecorderService
  ) {}

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(
      (response) => {
        this.brands = response.data;
      },
      (responseError) => {
        this.toasterService.error('Brand service sunucuya bağlanamadı');
      }
    );
  }
  getTokenDecord(){
    this.tokenDecord=this.tokenDecorderServic.tokenDecoder()
  }
  allNavlinkClass() {
  
    if (this.currentBrand) {
      return 'nav-item';
    } else {
      return 'nav-item badge badge-primary mt-1';
     
    }
  }
  setAllBrand(){
    this.currentBrand=this.brandEmpty;
    this.activatedRoute.queryParams.subscribe((param) => {
      this._router.navigate(['cars/'], {
        queryParams: { colorId: param["colorId"] },
      });
  });
  }
  setBrand(brand:Brand)
  {
     this.currentBrand=brand;
     this.activatedRoute.queryParams.subscribe((param) => {
        this._router.navigate(['cars/'], {
          queryParams: { colorId: param["colorId"], brandId: brand.id },
        });
    });
  }
  brandNavLinkClass(brand: Brand) {
    if (this.currentBrand == brand) {
      return 'nav-item badge badge-secondary mt-1';
    } else {
      return 'nav-item';
    }
  }
}
