import { SlashCommandBuilder, type ChatInputCommandInteraction, type DiscordAPIError } from "discord.js"
import { type Command } from "../../types/Command"
import type CrystalClient from "../../types/CrystalClient"
import { getConfig } from "../config"

const config = getConfig()

module.exports = {
    name: "dm",
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Send a direct message to someone using the bot.")
        .addUserOption(option =>
            option.setName("user").setDescription("The user you want to message.").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("message").setDescription("If you want to send a message type it here.").setRequired(false)
        )
        .addStringOption(option =>
            option.setName("emojis").setDescription("The emoji(s) you want to react with.").setRequired(false)
        )
        .addAttachmentOption(option =>
            option.setName("attachment").setDescription("The attachment you want to send.").setRequired(false)
        )
        .addStringOption(option =>
            option.setName("message_id").setDescription("The message id you want to use.").setRequired(false)
        ),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient): Promise<void> {
        if (config.admins.includes(interaction.user.id)) {
            const user = interaction.options.getUser("user")
            const message = interaction.options.getString("message")
            const emojis = interaction.options.getString("emojis")
            const attachment = interaction.options.getAttachment("attachment")
            const messageId = interaction.options.getString("message_id")

            let reply = false

            if (message == null && emojis == null && attachment == null && messageId == null) {
                void (await interaction.reply({ content: "You need to provide at least one option!", ephemeral: true }))
                return
            }

            try {
                // If the message is not null
                if (message != null) {
                    // If messageId is not null then we're replying, otherwise we're just sending it
                    if (messageId != null) {
                        // If attachment is not null then we're replying with an attachment, otherwise just the message
                        if (attachment != null) {
                            const targetMessage = await user?.dmChannel?.messages.fetch(messageId)
                            if (targetMessage != null)
                                await targetMessage.reply({
                                    content: message,
                                    files: [attachment],
                                })
                            reply = true
                        } else {
                            const targetMessage = await user?.dmChannel?.messages.fetch(messageId)
                            if (targetMessage != null) await targetMessage.reply(message)
                            reply = true
                        }
                        // If messageId is null then we're just sending a message
                    } else {
                        // If attachment is null then we're sending an attachment, otherwise just the message
                        if (attachment != null) {
                            await user?.send({
                                content: message,
                                files: [attachment],
                            })
                            reply = true
                        } else {
                            await user?.send(message)
                            reply = true
                        }
                    }
                    // If there is no message to send then we *must* act on an existing one, so messageId *must* be provided in this case
                } else {
                    if (messageId != null) {
                        // If attachment isn't null
                        if (attachment != null) {
                            const targetMessage = await user?.dmChannel?.messages.fetch(messageId)

                            if (targetMessage != null)
                                await targetMessage.reply({
                                    files: [attachment],
                                })
                                reply = true
                            // If emojis isn't null
                        } else if (emojis != null) {
                            const targetMessage = await user?.dmChannel?.messages.fetch(messageId)
                            const emojiArray = emojis.split(" ")

                            for (const emoji of emojiArray) {
                                if (targetMessage != null) await targetMessage.react(emoji.trim())
                            }
                            reply = true
                            // If the *only* thing that was provided was a messageId, just pin it
                        } else {
                            const targetMessage = await user?.dmChannel?.messages.fetch(messageId)

                            if (targetMessage != null) await targetMessage.pin()
                            reply = true
                        }
                    } else {
                        if (attachment != null) {
                            await user?.send({
                                files: [attachment],
                            })
                            reply = true
                        }
                    }
                }
            } catch (error: any) {
                const errorTyped = error as DiscordAPIError
                if (errorTyped.message.includes("Unknown Message")) {
                    void (await interaction.reply({
                        content: "The command failed: Invalid message ID",
                        ephemeral: true,
                    }))
                } else if (errorTyped.message.includes("Unknown Emoji")) {
                    await interaction.reply({
                        content: "The reaction failed: Invalid emoji",
                        ephemeral: true,
                    })
                }
            }

            if (reply) {
                await interaction.reply({
                    content: "Successfully sent!",
                    ephemeral: true,
                })
            } else {
                await interaction.reply({
                    content: "Something went wrong, try again later!",
                    ephemeral: true,
                })
            }
        } else {
            void (await interaction.reply({
                content: "You do not have permission to use this command.",
                ephemeral: true,
            }))
        }
    },
} satisfies Command
