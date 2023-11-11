import { Client, ClientOptions, Collection } from "discord.js";
import { loadEvents } from "../modules/utils/eventHandler";
import { loadCommands } from "../modules/utils/commandHandler";

export default class CrystalClient extends Client {
    static commands: Collection<string, (...args: any[]) => void>
    static events: Collection<string, (...args: any[]) => void>
    
    constructor(options: ClientOptions) {
        super(options)

        CrystalClient.commands = new Collection()
        CrystalClient.events = new Collection()

        loadCommands(this);
        loadEvents(this);
    }
}