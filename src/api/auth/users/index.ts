/**
 * 用户管理及鉴权
 *
 * @module
 * @Author: Jeff
 * @CreatedAt: Sep. 05, 2021 16:49:05
 * @ModifiedAt: Apr. 16, 2022 14:53:36
 * @ModifiedBy: Jeff
 * @一切伟大的行动都始于一个微不足道的开始!
 */
import UserService from '@svr/user.service';
import { Context } from 'koa';

const service: UserService = new UserService();
/**
 *
 * @api {get} /auth/user/:id
 * @apiDescription 根据用户ID请求指定用户信息
 * @apiName GetUser
 * @apiGroup Auth
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
export const GET = async (ctx: Context) => {
    ctx.json(await service.getUsers(ctx.request.query));
};

export const POST = async (ctx: Context) => {
    ctx.json(await service.postUser(ctx.request.body));
};
