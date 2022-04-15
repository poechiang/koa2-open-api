//***************************************************************************
// @Description  : Oss Database Svr
// @Author       : Jeffery
// @Date         : 2021-09-04 21:24:42
// @FilePath     : /octopus/src/service/oss.service.ts
// @Linsence     : MIT
// 一切伟大的思想和行动，都源于一个微不足道的开始
//***************************************************************************
import UserModel from '@M/user.model';
import { max, reduce, slice, sortBy } from 'lodash';

export default class OssService {
    getUserById = async (id: string) =>
        new Promise((resolve, reject) => {
            UserModel.findById(id).then(resolve);
        });

    getUsers = async (query: any) =>
        new Promise((resolve, reject) => {
            UserModel.find(
                query,
                [], // Columns to Return
                {
                    skip: 0, // Starting Row
                    limit: 10, // Ending Row
                    sort: {
                        modifyAt: -1, //Sort by Date Added DESC
                        createdAt: -1,
                    },
                }
            ).then((list) => {
                resolve(list);
            });
        });

    postUser = (data: any) => {
        if (!data.createdAt) {
            data.createdAt = new Date();
        }
        return new Promise((resolve, reject) => {
            const newUser = new UserModel(data);
            newUser
                .save()
                .then((user: any) => {
                    resolve(user);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    };
    updateUser = (data: any) => {
        return new Promise((resolve, reject) => {
            const { _id, ...art } = data;
            art.modifyAt = new Date();
            UserModel.updateOne({ _id }, art)
                .then((rlt: any) => {
                    resolve(rlt);
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    };
    deleteUser = (id: string) => {
        return new Promise((resolve, reject) => {
            UserModel.deleteOne({ _id: id }).then((args: any) => {
                resolve(args);
            });
        });
    };
    getTagsStatistics = () => {
        return new Promise((resolve, reject) => {
            UserModel.find({ draft: false }).then((list: any[]) => {
                resolve(
                    (list || []).reduce((info, { tags }) => {
                        tags.forEach((tag: string) => {
                            info[tag] = (info[tag] || 0) + 1;
                        });
                        return info;
                    }, {})
                );
            });
        });
    };
    getCatagories = () => {
        return new Promise((resolve, reject) => {
            UserModel.find({ draft: false }).then((list: any[]) => {
                resolve(
                    Array.from(
                        new Set((list || []).map(({ catagory }) => catagory))
                    )
                );
            });
        });
    };
    statCatagories = (limit: number, order?: OrderInfo) => {
        return new Promise((resolve, reject) => {
            UserModel.find({ draft: false }).then((list: any[] = []) => {
                const result = reduce(
                    list,
                    (rlt, { catagory, createdAt, modifyAt }) => {
                        const cata = rlt[catagory] || { count: 0 };
                        rlt[catagory] = {
                            catagory,
                            count: cata.count + 1,
                            dt: max(
                                cata.dt
                                    ? [cata.dt, modifyAt, createdAt]
                                    : [modifyAt, createdAt]
                            ),
                        };
                        return rlt;
                    },
                    {} as any
                );

                resolve(
                    slice(
                        sortBy(Object.values(result), (o: any) => o.dt),
                        0,
                        5
                    )
                );
            });
        });
    };
}
