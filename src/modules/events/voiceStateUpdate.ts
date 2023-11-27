import { type VoiceState, type VoiceBasedChannel } from "discord.js"
import { type Event } from "../../types/Event"
import { spawnPlayerConnection, disconnectPlayerConnection } from "../audio/audioPlayer"
import { percentages } from "../../constants/percentages"

module.exports = {
    name: "voiceStateUpdate",
    once: false,
    rest: false,
    execute: async function (oldState: VoiceState, newState: VoiceState) {
        if ((newState.member?.user.bot) === true) return
        if (newState.channel == null ) {
            const channel = oldState.channel

            setTimeout(() => {
                disconnectPlayerConnection(channel as VoiceBasedChannel)
            }, 500)
            return
        }

        if (Math.floor(Math.random() * 100) <= percentages.VC_DISCONNECT - 1) {
            void newState.disconnect()
            return
        }

        const channel = newState.channel

        setTimeout(() => {
            spawnPlayerConnection(channel, "raps/desks and chairs - Crystal Bot (ft. Wulfie).mp3")
        }, 1000)
    },
} satisfies Event
