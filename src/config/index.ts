import * as dotenv from "dotenv";
import DB from "./database";
import { cors as CORS } from "./environments";
dotenv.config();

export const { PORT, NODE_ENV } = process.env;

export { DB, CORS };
