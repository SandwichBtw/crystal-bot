import { type Message } from "discord.js"
import { type Event } from "../../types/Event"
import { percentages } from "../../constants/percentages"

module.exports = {
    name: "messageCreate",
    once: false,
    rest: false,
    execute: async function (message: Message) {
        if (message.author.bot) {
            return
        }
        // Math.floor(Math.random() * 100) generates a random number between 0 and 99, not 1 and 100.
        // Meaning that you must subtract 1 from your percentage to get the correct number. Placing a 5 there would result in the check being 6%, so 4 is 5%
        if (Math.floor(Math.random() * 100) <= percentages.RATE_MESSAGE - 1)
            void message.reply({
                content: `I rate this message a ${Math.floor(Math.random() * 10) + 1} out of 10`,
            })
    },
} satisfies Event
