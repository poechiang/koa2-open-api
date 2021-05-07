import { info } from "@Lib/console";
import Resp from "@Mid/Resp";
import router from "@R/index";
import { AES, enc, mode, pad } from "crypto-js";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import cors from "koa2-cors";
import mongoose from "mongoose";
import { CORS, DB, PORT } from "~/config";

const { user, password, url, aseKey, ...options } = DB;
const passd = AES.decrypt(password, enc.Utf8.parse(aseKey), {
  mode: mode.ECB,
  padding: pad.Pkcs7,
}).toString(enc.Utf8);

mongoose.connect(`mongodb+srv://${user}:${passd}@${url}`, options).then(() => {
  info(`数据库${"cluster0.8bn1n.mongodb.net"}连接成功`);
});

const app = new Koa();

app.use(Resp());
app.use(cors(CORS));

app.use(bodyParser());
app.use(json());

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, async () => {
  info(`应用启动成功 端口:${PORT}`);
});
