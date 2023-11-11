import { Message } from "discord.js";
import { Event } from "../../types/Event"
import CrystalClient from "../../types/CrystalClient";
import { getConfig } from "../config";
import { Command } from "../../types/Command";

let config = getConfig();

module.exports = {
    name: "messageCreate",
    once: false,
    rest: false,
    execute: function (message: Message, client: CrystalClient) {
        if (!message.content.startsWith(config.prefix)) return
        if (message.author.bot) return
        for (let command of CrystalClient.commands.keys()) {
            let commandName = message.content.substring(1)
            if(command === commandName) {
                CrystalClient.commands.get(command)!(message, client);
            }
        }
    }
} as Event