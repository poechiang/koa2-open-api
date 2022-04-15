///////////////////////////////////////////////////////////////////////
//
// @Author: Jeff
// @Created at: Apr. 21, 2021 23:02:51
// @Modified at: Apr. 16, 2022 04:21:15
// @Modified by: Jeff
// @一切伟大的行动都始于一个微不足道的开始!
///////////////////////////////////////////////////////////////////////

import BlogService from '@svr/blog.service';
import { Context } from 'koa';
import { reverse, sortBy } from 'lodash';

const service: BlogService = new BlogService();

export const GET = async (ctx: Context) => {
    const tags = await service.getTagsStatistics();
    const tagList = Object.entries(tags).map(([tag, count]) => ({
        tag,
        count,
    }));

    ctx.json(reverse(sortBy(tagList, (o) => [o.count, o.tag])).slice(0, 9));
};
