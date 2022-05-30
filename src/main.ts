/**
 * @Author: Jeff
 * @CreatedAt: Mar. 21, 2021 02:49:57
 * @ModifiedAt: May. 29, 2022 03:31:46
 * @ModifiedBy: Jeff
 * @一切伟大的行动都始于一个微不足道的开始!
 */
/**
 * @Author: Jeff
 * @CreatedAt: Mar. 21, 2021 02:49:57
 * @ModifiedAt: Apr. 16, 2022 14:40:14
 * @ModifiedBy: Jeff
 * @一切伟大的行动都始于一个微不足道的开始!
 */

import { error, info } from '@Lib/console';
import Resp from '@Mid/Resp';
import { allowedMethods, routes } from '@R/index';
import { AES, enc, mode, pad } from 'crypto-js';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import render from 'koa-ejs';
import json from 'koa-json';
import _static from 'koa-static';
import cors from 'koa2-cors';
import mongoose from 'mongoose';
import path from 'path';
import { CORS, DB, PORT } from '~/config';

const { user, password, url, aseKey, ...options } = DB;
const passd = AES.decrypt(password, enc.Utf8.parse(aseKey), {
    mode: mode.ECB,
    padding: pad.Pkcs7,
}).toString(enc.Utf8);

mongoose
    .connect(`mongodb+srv://${user}:${passd}@${url}`, options)
    .then(() => {
        info(`数据库${'cluster0.8bn1n.mongodb.net'}连接成功`);
    })
    .catch((err) => {
        error(`数据库${'cluster0.8bn1n.mongodb.net'}连接失败`);
    });

const app = new Koa();

app.use(
    _static(`${__dirname}/public`, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        hidden: true,
        gzip: true,
    })
);
app.use(
    _static(`${__dirname}/views/rest`, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        hidden: true,
        gzip: true,
    })
);
app.use(
    _static(`${__dirname}/views/docs`, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        hidden: true,
        gzip: true,
    })
);
app.use(Resp());
app.use(cors(CORS));

app.use(bodyParser());
app.use(json());
render(app, {
    root: path.resolve(__dirname, 'views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false,
});
app.use(routes).use(allowedMethods);

app.listen(PORT, async () => {
    info(`应用启动成功 端口:${PORT}`);
});
