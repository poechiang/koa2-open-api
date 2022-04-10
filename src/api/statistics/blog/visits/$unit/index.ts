///////////////////////////////////////////////////////////////////////
//
// @Author: Jeff
// @Created at: Jul. 18, 2021 23:52:11
// @Modified at: Apr. 04, 2022 14:37:37
// @Modified by: Jeff
// @一切伟大的行动都始于一个微不足道的开始!
///////////////////////////////////////////////////////////////////////
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
        visits: random(3000, 4000),
    }));

    ctx.json(list);
};
