import { SlashCommandBuilder, type ChatInputCommandInteraction, type VoiceBasedChannel, ChannelType } from "discord.js"
import { type Command } from "../../types/Command"
import { spawnPlayerConnection } from "../audio/audioPlayer"

module.exports = {
    name: "join",
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Make the bot join a vc.")
        .addChannelOption((option) => option
            .setName('channel')
            .setDescription('The channel you want it to join.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)),
    execute: async function (interaction: ChatInputCommandInteraction) {
        try {
            const channel = interaction.options.getChannel('channel')

            spawnPlayerConnection(channel as VoiceBasedChannel, "../../../assets/fortnite.ogg")

            void (await interaction.reply({
                content: "Successfully joined the channel.",
                ephemeral: true,
            }))
        } catch (error) {
            void (await interaction.reply({
                content: "Unsuccessfully joined the channel.",
                ephemeral: true,
            }))

            console.error(error)
        }
    },
} satisfies Command
