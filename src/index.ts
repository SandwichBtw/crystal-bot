import { ShardingManager } from 'discord.js'
import { getConfig } from './modules/config'

const config = getConfig()
const manager = new ShardingManager('./bot.js', { totalShards: config.shards, token: `${config.token}` })

manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`)
})

void manager.spawn()
