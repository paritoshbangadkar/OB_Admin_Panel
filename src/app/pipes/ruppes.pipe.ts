import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rupees',
})
export class RupeesPipe implements PipeTransform {
    transform(value: number) {
        var rupees = value / 100;
        return rupees;

    }
}






















