import { type Client } from "discord.js";
import { type Event } from "../../types/Event"
import { loadCommands } from "../utils/commandHandler";
import { getChannels } from "../utils/channelRegistrar";

module.exports = {
    name: "ready",
    once: false,
    rest: false,
    execute: async function (client: Client<true>): Promise<void> {
        await loadCommands(client);
        await getChannels(client);

        console.log(`Logged in as ${client.user.tag}`)
    }
} satisfies Event