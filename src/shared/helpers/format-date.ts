// eslint-disable-next-line import/no-duplicates
import ru from 'date-fns/locale/ru';
// eslint-disable-next-line import/no-duplicates
import { format as _format } from 'date-fns';

export function formatDate(date: string | number | Date, format: string = 'PP') {
  const _date = typeof date === 'string' ? new Date(date) : date;

  return _format(_date, format, { locale: ru });
}
