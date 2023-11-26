import { type VoiceState, type VoiceBasedChannel } from "discord.js"
import { type Event } from "../../types/Event"
import { spawnPlayerConnection } from "../audio/audioPlayer"

module.exports = {
    name: "voiceStateUpdate",
    once: false,
    rest: false,
    execute: async function (oldState: VoiceState, newState: VoiceState) {
        if (newState.member == null) {
            console.log("member is null.")
            return
        }
        if (newState.member.user.bot) {
            console.log("user.bot is true.")
            return
        }

        spawnPlayerConnection(newState.channel as VoiceBasedChannel, "fortnite.mp3")
    },
} satisfies Event
