import { SlashCommandBuilder, type ChatInputCommandInteraction, type TextChannel } from "discord.js";
import { type Command } from "../../types/Command";
import type CrystalClient from "../../types/CrystalClient";

module.exports = {
    name: 'react',
    data: new SlashCommandBuilder()
        .setName("react")
        .setDescription("React to a message using the bot.")
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('The channel you want to react to.')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('message_id')
                .setDescription('The message you want to react to using a message id.')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('emoji')
                .setDescription('The emoji you want to react with.')
                .setRequired(true)),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        const textChannel = interaction.options.getChannel('channel') as TextChannel
        const messageId = interaction.options.getString('message_id')
        const reactEmoji = interaction.options.getString('emoji')

        try {
            if ((reactEmoji !== null) && (messageId !== null)) {
                const targetMessage = await textChannel.messages.fetch(messageId);

                void await targetMessage.react(reactEmoji)
                void await interaction.reply({
                    content: "The reaction was successful.",
                    ephemeral: true
                })
            } else {
                void await interaction.reply({
                    content: "The reaction failed.",
                    ephemeral: true
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
} satisfies Command
