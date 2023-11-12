import { SlashCommandBuilder, type ChatInputCommandInteraction } from "discord.js";
import { type Command } from "../../types/Command";
import type CrystalClient from "../../types/CrystalClient";

module.exports = {
    name: 'message',
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Send a message using the bot.")
        .addChannelOption((option) => 
            option.setName('channel')
            .setDescription('The channel to send the message to.')
            .setRequired(true))
        .addStringOption((option) => 
            option.setName('message')
            .setDescription('The message you want to send.')
            .setRequired(true)),
    execute: async function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        
    }
} satisfies Command