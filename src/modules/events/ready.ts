import { type Event } from "../../types/Event"
import { loadCommands } from "../utils/commandHandler"
import { getChannels } from "../utils/channelRegistrar"
import CrystalClient from "../../types/CrystalClient"
import { loadSchedules } from "../utils/messageScheduler"

module.exports = {
    name: "ready",
    once: false,
    rest: false,
    execute: async function (client: CrystalClient): Promise<void> {
        await loadCommands(client)
        await getChannels(client)
        await loadSchedules(CrystalClient.getClient())

        console.log(`Logged in as ${client.user?.tag}`)
    },
} satisfies Event
