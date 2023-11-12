import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { type Command } from "src/types/Command";
import type CrystalClient from "src/types/CrystalClient";

module.exports = {
    name: 'hello',
    data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Say hello!"),
    execute: function(interaction: ChatInputCommandInteraction, client: CrystalClient) {
        void interaction.reply({
            content: "Hey there!",
            ephemeral: false
        })
    }
} satisfies Command