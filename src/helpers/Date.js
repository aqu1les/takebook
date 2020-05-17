import { format } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';
import pt from 'date-fns/locale/pt';
import en from 'date-fns/locale/en-US';

export const formatToLocale = (date, dateFormat) => {
    return format(new Date(date), dateFormat);
};
