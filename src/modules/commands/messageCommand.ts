import { SlashCommandBuilder, type ChatInputCommandInteraction, TextChannel } from "discord.js";
import { type Command } from "../../types/Command";
import type CrystalClient from "../../types/CrystalClient";
import { channel } from "diagnostics_channel";

module.exports = {
    name: 'message',
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Send a message using the bot.")
        .addChannelOption((option) => 
            option
            .setName('channel')
            .setDescription('The channel to send the message to.')
            .setRequired(true))
        .addStringOption((option) => 
            option
            .setName('message')
            .setDescription('The message you want to send.')
            .setRequired(true)),
    execute: function (interaction: ChatInputCommandInteraction, client: CrystalClient) {
        const textChannel = interaction.options.getChannel('channel') as TextChannel
        const botMessage = interaction.options.getString('message')
        
        try {
            if (botMessage) {
                textChannel.send(botMessage)
                interaction.reply({
                    content: "Your message was sent.",
                    ephemeral: true
                })
            } else {
                interaction.reply({
                    content: "Your message could not get sent.",
                    ephemeral: true
                })
            }
        } catch (error) {
            console.error()
        }
    }
} satisfies Command