import { Client } from "discord.js";
import { Event } from "../../types/Event"
module.exports = {
    name: "ready",
    once: false,
    rest: false,
    // There are a ton of different types of events, and each event sends a different set of args.
    // See discord.js/types/index.d.ts line 4823 for all the types related to ClientEvents. The 'ready' event is of type [client: Client<true>]
    execute: function (...args: [client: Client<true>]): void {
        // To access the client object, reference args[0] like this
        // const client: Client = args[0];
        console.log("The event has been loaded!")
    }
} as Event