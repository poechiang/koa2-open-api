/**
 * @Author: Jeff
 * @CreatedAt: Apr. 04, 2022 15:25:34
 * @ModifiedAt: Apr. 16, 2022 14:41:12
 * @ModifiedBy: Jeff
 * @一切伟大的行动都始于一个微不足道的开始!
 */
/**
 *
 * @Author: Jeff
 * @Created at: Apr. 04, 2022 15:25:34
 * @Modified at: Apr. 16, 2022 04:35:20
 * @Modified by: Jeff
 * @一切伟大的行动都始于一个微不足道的开始!
 */
import fs from 'fs';
import { Next } from 'koa';
import { replace } from 'lodash';
import path from 'path';
import { Context } from 'vm';

const ViewRootPath = path.resolve('src/views');

const loadRouters = (basePath?: string): RouteInfo[] => {
    const files = fs.readdirSync(path.join(ViewRootPath, basePath || ''));

    const routeList: RouteInfo[] = [];
    files.forEach((file) => {
        const filePath = path.resolve(ViewRootPath, basePath || '', file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            // 忽略各级文件夹下的common子文件夹
            if (file === 'layouts') return;

            routeList.push(...loadRouters(path.join(basePath || '', file)));
        } else if (stat.isFile()) {
            if (file === 'layout.html') {
                return;
            }
            const path = replace(filePath, ViewRootPath, '/views');
            const url = replace(path, /(\/index)?\.html$/, '');
            routeList.push({
                url,
                view: async (ctx: Context, next: Next) => {
                    await ctx.render(replace(file, /\.html$/, ''));
                },
            });
        }
    });

    return routeList;
};

export default { load: loadRouters };
