///////////////////////////////////////////////////////////////////////
// UserModel
// @Author: Jeff
// @Created at: Sep. 04, 2021 21:19:55
// @Modified at: Apr. 11, 2022 02:28:08
// @Modified by: Jeff
// @一切伟大的行动都始于一个微不足道的开始!
///////////////////////////////////////////////////////////////////////

import { model, Schema } from 'mongoose';

const schema: Schema = new Schema({
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
});

export default model('user', schema);
