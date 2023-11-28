import schedule from "node-schedule"
import type CrystalClient from "../../types/CrystalClient"
import { type TextChannel } from "discord.js"
import { getConfig } from "../config"
import { microwaveThings } from "../../constants/microwaveThings"

const config = getConfig()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function loadSchedules(client: CrystalClient): Promise<void> {
    // schedule.scheduleJob('26 8 * * 5', microwave)
    schedule.scheduleJob('30 18 * * 2', microwave)
    schedule.scheduleJob('34 13 * * 1,4,6', desksAndChairs)
    schedule.scheduleJob('12 5 * * 1,4,6', desksAndChairs)
    schedule.scheduleJob('56 16 * * 1,4,6', desksAndChairs)
    schedule.scheduleJob('0 12 */8 * *', polls)

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function microwave() {
        const channel = await client.channels.fetch(config.channelId) as TextChannel
        const values = Object.values(microwaveThings);
        const randomIndex = Math.floor(Math.random() * values.length);
        const randomItem = values[randomIndex];

        await channel.send(`Gosh darn it! I forgot my ${randomItem} in the microwave again!`)
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function desksAndChairs() {

    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function polls() {

    }
}
