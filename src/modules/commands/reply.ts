import { SlashCommandBuilder, type ChatInputCommandInteraction, type TextChannel } from "discord.js"
import { type Command } from "../../types/Command"
import type CrystalClient from "../../types/CrystalClient"
import { getConfig } from "../config"

const config = getConfig()

module.exports = {
    name: "reply",
    data: new SlashCommandBuilder()
        .setName("reply")
        .setDescription("Reply to a message using the bot.")
        .addChannelOption(option =>
            option.setName("channel").setDescription("The channel to send the reply to.").setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("message_id")
                .setDescription("The message you want to reply to using a message id.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("message").setDescription("The message you want to send.").setRequired(true)
        ),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        if (config.admins.includes(interaction.user.id)) {
            const textChannel = interaction.options.getChannel("channel") as TextChannel
            const messageId = interaction.options.getString("message_id")
            const botMessage = interaction.options.getString("message")

            try {
                if (botMessage !== null && messageId !== null) {
                    const targetMessage = await textChannel.messages.fetch(messageId)

                    void (await targetMessage.reply(botMessage))
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
        } else {
            void await interaction.reply({
                content: "You do not have permission to use this command.",
                ephemeral: true
            })
        }
    },
} satisfies Command
