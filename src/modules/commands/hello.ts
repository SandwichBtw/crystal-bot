import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js"
import { type Command } from "../../types/Command"
import type CrystalClient from "../../types/CrystalClient"

module.exports = {
    name: "hello",
    data: new SlashCommandBuilder().setName("hello").setDescription("Say hello!"),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        void await interaction.reply({
            content: "Hey there!",
            ephemeral: false,
        })
    },
} satisfies Command
