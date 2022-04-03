import { isArray, isString, startsWith } from 'lodash';

const origins = [
    {
        url: '/blog/*',
        origin: ['http://localhost:3002', 'http://localhost:3001'],
    },
    {
        url: '/statistics/*',
        origin: 'http://localhost:3001',
    },
    {
        url: '/test',
        origin: '*',
    },
];
const toRegExpStr = (url: string) => {
    const str = url.replace(/\//g, '/').replace(/\*/g, '(.*)');
    return startsWith(str, '/') ? `^${str}` : str;
};
export const cors = {
    origin: (ctx: any) => {
        const list = origins.filter(({ url }) =>
            new RegExp(toRegExpStr(url)).test(ctx.url)
        )?.[0]?.origin;
        if (isArray(list) && list?.indexOf(ctx.header.origin) >= 0) {
            return ctx.header.origin;
        } else if (isString(list)) {
            return list;
        }
        return null;
    },
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
