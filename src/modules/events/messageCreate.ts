import { type Message } from "discord.js"
import { type Event } from "../../types/Event"
import { percentages } from "../../constants/percentages"
import { randomReplies } from "../../constants/randomReplies"

module.exports = {
    name: "messageCreate",
    once: false,
    rest: false,
    execute: async function (message: Message) {
        if (message.author.bot) {
            return
        }

        if (message.content.toLowerCase().includes('youtube')) {
            void (await message.reply(
                'THANKS FOR WATCHING MY VIDEO!!!!! IF YOU ENJOYED IT, MAKE SURE TO SLAM THAT SUBSCRIBE BUTTON INTO A WALL AND PUNCH THAT LIKE BUTTON 34615 TIMES!!!!!!!!!!!!'
                ))
            return
        }

        // Math.floor(Math.random() * 100) generates a random number between 0 and 99, not 1 and 100.
        // Meaning that you must subtract 1 from your percentage to get the correct number. Placing a 5 there would result in the check being 6%, so 4 is 5%
        if (Math.floor(Math.random() * 100) <= percentages.RATE_MESSAGE - 1) {
            void await message.reply({
                content: `I rate this message a ${Math.floor(Math.random() * 10) + 1} out of 10`,
            })
        }

        if (Math.floor(Math.random() * 100) <= percentages.RANDOM_REPLIES - 1) {
            const values = Object.values(randomReplies);
            const randomIndex = Math.floor(Math.random() * values.length);
            const randomText = values[randomIndex];

            void await message.reply({
                content: randomText
            })
        }
    },
} satisfies Event
