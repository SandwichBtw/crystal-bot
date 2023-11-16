import { SlashCommandBuilder, type ChatInputCommandInteraction, type TextChannel } from "discord.js"
import { type Command } from "../../types/Command"
import type CrystalClient from "../../types/CrystalClient"
import { getConfig } from "../config"

const config = getConfig()

module.exports = {
    name: "react",
    data: new SlashCommandBuilder()
        .setName("react")
        .setDescription("React to a message using the bot.")
        .addChannelOption(option =>
            option.setName("channel").setDescription("The channel you want to react to.").setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("message_id")
                .setDescription("The message you want to react to using a message id.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("emojis").setDescription("The emoji(s) you want to react with.").setRequired(true)
        ),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        if (config.admins.includes(interaction.user.id)) {
            const textChannel = interaction.options.getChannel("channel") as TextChannel
            const messageId = interaction.options.getString("message_id")
            const emojis = interaction.options.getString("emojis")

            try {
                if (emojis !== null && messageId !== null) {
                    const targetMessage = await textChannel.messages.fetch(messageId)
                    const emojiArray = emojis.split(" ")

                    for (const emoji of emojiArray) {
                        void (await targetMessage.react(emoji.trim()))
                    }

                    void (await interaction.reply({
                        content: "The reaction was successful.",
                        ephemeral: true,
                    }))
                } else {
                    void (await interaction.reply({
                        content: "The reaction failed.",
                        ephemeral: true,
                    }))
                }
            } catch (error: any) {
                switch (true) {
                    case error.message.includes("Unknown Message"):
                        void (await interaction.reply({
                            content: "The reaction failed: Invalid message id.",
                            ephemeral: true,
                        }))
                        break
                    case error.message.includes("Unknown Emoji"):
                        void (await interaction.reply({
                            content: "The reaction failed: Invalid emoji(s).",
                            ephemeral: true,
                        }))
                        break
                    default:
                        void (await interaction.reply({
                            content: "The reaction failed.",
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
