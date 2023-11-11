import { type Message } from "discord.js";
import { type Command } from "../../types/Command";

module.exports = {
    name: 'help',
    execute: function(message: Message) {
        void message.reply("Hey")
    }
} satisfies Command