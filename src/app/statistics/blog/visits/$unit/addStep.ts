import * as fns from 'date-fns';

const addStep = (start: Date | number, count: number = 0, unit: StatUnit) => {
    let step;
    switch (unit) {
        case 'second':
            step = fns.addSeconds;
        case 'minute':
            step = fns.addMinutes;
            break;
        case 'hour':
            step = fns.addHours;
            break;
        case 'day':
            step = fns.addDays;
            break;
        case 'month':
            step = fns.addMonths;
            break;
        case 'quarter':
            step = fns.addQuarters;
            break;
        case 'year':
            step = fns.addYears;
            break;
        default:
    }
    return step(start, count);
};

export default addStep;
