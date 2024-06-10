import * as moment from 'moment';
import { throwError } from 'rxjs';

export const formatErrors = (error: any) => {
  if (error && error.status === 401) {
    location.reload();
  }
  let err = error.error;
  if (err.error) {
    err = err.error;
    if (err && err.error_params && err.error_params.length > 0) {
      const errors = err.error_params.map(e => e.msg);
      return throwError(errors);
    } else if (err && err.errors && err.errors.length > 0) {
      return throwError(err.errors);
    } else {
      return throwError(['Oops something went wrong!']);
    }
  } else {
    return throwError(err);
  }
}

export const momentDateTime = (date, time = null) => {
  if (date && date.hasOwnProperty('year') && time) {
    return moment()
      .set({
        year: date.year,
        month: date.month - 1,
        date: date.day,
        hour: time.hour,
        minute: time.minute,
        second: 0,
      })
      .format('YYYY-MM-DD hh:mm:ss');
  } else if (date && date.hasOwnProperty('year')) {
    return moment()
      .set({ year: date.year, month: date.month - 1, date: date.day })
      .format('YYYY-MM-DD');
  }
  return null;
}