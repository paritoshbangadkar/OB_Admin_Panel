import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})

export class TimeFormatPipe implements PipeTransform {
  transform(timeString: string): string {
    if (!timeString) return '';

    const [hours, minutes] = timeString.split(':').map(Number);
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
  }
}
