import * as dotenv from 'dotenv'
dotenv.config()

export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = String(process.env.POSTGRES_PASSWORD);
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
export const PORT = process.env.PORT;