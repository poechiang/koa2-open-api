import { model, Schema } from "mongoose";

export default model(
  "articles",
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
      default: "",
    },
    tags: {
      type: Array,
      default: [],
    },
    content: {
      type: String,
      default: "",
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
