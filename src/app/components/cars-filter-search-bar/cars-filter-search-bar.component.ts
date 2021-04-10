import { BrandService } from './../../services/brand.service';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-cars-filter-search-bar',
  templateUrl: './cars-filter-search-bar.component.html',
  styleUrls: ['./cars-filter-search-bar.component.css']
})
export class CarsFilterSearchBarComponent implements OnInit {
  brands:Brand[]=[];
  colors:Color[]=[];
  filterText:string="";
  
  selectedColorValue: string = '0';
  selectedBrandValue: string = '0';
  constructor(private _router:Router,private colorService:ColorService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    
  }
  selecteyd(){
return "selected"
  }
  selectColorChange(selectColor: string) {
    this.selectedColorValue = selectColor;
    console.log(selectColor);
  }
  selectBrandChange(selectBrand: string) {
    this.selectedBrandValue = selectBrand;
    console.log(selectBrand);
  }
  btnSorgula() {
    if (this.selectedBrandValue !== '0' && this.selectedColorValue !== '0') {
      this._router.navigate(['cars/'], {
        queryParams: { colorId:parseInt(this.selectedColorValue), brandId: parseInt(this.selectedBrandValue) },
      });
    } else if (this.selectedColorValue !== '0') {
      this._router.navigate(['cars/'], {
        queryParams: { colorId: parseInt(this.selectedColorValue) },
      });
      parseInt(this.selectedColorValue);
    } else if (this.selectedBrandValue !== '0') {
      parseInt(this.selectedBrandValue);
      this._router.navigate(['cars/'], {
        queryParams: { brandId: parseInt(this.selectedBrandValue) },
      });
    } else {
      this._router.navigate(['cars/'], {
        queryParams: { },
      });
    }
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
}
