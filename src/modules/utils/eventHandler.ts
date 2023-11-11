import { RestEvents } from 'discord.js'
import { loadFiles } from './fileLoader'
import { Event } from '../../types/Event'
import CrystalClient from '../../types/CrystalClient';

export async function loadEvents(client: CrystalClient) {
    console.time("Events loaded");

    const events = new Array();

    const files = await loadFiles("modules/events");

    for (const file of files) {
        try {
            const event: Event = require(file);
            if (event.name == null) throw new Error("Invalid event file")

            const execute = (...args: any[]) => event.execute(...args);
            
            event.rest ? 
                client.rest[event.once ? "once": "on"](event.name as keyof RestEvents, execute) : 
                client[event.once ? "once": "on"](event.name, execute);

            client.events.set(event.name, execute);
            events.push({ Event: event.name, Status: "✅"})

        } catch (error) {
            events.push({Event: file.replace(/\\/g, "/").split("/").pop()?.slice(0, -3), Status: "🛑"})
        }
    }
    
    console.table(events, ["Event", "Status"])
    console.info("\n\x1b[36m%s\x1b[0m", "Loaded Events")
    console.timeEnd("Events loaded")
}