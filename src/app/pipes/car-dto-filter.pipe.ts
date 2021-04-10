import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'carDtoFilter'
})
export class CarDtoFilterPipe implements PipeTransform {

  transform(value: CarDto[], filterText:string): CarDto[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:CarDto)=>p.carName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
