import BlogService from "@svr/blog.service";
import { Context } from "koa";
import { reverse, sortBy } from "lodash";

const service: BlogService = new BlogService();

export const GET = async (ctx: Context) => {
  const tags = await service.getTagsStatistics();
  const tagList = Object.entries(tags).map(([tag, count]) => ({ tag, count }));

  ctx.json(reverse(sortBy(tagList, (o) => [o.count, o.tag])).slice(0, 9));
};
