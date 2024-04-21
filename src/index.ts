import { ShardingManager } from "discord.js"
import { getConfig } from "./modules/config"

const config = getConfig()
const manager = new ShardingManager("./bot.js", { totalShards: config.shards, token: `${config.token}` })

manager.on("shardCreate", shard => {
    console.log(`Launched shard ${shard.id + 1}`)
})

process.on("unhandledRejection", err => {
    console.log((err as Error).stack, "error")
})

void manager.spawn()
