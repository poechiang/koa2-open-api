const origins = [
  {
    url: "/blog/*",
    origin: "http://localhost:8081",
  },
  {
    url: "/test",
    origin: "*",
  },
];
const toRegExpStr = (url: string) => {
  return url.replace(/\//g, "/").replace(/\*/g, "(.*)");
};
export const cors = {
  origin: (ctx: any) => {
    return origins.filter(({ url }) =>
      new RegExp(toRegExpStr(url)).test(ctx.url)
    )?.[0]?.origin;
  },
  exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
  maxAge: 5,
  credentials: true,
  allowMethods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: ["x-requested-with", "Content-Type", "Authorization", "Accept"],
};
