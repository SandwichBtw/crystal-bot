import { type Config } from "../types/Config"
import dotenv from "dotenv"

export function getConfig(): Config {
    dotenv.config({ path: "../.env" })

    return {
        token: `${process.env.TOKEN}`,
        admins: process.env.ADMINS != null ? process.env.ADMINS.split(" ") : [],
        channelId: `${process.env.CHANNEL_ID}`,
        shards: process.env.SHARDS != null ? parseInt(process.env.SHARDS) : 1,
    }
}
