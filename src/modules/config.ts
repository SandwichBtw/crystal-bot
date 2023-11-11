import { type Config } from '../types/Config';
import dotenv from 'dotenv';

export function getConfig(): Config {
    dotenv.config({path: '../.env'})

    return {
        token: `${process.env.TOKEN}`,
        prefix: `${process.env.PREFIX}`,
        admins: (process.env.ADMINS != null ? (process.env.ADMINS).split(' ') : []),
        shards: (process.env.SHARDS != null ? parseInt(process.env.SHARDS) : 1),
        postgresConfig: {
            host: `${process.env.POSTGRES_HOST}`,
            username: `${process.env.POSTGRES_USERNAME}`,
            password: `${process.env.POSTGRES_PASSWORD}`,
            port: (process.env.POSTGRES_PORT != null ? parseInt(process.env.POSTGRES_PORT) : 5432),
            database: `${process.env.POSTGRES_DATABASE}`
        }
    }
}