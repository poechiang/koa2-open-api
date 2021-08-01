import { startsWith } from 'lodash';

const origins = [
    {
        url: '/blog/*',
        origin: 'http://localhost:8081',
    },
    {
        url: '/statistics/*',
        origin: 'http://localhost:3000',
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
        return origins.filter(({ url }) =>
            new RegExp(toRegExpStr(url)).test(ctx.url)
        )?.[0]?.origin;
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
