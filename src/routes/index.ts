import KoaRouter from 'koa-router';
import { lowerCase, toString } from 'lodash';
import loadRouters from './loader';

const router = new KoaRouter();

try {
    const routes: Array<RouteInfo> = loadRouters();
    console.log(routes);
    routes.forEach(({ url, method, action }) => {
        (router as any)[lowerCase(toString(method || 'get'))](url, action);
    });
} catch (err) {
    console.error(err);
}

export default router;
