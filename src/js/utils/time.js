import { startsWith } from 'lodash';
import Duration from 'luxon/src/duration';

import { BUS_EARLY_THRESHOLD, BUS_LATE_THRESHOLD } from 'constants/config';

export const isEarly = (delay) => asSeconds(delay) < BUS_EARLY_THRESHOLD;
export const isLate = (delay) => asSeconds(delay) > BUS_LATE_THRESHOLD;

export const asMinutes = (delay) => Duration.fromISO(delay.replace('-', '')).toFormat('m');

const asSeconds = (delay) => {
    const negative = startsWith(delay, '-');

    return negative ? Duration.fromISO(delay.slice(1)).negate().as('seconds')
                    : Duration.fromISO(delay).as('seconds');
};
