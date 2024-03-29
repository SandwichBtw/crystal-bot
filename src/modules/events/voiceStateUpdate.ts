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

        const oldChannelID = oldState.channelId;
        const newChannelID = newState.channelId;

        const switchedChannel = (oldChannelID != null) && (newChannelID != null) && oldChannelID !== newChannelID;
        const joinedChannel = (oldChannelID == null) && newChannelID;
        const leftChannel = (oldChannelID != null) && (newChannelID == null);

        if (switchedChannel) {
            console.log(`${newState.member?.displayName} switched from ${oldState.channel?.name} to ${newState.channel?.name}`)
            if (randomDisconnect()) return;
            userJoin(newState.channel as VoiceBasedChannel)
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        } else if (joinedChannel) {
            console.log(`${newState.member?.displayName} has joined ${newState.channel?.name}`)
            if (randomDisconnect()) return;
            userJoin(newState.channel as VoiceBasedChannel)
        } else if (leftChannel) {
            console.log(`${oldState.member?.displayName} has left ${oldState.channel?.name}`)
            userDisconnect()
        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function randomDisconnect() {
            if (Math.floor(Math.random() * 100) <= percentages.VC_DISCONNECT - 1) {
                void newState.disconnect()
                return true;
            }
        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function userDisconnect() {
            setTimeout(() => {
                disconnectPlayerConnection(oldState.channel as VoiceBasedChannel)
            }, 500)
        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function userJoin(channel: VoiceBasedChannel) {
            setTimeout(() => {
                spawnPlayerConnection(channel, audioPath)
            }, 1000)

            function arrayRandomIndex<T>(array: T[]): T {
                const randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }

            const vcDirectory = path.resolve(__dirname, '..', '..', 'assets', 'vc');

            const subDirectories = fs.readdirSync(vcDirectory).filter(entry => {
                return fs.statSync(path.resolve(vcDirectory, entry)).isDirectory();
            });
            const subDirectory = arrayRandomIndex(subDirectories);
            const subDirectoryPath = path.resolve(vcDirectory, subDirectory);

            const mp3Files = fs.readdirSync(subDirectoryPath).filter(file => file.endsWith('.mp3'));
            const mp3File = arrayRandomIndex(mp3Files)
            const audioPath = `${subDirectory}/${mp3File}`

            if (audioPath.toString() === "calls/spotify premium subscription.mp3") {
                channel.members.forEach(m => {
                    m.voice.setMute(true).catch(error => {
                        console.error(error)
                    })
                })
            }
        }
    },
} satisfies Event
