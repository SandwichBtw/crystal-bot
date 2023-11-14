import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { type Command } from "../../types/Command";
import type CrystalClient from "../../types/CrystalClient";

module.exports = {
    name: 'dm',
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Send a direct message to someone using the bot.")
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('The user you want to message.')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('message')
                .setDescription("If you want to send a message type it here.")
                .setRequired(false))
        .addStringOption((option) =>
            option
                .setName('emojis')
                .setDescription('The emoji(s) you want to react with.')
                .setRequired(false))
        .addAttachmentOption((option) =>
            option
                .setName('attachment')
                .setDescription('The attachment you want to send.')
                .setRequired(false))
        .addStringOption((option) =>
            option
                .setName('message_id')
                .setDescription('The message id you want to use.')
                .setRequired(false)),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient): Promise<void> {

    }
} satisfies Command
