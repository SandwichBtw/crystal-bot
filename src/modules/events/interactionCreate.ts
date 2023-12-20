import { type TextChannel, type Interaction } from "discord.js"
import { type Event } from "../../types/Event"
import CrystalClient from "../../types/CrystalClient"

module.exports = {
    name: "interactionCreate",
    once: false,
    rest: false,
    execute: async function (interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            const command = CrystalClient.commands.get(interaction.commandName)
            if (command === null || command === undefined)
                await interaction.reply({ content: "This command does not exist", ephemeral: true })
            void command?.execute(interaction, CrystalClient.getClient())
        }

        if (interaction.isButton()) {
            const channel = interaction.channel as TextChannel
            const user = interaction.user

            console.log(`${user.displayName} clicked a button in ${channel.name}`)
        }
    },
} satisfies Event
