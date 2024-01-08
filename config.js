import { config } from 'dotenv';
config();

export const PORT = process.env.BACK_PORT;
export const FRONT = process.env.FRONT_PORT;
export const HOST = `http://localhost:${FRONT}`;

export const MP_TOKEN = process.env.MP_TOKEN;