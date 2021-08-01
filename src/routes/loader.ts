import fs from 'fs';
import path from 'path';

const AppRootPath = 'src/app';

const loadRouters = (basePath?: string): RouteInfo[] => {
    const files = fs.readdirSync(path.resolve(AppRootPath, basePath || ''));

    const routeList: RouteInfo[] = [];
    files.forEach((file) => {
        const filePath = path.resolve(AppRootPath, basePath || '', file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            routeList.push(...loadRouters(path.join(basePath || '', file)));
        } else if (stat.isFile() && file === 'index.ts') {
            const ctrl = require(filePath);
            const url = '/' + (basePath || '').replace(/\/\$/g, '/:');
            routeList.push(
                ...Object.entries(ctrl).map(([method, action]) => {
                    if (method === 'default') {
                        return {
                            url,
                            method: ctrl.method || 'GET',
                            action,
                        } as RouteInfo;
                    }
                    return { url, method, action } as RouteInfo;
                })
            );
        }
    });
    return routeList;
};

export default loadRouters;
