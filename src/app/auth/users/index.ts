import UserService from '@svr/user.service';
import { Context } from 'koa';

const service: UserService = new UserService();

export const GET = async (ctx: Context) => {
    ctx.json(await service.getUsers(ctx.request.query));
};

export const POST = async (ctx: Context) => {
    ctx.json(await service.postUser(ctx.request.body));
};
