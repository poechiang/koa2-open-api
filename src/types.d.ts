/**
 * @Author: Jeff
 * @CreatedAt: Mar. 22, 2021 04:10:38
 * @ModifiedAt: May. 31, 2022 06:24:11
 * @ModifiedBy: Jeff
 * @一切伟大的行动都始于一个微不足道的开始!
 */
declare module 'koa-less';
declare type StatUnit =
    | 'second'
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'quarter'
    | 'year';
declare interface RouteInfo {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'DELETE';
    action?: Function;
    view?: any;
}

declare type OrderInfo =
    | string
    | string[]
    | {
          fields: string | string[];
          order?: 'asc' | 'desc';
      };

declare type QueryMetaInfo = {
    fields: string | string[];
};

declare interface StatisticsParams {
    unit?: StatUnit;
    startTime?: Date | string | number | null;
    endTime?: Date | string | number | null;
}

interface IOrigin {
    url: string;
    origin: string;
}
type IOriginList = IOrigin[];
