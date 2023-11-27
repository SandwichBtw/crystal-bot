import { type VoiceState, type VoiceBasedChannel } from "discord.js"
import { type Event } from "../../types/Event"
import { spawnPlayerConnection, disconnectPlayerConnection } from "../audio/audioPlayer"
import { percentages } from "../../constants/percentages"
import path from "node:path"
import fs from "node:fs"

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
            spawnPlayerConnection(channel, `${subDir}/${mp3File}`)
        }, 1000)

        function arrayRandomIndex<T>(array: T[]): T {
            const randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
        }

        const assetsDirPath = path.resolve(__dirname, '..', '..', 'assets');

        const subDirs = fs.readdirSync(assetsDirPath).filter(entry => {
            return fs.statSync(path.resolve(assetsDirPath, entry)).isDirectory();
        });
        const subDir = arrayRandomIndex(subDirs);
        const subDirPath = path.resolve(assetsDirPath, subDir);

        const mp3Files = fs.readdirSync(subDirPath).filter(file => file.endsWith('.mp3'));
        const mp3File = arrayRandomIndex(mp3Files)
    },
} satisfies Event
