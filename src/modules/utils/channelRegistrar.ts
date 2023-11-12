import { type ChannelType } from "discord.js"
import CrystalClient from "../../types/CrystalClient"

export async function getChannels(client: CrystalClient): Promise<void> {
    console.time("Channels registered")
    const channels: Array<{
        Channel: string
        ChannelId: string
        Type:
            | ChannelType.GuildText
            | ChannelType.GuildVoice
            | ChannelType.GuildCategory
            | ChannelType.GuildAnnouncement
            | ChannelType.AnnouncementThread
            | ChannelType.PublicThread
            | ChannelType.PrivateThread
            | ChannelType.GuildStageVoice
            | ChannelType.GuildForum
        Guild: string
        GuildId: string
    }> = []

    CrystalClient.guilds = client.guilds.cache.map(guild => guild.id)
    for (const guildId of CrystalClient.guilds) {
        const guild = client.guilds.cache.get(guildId)
        guild?.channels.cache.forEach(channel => {
            CrystalClient.channels.push(channel)
            channels.push({
                Channel: channel.name,
                ChannelId: channel.id,
                Type: channel.type,
                Guild: channel.guild.name,
                GuildId: channel.guildId,
            })
        })
    }

    console.table(channels, [
        "Channel",
        "ChannelId",
        "Type",
        "Guild",
        "GuildId",
    ])
    console.info("\n\x1b[36m%s\x1b[0m", "Registered Channels")

    console.timeEnd("Channels registered");
}
