import { type Typing, type TextChannel } from "discord.js"
import { type Event } from "../../types/Event"
import { percentages } from "../../constants/percentages"

module.exports = {
    name: "typingStart",
    once: false,
    rest: false,
    execute: async function (typing: Typing) {
        // This seems to fire every 10 seconds or so because of how discord handles typing.
        // We need to give this a cool down of 1 min for every user so it doesn't keep firing while someone is typing.

        if (Math.floor(Math.random() * 100) <= percentages.TYPING_MESSAGE -1) {
            const typingChannel = typing.channel as TextChannel

            void await typingChannel.send({
                content: `<@${typing.user.id}> is typing too loudly.`
            })
        }
    },
} satisfies Event
