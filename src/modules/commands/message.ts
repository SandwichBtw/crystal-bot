import { SlashCommandBuilder, type ChatInputCommandInteraction, type TextChannel } from "discord.js"
import { type Command } from "../../types/Command"
import type CrystalClient from "../../types/CrystalClient"

module.exports = {
    name: "message",
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Send a message using the bot.")
        .addChannelOption(option =>
            option.setName("channel").setDescription("The channel to send the message to.").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("message").setDescription("The message you want to send.").setRequired(true)
        ),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        const textChannel = interaction.options.getChannel("channel") as TextChannel
        const botMessage = interaction.options.getString("message")

        try {
            if (botMessage !== null) {
                void (await textChannel.send(botMessage))
                void (await interaction.reply({
                    content: "Your message was sent.",
                    ephemeral: true,
                }))
            } else {
                void (await interaction.reply({
                    content: "Your message could not get sent.",
                    ephemeral: true,
                }))
            }
        } catch (error) {
            console.error(error)
        }
    },
} satisfies Command
