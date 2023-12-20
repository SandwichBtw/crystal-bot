import schedule from "node-schedule"
import type CrystalClient from "../../types/CrystalClient"
import { type TextChannel, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js"
import { getConfig } from "../config"
import { microwaveThings } from "../../constants/microwaveThings"
import { desksAndChairsFacts } from "../../constants/desksAndChairsFacts"
import { pollOptions } from "../../constants/pollOptions"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function loadSchedules(client: CrystalClient): Promise<void> {
    const config = getConfig()
    const usedMicrowaveItems: string[] = []
    const usedDeskFacts: string[] = []
    const usedPollOptions: string[] = []

    function randomItemFromArray(list: string[]): string {
        return list[Math.floor(Math.random() * list.length)]
    }

    async function microwave(): Promise<void> {
        let found: boolean = false
        let randomItem: string = ""

        if (usedMicrowaveItems.length / microwaveThings.length >= 0.6) {
            // This allows us to clear the array while still leaving it a const
            usedMicrowaveItems.length = 0
        }

        while (!found) {
            randomItem = randomItemFromArray(microwaveThings)
            if (!usedMicrowaveItems.includes(randomItem)) {
                usedMicrowaveItems.push(randomItem)
                found = true
            }
        }

        const channel = (await client.channels.fetch(config.channelId)) as TextChannel
        await channel.send(`Gosh darn it! I forgot my ${randomItem} in the microwave again!`)
    }

    async function desksAndChairs(): Promise<void> {
        let found: boolean = false
        let randomItem: string = ""

        if (usedDeskFacts.length / microwaveThings.length >= 0.6) {
            // This allows us to clear the array while still leaving it a const
            usedDeskFacts.length = 0
        }

        while (!found) {
            randomItem = randomItemFromArray(desksAndChairsFacts)
            if (!usedDeskFacts.includes(randomItem)) {
                usedDeskFacts.push(randomItem)
                found = true
            }
        }

        const channel = (await client.channels.fetch(config.channelId)) as TextChannel
        await channel.send(randomItem)
    }

    async function polls(): Promise<void> {
        let found: boolean = false
        let randomItem1: string = ""
        let randomItem2: string = ""

        if (usedPollOptions.length / pollOptions.length >= 0.6) {
            // This allows us to clear the array while still leaving it a const
            usedPollOptions.length = 0
        }

        while (!found) {
            randomItem1 = randomItemFromArray(pollOptions)
            randomItem2 = randomItemFromArray(pollOptions)
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!usedMicrowaveItems.includes(randomItem1 || randomItem2)) {
                usedMicrowaveItems.push(randomItem1, randomItem2)
                found = true
            }
        }

        const channel = (await client.channels.fetch(config.channelId)) as TextChannel

        const opt1 = new ButtonBuilder()
            .setCustomId('1')
            .setLabel(randomItem1)
            .setStyle(ButtonStyle.Secondary);

        const opt2 = new ButtonBuilder()
            .setCustomId('2')
            .setLabel(randomItem2)
            .setStyle(ButtonStyle.Secondary);

        const row: any = new ActionRowBuilder()
            .addComponents(opt1, opt2);

        await channel.send({
            content: `What's better, ${randomItem1} or ${randomItem2}?`,
            components: [row],
        })
    }

    schedule.scheduleJob("26 8 * * 5", microwave)
    schedule.scheduleJob("34 13 * * 1,4,6", desksAndChairs)
    schedule.scheduleJob("12 5 * * 1,4,6", desksAndChairs)
    schedule.scheduleJob("56 16 * * 1,4,6", desksAndChairs)
    schedule.scheduleJob("0 0 */8 * *", polls)
}
