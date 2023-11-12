import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { type Command } from "../../types/Command";
import type CrystalClient from "../../types/CrystalClient";

module.exports = {
    name: 'react',
    data: new SlashCommandBuilder()
        .setName("react")
        .setDescription("React to a message using the bot."),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {

    }
} satisfies Command