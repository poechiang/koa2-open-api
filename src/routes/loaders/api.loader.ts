///////////////////////////////////////////////////////////////////////
// 扫描文件结构生成api router
// @Author: Jeff
// @Created at: Mar. 28, 2021 15:21:46
// @Modified at: Apr. 04, 2022 14:57:48
// @Modified by: Jeff
// @一切伟大的行动都始于一个微不足道的开始!
///////////////////////////////////////////////////////////////////////

import fs from 'fs';
import path from 'path';

const ApiRootPath = 'src/api';

const loadRouters = (basePath?: string): RouteInfo[] => {
    const files = fs.readdirSync(path.resolve(ApiRootPath, basePath || ''));

    const routeList: RouteInfo[] = [];
    files.forEach((file) => {
        const filePath = path.resolve(ApiRootPath, basePath || '', file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // 忽略各级文件夹下的common子文件夹
            if (file === 'common') return;

            routeList.push(...loadRouters(path.join(basePath || '', file)));
        } else if (stat.isFile() && file === 'index.ts') {
            const ctrl = require(filePath);
            const url = '/' + (basePath || '').replace(/\/\$/g, '/:');
            routeList.push(
                ...Object.entries(ctrl).map(
                    ([method, action]) =>
                        ({
                            url,
                            method:
                                method === 'default'
                                    ? ctrl.method || 'GET'
                                    : method,
                            action,
                        } as RouteInfo)
                )
            );
        }
    });
    return routeList;
};

export default { load: loadRouters };
