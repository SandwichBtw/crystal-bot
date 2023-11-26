import { type Typing, type TextChannel } from "discord.js"
import { type Event } from "../../types/Event"

module.exports = {
    name: "typingStart",
    once: false,
    rest: false,
    execute: async function (typing: Typing) {
        const typingChannel = typing.channel as TextChannel

        void await typingChannel.send({
            content: `${typing.user.displayName} is typing too loudly.`
        })
    },
} satisfies Event
