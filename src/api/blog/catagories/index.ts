import BlogService from '@svr/blog.service';
import { Context } from 'koa';

const service: BlogService = new BlogService();

export const GET = async (ctx: Context) => {
    const catas = await service.getCatagories();
    ctx.json(catas);
};
