import HomeService from "@svr/index.service";
import { Context } from "koa";

const service: HomeService = new HomeService();

export const GET = async (ctx: Context) => {
  ctx.body = await service.hello();
};
