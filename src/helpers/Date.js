// import { format } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';
import pt from 'date-fns/locale/pt';
import en from 'date-fns/locale/en-US';
import * as RNLocalize from 'react-native-localize';

const DEVICE_TZ = RNLocalize.getTimeZone();

export const formatToLocale = (date, dateFormat = 'YYYY-mm-dd HH:mm:ss') => {
    return formatToTimeZone(new Date(date), dateFormat, {
        timeZone: DEVICE_TZ,
    });
};
