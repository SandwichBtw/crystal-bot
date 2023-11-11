import { GatewayIntentBits, Partials } from 'discord.js'
import { getConfig } from './modules/config'
import CrystalClient from './types/CrystalClient'

const config = getConfig()
const client = new CrystalClient({
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

client.login(config.token)