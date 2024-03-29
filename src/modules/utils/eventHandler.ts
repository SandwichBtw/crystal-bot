import { type RestEvents } from "discord.js"
import { loadFiles } from "./fileLoader"
import { type Event } from "../../types/Event"
import CrystalClient from "../../types/CrystalClient"

export async function loadEvents(client: CrystalClient): Promise<void> {
    console.time("Events loaded")

    const events = []
    CrystalClient.events.clear()

    const files = await loadFiles("modules/events")

    for (const file of files) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const event: Event = require(file)
            if (event.name == null) throw new Error("Invalid event file")

            const execute = (...args: any[]): void => {
                void event.execute(...args)
            }

            event.rest
                ? client.rest[event.once ? "once" : "on"](event.name as keyof RestEvents, execute)
                : client[event.once ? "once" : "on"](event.name, execute)

            CrystalClient.events.set(event.name, execute)
            events.push({ Event: event.name, Status: "✅" })
        } catch (error) {
            console.error(error)
            events.push({ Event: file.replace(/\\/g, "/").split("/").pop()?.slice(0, -3), Status: "🛑" })
        }
    }

    console.table(events, ["Event", "Status"])
    // \n - Newline
    // \x1b[36m - Cyan
    // %s - string placeholder for console.info (Gets replaced with "Loaded Events")
    // \x1b[0m - reset
    // https://gist.github.com/abritinthebay/d80eb99b2726c83feb0d97eab95206c4
    console.info("\n\x1b[36m%s\x1b[0m", "Loaded Events")
    console.timeEnd("Events loaded")
}
