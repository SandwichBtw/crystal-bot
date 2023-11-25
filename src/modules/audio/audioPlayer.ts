import { createAudioPlayer, createAudioResource, generateDependencyReport, joinVoiceChannel } from "@discordjs/voice"
import { type VoiceBasedChannel } from "discord.js"
import path from "node:path"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function spawnPlayerConnection(channel: VoiceBasedChannel, file: string): any {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })

    const player = createAudioPlayer()
    connection.subscribe(player)
    console.log(generateDependencyReport())

    // This string must be an audio file, either mp3 or ogg. FFmpeg will kick in if A) it's installed and B) a file type isn't defined.
    // In other words, if we know the type we should define it, otherwise we'll have an extremely extremely extremely minor performance loss
    const resource = createAudioResource(path.join(process.cwd(), "../assets", file))
    player.play(resource)
}
