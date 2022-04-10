import BlogService from '@svr/blog.service';
import { Context } from 'koa';
import { parseInt } from 'lodash';

const service: BlogService = new BlogService();

export const GET = async (ctx: Context) => {
    const { limit = '5' } = ctx.query;

    const catas = await service.statCatagories(parseInt(limit as string));

    ctx.json(catas);
};
