import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ePochDate',
})
export class EPochDatePipe implements PipeTransform {
    transform(value: number): string | null {
        let epochTime: number = value;
        if (epochTime === null) {
            return null;
        } else {
            let date = new Date(epochTime * 1000).toLocaleString();
            return date;
        }
    }
}
