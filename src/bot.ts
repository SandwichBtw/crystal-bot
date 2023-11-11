import { Client, GatewayIntentBits } from 'discord.js'
import { getConfig } from './modules/config'

const config = getConfig()
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on('ready', bot => {
    console.log(`Logged in as ${bot.user.tag}`)
})

client.login(config.token)