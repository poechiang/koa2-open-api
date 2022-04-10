///////////////////////////////////////////////////////////////////////
// 默认模板文件路由处理
// @Author: Jeff
// @Created at: Mar. 22, 2021 00:51:45
// @Modified at: Apr. 04, 2022 14:48:57
// @Modified by: Jeff
// @一切伟大的行动都始于一个微不足道的开始!
///////////////////////////////////////////////////////////////////////

import HomeService from '@svr/index.service';
import { Context } from 'koa';

const service: HomeService = new HomeService();

/**
 * GET方法
 * @param ctx 请求上下文
 */
export const GET = async (ctx: Context) => {
    ctx.body = await service.hello();
};
