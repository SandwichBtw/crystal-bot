import { Client } from "discord.js";
import { Event } from "../../types/Event"

module.exports = {
    name: "ready",
    once: false,
    rest: false,
    execute: function (client: Client<true>): void {
        console.log(`Logged in as ${client.user.tag}`)
    }
} as Event