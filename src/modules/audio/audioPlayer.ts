import { createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel } from "@discordjs/voice"
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

    // This string must be an audio file, either mp3 or ogg. FFmpeg will kick in if A) it's installed and B) a file type isn't defined.
    // In other words, if we know the type we should define it, otherwise we'll have an extremely extremely extremely minor performance loss
    const resource = createAudioResource(path.join(process.cwd(), "../assets", file))

    setTimeout(() => {
        player.play(resource)
    }, 1000)

    player.addListener("stateChange", (oldOne, newOne) => {
        if (newOne.status === "idle") {
            connection.destroy()
        }
    });

}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function disconnectPlayerConnection(channel: VoiceBasedChannel) {
    const connection = getVoiceConnection(channel.guild.id);
    connection?.destroy()
}
