import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { type Command } from "../../types/Command";
import type CrystalClient from "../../types/CrystalClient";

module.exports = {
    name: 'dm',
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Send a direct message to someone using the bot."),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {

    }
} satisfies Command
