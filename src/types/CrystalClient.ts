import { Client, type ClientOptions, Collection, type GuildBasedChannel } from "discord.js"
import { loadEvents } from "../modules/utils/eventHandler"
import { type Command } from "./Command"

export default class CrystalClient extends Client {
    static commands: Collection<string, Command>
    static events: Collection<string, (...args: any[]) => void>
    static guilds: string[]
    static channels: GuildBasedChannel[] = []

    constructor(options: ClientOptions) {
        super(options)

        CrystalClient.commands = new Collection()
        CrystalClient.events = new Collection()

        void loadEvents(this)
    }
}
