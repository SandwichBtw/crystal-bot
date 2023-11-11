import { Message } from "discord.js";
import { Command } from "../../types/Command";

module.exports = {
    name: 'help',
    execute: function(message: Message) {
        message.reply("Hey")
    }
} as Command