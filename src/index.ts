import { ShardingManager } from 'discord.js';
import { getConfig } from './modules/config';

const config = getConfig()
const manager = new ShardingManager('./bot.js', { /*Total-Shards*/ /*Mode*/ /*respawn: boolean*/token: `${config.token}` });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();