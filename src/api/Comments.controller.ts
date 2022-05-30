/**
 * 评论模块
 * @module
 * @Author: Jeff
 * @CreatedAt: Apr. 16, 2022 21:11:34
 * @ModifiedAt: Apr. 16, 2022 21:11:36
 * @ModifiedBy: Jeff
 */

import Controller from '../decorators/controller.dec';

@Controller({
    url: '/comment',
})
export class CommentsController {
    /**
     * @description 描述
     * @api {get} /comments 获取所有评论
     * @apiGroup 评论控制器
     */
    public getAllComments(...args: any[]) {
        console.log(args);
    }
}
