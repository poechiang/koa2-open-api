///////////////////////////////////////////////////////////////////////
//
// @Author: Jeff
// @Created at: Apr. 07, 2021 01:29:52
// @Modified at: Apr. 16, 2022 00:36:58
// @Modified by: Jeff
// @一切伟大的行动都始于一个微不足道的开始!
///////////////////////////////////////////////////////////////////////

import BlogService from '@svr/blog.service';
import { Context } from 'koa';

const service: BlogService = new BlogService();

/**
 * 获取博客文章列表
 * @param ctx 响应上下文
 */
export const GET = async (ctx: Context) => {
    ctx.json(await service.getArticles(ctx.request.query));
};

/**
 * 发表或修改文章
 * @param ctx 响应上下文
 */
export const POST = async (ctx: Context) => {
    ctx.json(await service.postArticle(ctx.request.body));
};
