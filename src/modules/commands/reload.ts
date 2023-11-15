import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js"
import { type Command } from "../../types/Command"
import { loadEvents } from "../utils/eventHandler"
import type CrystalClient from "../../types/CrystalClient"
import { loadCommands } from "../utils/commandHandler"

module.exports = {
    name: "reload",
    data: new SlashCommandBuilder().setName("reload").setDescription("reload the command, channels or events."),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        console.log(`
        _____     _           _ _
       | __  |___| |___ ___ _| |_|___ ___
       |    -| -_| | . | .'| . | |   | . |
       |__|__|___|_|___|__,|___|_|_|_|_  |
                                     |___|
       `)
        void (await interaction.deferReply({ ephemeral: true }))
        void loadEvents(client)
        void loadCommands(client)
        void (await interaction.editReply({ content: "Completed the reload." }))
    },
} satisfies Command
