//***************************************************************************
// @Description  : Router Outputer
// @Author       : Jeffery
// @Date         : 2021-03-21 23:08:25
// @FilePath     : /octopus/src/routes/index.ts
// @Linsence     : MIT
// 一切伟大的思想和行动，都源于一个微不足道的开始
//***************************************************************************
import KoaRouter from 'koa-router';
import { lowerCase, map, toString } from 'lodash';
import loadRouters from './loader';

const router = new KoaRouter();

try {
    const routes: Array<RouteInfo> = loadRouters();
    console.debug(map(routes, (r) => `${r.method} ${r.url}`));
    routes.forEach(({ url, method, action }) => {
        (router as any)[lowerCase(toString(method || 'get'))](url, action);
    });
} catch (err) {
    console.error(err);
}

export default router;
