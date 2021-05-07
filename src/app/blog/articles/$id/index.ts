import BlogService from "@svr/blog.service";
import { Context, Next } from "koa";

const service: BlogService = new BlogService();

export const GET = async (ctx: Context, next: Next) => {
  const { id } = ctx.params;
  ctx.json(await service.getArticleById(id));
};
export const PATCH = async (ctx: Context, next: Next) => {
  const { id } = ctx.params;
  ctx.body = await service.getArticleById(id);
};
export const POST = async (ctx: Context) => {
  const rlt: any = await service.updateArticle(ctx.request.body);
  if (!rlt._id) {
    rlt._id = ctx.request.body._id;
  }

  ctx.json(rlt);
};
export const DELETE = async (ctx: Context) => {
  const { id } = ctx.params;
  ctx.json(await service.deleteArticle(id));
};
