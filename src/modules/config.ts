import { Config } from '../types/Config';
import dotenv from 'dotenv';

export function getConfig(): Config {
    dotenv.config({path: '../../.env'})

    return {
        token: `${process.env.TOKEN}`,
        prefix: `${process.env.PREFIX}`,
        admins: (process.env.ADMINS != null ? (process.env.ADMINS).split(' ') : []),
        shards: (process.env.SHARDS != null ? parseInt(process.env.SHARDS) : 1),
    }
}