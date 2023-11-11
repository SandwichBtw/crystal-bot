import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js'
import { getConfig } from './modules/config'

const config = getConfig()
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.User,
        Partials.Message,
        Partials.GuildMember,
        Partials.ThreadMember
    ]
})

client.on('ready', bot => {
    console.log(`Logged in as ${bot.user.tag}`)
})


client.login(config.token)