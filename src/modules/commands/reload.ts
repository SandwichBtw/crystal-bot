import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js"
import { type Command } from "../../types/Command"
import { loadEvents } from "../utils/eventHandler"
import type CrystalClient from "../../types/CrystalClient"
import { loadCommands } from "../utils/commandHandler"
import { getConfig } from "../config"

const config = getConfig()

module.exports = {
    name: "reload",
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload the commands and events."),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        if (config.admins.includes(interaction.user.id)) {
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
        } else {
            void await interaction.reply({
                content: "You do not have permission to use this command.",
                ephemeral: true
            })
        }
    },
} satisfies Command
