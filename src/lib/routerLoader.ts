import { Next } from "koa";

function log(ctx: any) {
  console.log(222, ctx.method, ctx.header.host + ctx.url);
}
export default function () {
  return async function (ctx: any, next: Next) {
    log(ctx);
    await next();
  };
}
