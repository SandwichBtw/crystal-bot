import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js"
import { type Command } from "../../types/Command"
import type CrystalClient from "../../types/CrystalClient"
import { loadEvents } from "../utils/eventHandler"

module.exports = {
    name: "reload",
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("reload the command, channels or events."),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        void await interaction.deferReply({ephemeral: true})
        void await interaction.editReply({content: "Completed the reload."})

        void loadEvents(client)
    },
} satisfies Command
