import { Config } from '../types/Config';

export function getConfig(): Config {
    return {
        token: `${process.env.TOKEN}`,
        prefix: `${process.env.PREFIX}`,
        admins: (process.env.ADMINS != null ? (process.env.ADMINS).split(' ') : []),
        shards: (process.env.SHARDS != null ? parseInt(process.env.SHARDS) : 1),
    }
}