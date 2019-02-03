import moment from 'moment';

export class MomentHelper {

  public static DEFAULT_DATE_PATTERN: string = 'DD/MM/YYYY';
  public static DEFAULT_TIME_PATTERN: string = 'HH:mm:ss';
  public static DEFUALT_DATE_TIME_PATTERN: string = 'DD/MM/YYYY HH:mm:ss';
  public static DEFUALT_TIME_PATTERN_OF: moment.unitOfTime.StartOf = 'day';

  public static format(value: string | Date, pattern: string): string {
    if (value && typeof value === 'string') {
      return moment(String(value)).format(pattern);
    }

    return value ? moment(value).format(pattern) : value;
  }

  public static formatDate(value: string | Date, pattern?: string): string {
    return MomentHelper.format(value, pattern || MomentHelper.DEFAULT_DATE_PATTERN);
  }

  public static formatTime(value: string | Date, pattern?: string): string {
    return MomentHelper.format(value, pattern || MomentHelper.DEFAULT_TIME_PATTERN);
  }

  public static formatDateTime(value: string | Date, pattern?: string): string {
    return MomentHelper.format(value, pattern || MomentHelper.DEFUALT_DATE_TIME_PATTERN);
  }

  public static currentYear(): number {
    return moment().year();
  }

  public static currentDateTime(): Date {
    return moment().toDate();
  }

  public static currentDateTimeStartOf(pattern?: moment.unitOfTime.StartOf): Date {
    return moment().startOf(pattern || MomentHelper.DEFUALT_TIME_PATTERN_OF).toDate();
  }

  public static currentDateTimeEndOf(pattern?: moment.unitOfTime.StartOf): Date {
    return moment().endOf(pattern || MomentHelper.DEFUALT_TIME_PATTERN_OF).toDate();
  }

}
