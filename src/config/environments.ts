/**
 * @Author: Jeff
 * @CreatedAt: Apr. 10, 2021 22:44:43
 * @ModifiedAt: May. 29, 2022 03:31:42
 * @ModifiedBy: Jeff
 * @一切伟大的行动都始于一个微不足道的开始!
 */
import { filter, isArray, isString, reduce, some, startsWith } from 'lodash';
import { Context } from 'vm';
const origins: IOriginList = [
    {
        url: '/blog/*',
        origin: 'http://*.jeffrey.me',
    },
    {
        url: '/statistics/*',
        origin: 'http://*.jeffrey.me',
    },
    {
        url: '/test',
        origin: '*',
    },
];
const toRegExp = (url: string) => {
    const str = url.replace(/\//g, '/').replace(/\*/g, '(.*)');
    const exp = startsWith(str, '/') ? `^${str}` : str;
    return new RegExp(exp);
};
const testUrl = (exp: string | RegExp, url: string) => {
    if (isString(exp)) {
        exp = toRegExp(exp);
    }
    return (exp as RegExp).test(url);
};
const origin = (ctx: Context) => {
    const filtered = filter(origins, ({ url }) => testUrl(url, ctx.url));
    const list = reduce(
        filtered,
        (o, { origin }) => {
            if (isArray(origin)) {
                return [...o, ...origin];
            } else {
                return [...o, origin];
            }
        },
        []
    );

    if (some(list || [], (exp) => testUrl(exp, ctx.header.origin))) {
        return ctx.header.origin;
    }
    return null;
};
export const cors = {
    origin,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowHeaders: [
        'x-requested-with',
        'Content-Type',
        'Authorization',
        'Accept',
    ],
};
