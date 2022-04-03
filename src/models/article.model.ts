//***************************************************************************
// @Description  : Blog Article Model
// @Author       : Jeffery
// @Date         : 2021-04-07 00:20:00
// @FilePath     : /octopus/src/models/article.model.ts
// @Linsence     : MIT
// 一切伟大的思想和行动，都源于一个微不足道的开始
//***************************************************************************
import { model, Schema } from 'mongoose';

export default model(
    'articles',
    new Schema({
        id: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        catagory: {
            type: String,
            default: '',
        },
        tags: {
            type: Array,
            default: [],
        },
        content: {
            type: String,
            default: '',
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        modifyAt: {
            type: Date,
        },
        author: {
            type: String,
        },
        state: {
            type: Number,
            default: 0,
        },
        draft: {
            type: Boolean,
            default: 0,
        },
        extra: { type: Object, default: null },
    })
);
