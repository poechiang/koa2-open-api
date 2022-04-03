//***************************************************************************
// @Description  : User Model
// @Author       : Jeffery
// @Date         : 2021-09-04 21:19:55
// @FilePath     : /octopus/src/models/user.model.ts
// @Linsence     : MIT
// 一切伟大的思想和行动，都源于一个微不足道的开始
//***************************************************************************
import { model, Schema } from 'mongoose';

export default model(
    'user',
    new Schema({
        id: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        passd: {
            type: String,
        },
        gender: {
            type: String,
            default: '',
        },
        birth: {
            type: Date,
        },
        nick: {
            type: String,
            default: '',
        },
        avatar: {
            type: Date,
        },
        signature: {
            type: String,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        modifyAt: {
            type: Date,
        },
        state: {
            type: Number,
            default: 0,
        },
        extra: { type: Object, default: null },
    })
);
