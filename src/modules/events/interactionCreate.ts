import { type ChatInputCommandInteraction } from "discord.js"
import { type Event } from "../../types/Event"
import CrystalClient from "../../types/CrystalClient"

module.exports = {
    name: "interactionCreate",
    once: false,
    rest: false,
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        if (!interaction.isChatInputCommand()) return
        const command = CrystalClient.commands.get(interaction.commandName)
        if (command === null || command === undefined)
            await interaction.reply({ content: "This command does not exist", ephemeral: true })
        command?.execute(interaction, client)
    },
} satisfies Event
