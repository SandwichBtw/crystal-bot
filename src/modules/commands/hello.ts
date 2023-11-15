import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js"
import { type Command } from "../../types/Command"

module.exports = {
    name: "hello",
    data: new SlashCommandBuilder().setName("hello").setDescription("Say hello!"),
    execute: async function (interaction: ChatInputCommandInteraction) {
        void (await interaction.reply({
            content: "Hey there!",
            ephemeral: false,
        }))
    },
} satisfies Command
