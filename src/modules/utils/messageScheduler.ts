import schedule from "node-schedule"
import type CrystalClient from "../../types/CrystalClient"
import { type TextChannel } from "discord.js"
import { getConfig } from "../config"

const config = getConfig()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function loadSchedules(client: CrystalClient): Promise<void> {
    schedule.scheduleJob('*/1 * * * *', testMessage)

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function testMessage() {
        const channel = await client.channels.fetch(config.channelId) as TextChannel
        await channel.send("This runs every 1 minute.")
    }
}
