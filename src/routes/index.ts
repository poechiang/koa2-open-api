///////////////////////////////////////////////////////////////////////
// router outpuer
// @Author: Jeff
// @Created at: Mar. 21, 2021 23:08:25
// @Modified at: Apr. 04, 2022 15:28:46
// @Modified by: Jeff
// @一切伟大的行动都始于一个微不足道的开始!
///////////////////////////////////////////////////////////////////////

import KoaRouter from 'koa-router';
import { lowerCase, map, toString } from 'lodash';
import apiLoader from './loaders/api.loader';
import viewLoader from './loaders/view.loader';

const router = new KoaRouter();

try {
    const apiRoutes: Array<RouteInfo> = apiLoader.load();
    console.debug(map(apiRoutes, (r) => `[API] ${r.method} ${r.url}`));
    apiRoutes.forEach(({ url, method, action }) => {
        (router as any)[lowerCase(toString(method || 'get'))](url, action);
    });
    const viewRoutes: Array<RouteInfo> = viewLoader.load();
    console.debug(map(viewRoutes, (r) => `[VIEW] GET ${r.url}`));
    viewRoutes.forEach(({ url, view }) => {
        router.get(url, view);
    });
} catch (err) {
    console.error(err);
}

export const routes = router.routes();
export const allowedMethods = router.allowedMethods();
