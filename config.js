import { config } from 'dotenv';
config();

export const PORT = 8082;
export const FRONT = 5173;
export const HOST = `http://localhost:${FRONT}`;

export const MP_TOKEN = process.env.MP_TOKEN;