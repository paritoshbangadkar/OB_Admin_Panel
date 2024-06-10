import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals = [
        { key: 'year', value: 31536000 },
        { key: 'month', value: 2592000 },
        { key: 'week', value: 604800 },
        { key: 'day', value: 86400 },
        { key: 'hour', value: 3600 },
        { key: 'minute', value: 60 },
        { key: 'second', value: 1 },
      ];
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i].value);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + intervals[i].key + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + intervals[i].key + 's ago'; // plural (2 days ago)
          }
      }
    }
    return value;
  }
}
