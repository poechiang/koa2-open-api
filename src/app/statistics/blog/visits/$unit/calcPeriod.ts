import * as fns from 'date-fns';

const calcPeriod = (startTime: Date, endTime: Date, unit: StatUnit): number => {
    switch (unit) {
        case 'second':
            return fns.differenceInSeconds(endTime, startTime);
        case 'minute':
            return fns.differenceInMinutes(endTime, startTime);
        case 'hour':
            return fns.differenceInHours(endTime, startTime);
        case 'month':
            return fns.differenceInMonths(endTime, startTime);
        case 'quarter':
            return fns.differenceInQuarters(endTime, startTime);
        case 'year':
            return fns.differenceInYears(endTime, startTime);
        default:
            return fns.differenceInDays(endTime, startTime);
    }
};
export default calcPeriod;
