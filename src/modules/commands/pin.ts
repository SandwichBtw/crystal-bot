import { SlashCommandBuilder, type ChatInputCommandInteraction, type TextChannel } from "discord.js"
import { type Command } from "../../types/Command"
import type CrystalClient from "../../types/CrystalClient"
import { getConfig } from "../config"

const config = getConfig()

module.exports = {
    name: "pin",
    data: new SlashCommandBuilder()
        .setName("pin")
        .setDescription("pin a message using the bot.")
        .addChannelOption(option =>
            option.setName("channel").setDescription("The channel you want to pin a message in.").setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("message_id")
                .setDescription("The message you want to pin to using a message id.")
                .setRequired(true)
        ),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        if (config.admins.includes(interaction.user.id)) {
            const textChannel = interaction.options.getChannel("channel") as TextChannel
            const messageId = interaction.options.getString("message_id")

            try {
                if (messageId !== null) {
                    const targetMessage = await textChannel.messages.fetch(messageId)

                    void (await targetMessage.pin())
                    void (await interaction.reply({
                        content: "Successfully pinned the message.",
                        ephemeral: true,
                    }))
                } else {
                    void (await interaction.reply({
                        content: "Unsuccessfully pinned the message.",
                        ephemeral: true,
                    }))
                }
            } catch (error: any) {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (error.message.includes("Unknown Message")) {
                    void (await interaction.reply({
                        content: "Unsuccessfully pinned the message: Invalid message id.",
                        ephemeral: true,
                    }))
                } else {
                    void (await interaction.reply({
                        content: "Unsuccessfully pinned the message.",
                        ephemeral: true,
                    }))

                    console.error(error)
                }
            }
        } else {
            void await interaction.reply({
                content: "You do not have permission to use this command.",
                ephemeral: true
            })
        }
    },
} satisfies Command
