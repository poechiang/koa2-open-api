const PROD_ENV: string = 'production';
const DEV_ENV: string = 'develop';

export const error = (message?: any, ...args: any[]) => {
    process.env.NODE_ENV !== PROD_ENV && console.error(message, ...args);
};
export const log = (message?: any, ...args: any[]) => {
    process.env.NODE_ENV !== PROD_ENV && console.log(message, ...args);
};
export const info = (message?: any, ...args: any[]) => {
    process.env.NODE_ENV !== PROD_ENV && console.info(message, ...args);
};
export const warn = (message?: any, ...args: any[]) => {
    process.env.NODE_ENV !== PROD_ENV && console.warn(message, ...args);
};
export const debug = (message?: any, ...args: any[]) => {
    process.env.NODE_ENV !== PROD_ENV && console.debug(message, ...args);
};
export const assert = (value: any, message: string, ...args: any[]) => {
    process.env.NODE_ENV !== PROD_ENV &&
        console.assert(value, message, ...args);
};
