import { SlashCommandBuilder, type ChatInputCommandInteraction, type Attachment, type DiscordAPIError } from "discord.js"
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
            const user = interaction.options.getUser('user')
            const message = interaction.options.getString('message')
            const emojis = interaction.options.getString('emojis')
            const attachment = interaction.options.getAttachment('attachment')
            const messageId = interaction.options.getString('message_id')

            switch (true) {
                case  user !== null && message === null && emojis === null && attachment === null && messageId === null:
                    void await interaction.reply({
                        content: "You need to select an action to perform.",
                        ephemeral: true
                    })
                    break
                case user != null && message != null && emojis == null && attachment == null && messageId == null:
                    try {
                        void await user?.send(message as string)
                        void await interaction.reply({
                            content: "Your message was sent.",
                            ephemeral: true
                        })
                    } catch (error) {
                        void await interaction.reply({
                            content: "Your message could not get sent.",
                            ephemeral: true
                        })

                        console.log(error)
                    }
                    break
                case user != null && message != null && emojis == null && attachment != null && messageId == null:
                    try {
                        void await user?.send({
                            content: message as string,
                            files: [attachment as Attachment]
                        })
                        void await interaction.reply({
                            content: "Your message was sent.",
                            ephemeral: true
                        })
                    } catch (error) {
                        void await interaction.reply({
                            content: "Your message could not get sent.",
                            ephemeral: true
                        })

                        console.error(error)
                    }
                    break
                case user != null && message != null && emojis == null && attachment == null && messageId != null:
                    try {
                        const targetMessage = await user?.dmChannel?.messages.fetch(messageId as string)

                        if (targetMessage != null) {
                            void (await targetMessage.reply(message as string))
                            void (await interaction.reply({
                                content: "Your message was sent.",
                                ephemeral: true,
                            }))
                        } else {
                            void await interaction.reply({
                                content: "Your message could not get sent.",
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        void await interaction.reply({
                            content: "Your message could not get sent.",
                            ephemeral: true
                        })

                        console.log(error)
                    }
                    break
                case user != null && message != null && emojis == null && attachment != null && messageId != null:
                    try {
                        const targetMessage = await user?.dmChannel?.messages.fetch(messageId as string)

                        if (targetMessage != null) {
                            void (await targetMessage.reply({
                                content: message as string,
                                files: [attachment as Attachment]
                            }))
                            void (await interaction.reply({
                                content: "Your message was sent.",
                                ephemeral: true,
                            }))
                        } else {
                            void await interaction.reply({
                                content: "Your message could not get sent.",
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        void await interaction.reply({
                            content: "Your message could not get sent.",
                            ephemeral: true
                        })

                        console.log(error)
                    }
                    break
                case user != null && message == null && emojis == null && attachment != null && messageId == null:
                    try {
                        void await user?.send({
                            files: [attachment as Attachment]
                        })
                        void await interaction.reply({
                            content: "Your message was sent.",
                            ephemeral: true
                        })
                    } catch (error) {
                        void await interaction.reply({
                            content: "Your message could not get sent.",
                            ephemeral: true
                        })

                        console.error(error)
                    }
                    break
                case user != null && message == null && emojis == null && attachment != null && messageId != null:
                    try {
                        const targetMessage = await user?.dmChannel?.messages.fetch(messageId as string)

                        if (targetMessage != null) {
                            void (await targetMessage.reply({
                                files: [attachment as Attachment]
                            }))
                            void (await interaction.reply({
                                content: "Your message was sent.",
                                ephemeral: true,
                            }))
                        } else {
                            void await interaction.reply({
                                content: "Your message could not get sent.",
                                ephemeral: true
                            })
                        }
                    } catch (error) {
                        void await interaction.reply({
                            content: "Your message could not get sent.",
                            ephemeral: true
                        })

                        console.log(error)
                    }
                    break
                case user != null && message == null && emojis != null && attachment == null && messageId != null:
                    try {
                        if (emojis !== null && messageId !== null) {
                            const targetMessage = await user?.dmChannel?.messages.fetch(messageId)
                            const emojiArray = emojis.split(" ")

                            for (const emoji of emojiArray) {
                                if (targetMessage != null) void (await targetMessage.react(emoji.trim()))
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
                        const errorTyped = error as DiscordAPIError
                        switch (true) {
                            case errorTyped.message.includes("Unknown Message"):
                                void (await interaction.reply({
                                    content: "The reaction failed: Invalid message id.",
                                    ephemeral: true,
                                }))
                                break
                            case errorTyped.message.includes("Unknown Emoji"):
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
                    break
                case user != null && message == null && emojis == null && attachment == null && messageId != null:
                    try {
                        const targetMessage = await user?.dmChannel?.messages.fetch(messageId as string)

                        if (targetMessage != null) void (await targetMessage.pin())
                        void (await interaction.reply({
                            content: "Successfully pinned the message.",
                            ephemeral: true,
                        }))
                    } catch (error: any) {
                        const errorTyped = error as DiscordAPIError
                        if (errorTyped.message.includes("Unknown Message")) {
                            void (await interaction.reply({
                                content: "Unsuccessfully pinned the message: Invalid message id.",
                                ephemeral: true,
                            }))
                        } else {
                            void (await interaction.reply({
                                content: "Unsuccessfully pinned the message.",
                                ephemeral: true,
                            }))

                            console.error(JSON.stringify(errorTyped))
                        }
                    }
                    break
                default:
                    void await interaction.reply({
                        content: "You need to select a valid action to perform.",
                        ephemeral: true
                    })
            }
        } else {
            void await interaction.reply({
                content: "You do not have permission to use this command.",
                ephemeral: true
            })
        }
    },
} satisfies Command
