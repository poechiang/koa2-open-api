import BlogService from '@svr/blog.service';
import { Context } from 'koa';

const service: BlogService = new BlogService();

export const GET = async (ctx: Context) => {
    ctx.json(await service.getArticles(ctx.request.query));
};

export const POST = async (ctx: Context) => {
    ctx.json(await service.postArticle(ctx.request.body));
};
