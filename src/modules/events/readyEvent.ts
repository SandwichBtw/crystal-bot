import { type Client } from "discord.js";
import { type Event } from "../../types/Event"

module.exports = {
    name: "ready",
    once: false,
    rest: false,
    execute: function (client: Client<true>): void {
        console.log(`Logged in as ${client.user.tag}`)
    }
} satisfies Event