import { Context, Next } from "koa";

export default () => async (ctx: Context, next: Next) => {
  ctx.json = (data?: any, code?: number) => {
    ctx.type = "json";
    ctx.body = {
      code: code || 200,
      msg: "success",
      result: data,
    };
  };

  ctx.error = (err: string, code?: number) => {
    ctx.type = "json";
    ctx.body = {
      code: code || 400,
      msg: "failure",
      errMsg: `operator occurs a error: ${err}`,
    };
  };
  ctx.ex = (ex: any, code?: number) => {
    ctx.type = "json";
    ctx.body = {
      code: code || -1,
      msg: "exception",
      errMsg: `operator throw a exception`,
      exception: ex,
    };
  };
  try {
    await next();
  } catch (err) {
    ctx.ex(err);
  }
};
