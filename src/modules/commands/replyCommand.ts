import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { type Command } from "src/types/Command";
import type CrystalClient from "src/types/CrystalClient";

module.exports = {
    name: 'reply',
    data: new SlashCommandBuilder()
        .setName("reply")
        .setDescription("Reply to a message using the bot."),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {

    }
} satisfies Command