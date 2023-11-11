import { Client, Message } from "discord.js";
import { Event } from "../../types/Event"
import { getConfig } from "../config"

const config = getConfig()
module.exports = {
    name: "messageCreate",
    once: false,
    rest: false,
    execute: function (message: Message, client: Client) {
        if (!message.content.startsWith(config.prefix)) return
        if (message.author.bot) return
        if (message.content === ".hello") message.reply("Hey")
    }
} as Event