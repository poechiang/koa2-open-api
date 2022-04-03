//***************************************************************************
// @Description  : 统计用户活跃度
// @Author       : Jeffery
// @Date         : 2021-08-29 23:52:26
// @FilePath     : /octopus/src/app/statistics/oss/commits/$unit/index.ts
// @Linsence     : MIT
// 一切伟大的思想和行动，都源于一个微不足道的开始
//***************************************************************************
import { Context } from 'koa';
import { map, random, toNumber } from 'lodash';
import addStep from '../../../common/addStep';
import calcPeriod from '../../../common/calcPeriod';

export const GET = async (ctx: Context) => {
    const { unit } = ctx.params;
    const { startTime, endTime } = ctx.query as StatisticsParams;
    if (!startTime) {
        return ctx.error(`invalid argument "startTime": ${startTime}`);
    }
    if (!endTime) {
        return ctx.error(`invalid argument "endTime": ${endTime}`);
    }

    const start = new Date(toNumber(startTime));

    const _end = new Date(toNumber(endTime));

    let count = calcPeriod(start, _end, unit);

    const list = map(Array(count).fill(null), (item, index: number) => ({
        date: addStep(start, index, unit),
        visits: random(0, 10),
    }));

    ctx.json(list);
};
