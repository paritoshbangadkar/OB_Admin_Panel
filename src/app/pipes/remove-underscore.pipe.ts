import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeUnderScore'
})
export class RemoveUnderScorePipe implements PipeTransform {
    transform(value: string) {
        if (!value) {
            return '';
        } else {
            return value.replace(/_/g, ' ');
        }
    }
}