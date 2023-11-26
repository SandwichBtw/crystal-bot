import { GatewayIntentBits, Partials } from "discord.js"
import { getConfig } from "./modules/config"
import CrystalClient from "./types/CrystalClient"

const config = getConfig()
const client = new CrystalClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageTyping
    ],
    partials: [Partials.User, Partials.Message, Partials.GuildMember, Partials.ThreadMember],
})

void client.login(config.token)
