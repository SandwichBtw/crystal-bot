import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { type Command } from "src/types/Command";
import type CrystalClient from "src/types/CrystalClient";

module.exports = {
    name: 'help',
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help informationfrom the bot"),
    execute: function(interaction: ChatInputCommandInteraction, client: CrystalClient) {
        void interaction.reply({
            content: "Hey there!",
            ephemeral: false
        })
    }
} satisfies Command