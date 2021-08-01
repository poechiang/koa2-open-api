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
    action: Function;
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
