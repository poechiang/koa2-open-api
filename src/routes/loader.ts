//***************************************************************************
// @Description  : 扫描文件结构生成router
// @Author       : Jeffery
// @Date         : 2021-03-28 15:21:46
// @FilePath     : /octopus/src/routes/loader.ts
// @Linsence     : MIT
// 一切伟大的思想和行动，都源于一个微不足道的开始
//***************************************************************************
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
            // 忽略各级文件夹下的common子文件夹
            if (file === 'common') return;

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
