import { Client, ClientOptions, Collection } from "discord.js";
import { loadEvents } from "../modules/utils/eventHandler";

export default class CrystalClient extends Client {
    commands: Collection<unknown, any>
    events: Collection<unknown, any>
    
    constructor(options: ClientOptions) {
        super(options)

        this.commands = new Collection()
        this.events = new Collection()

        loadEvents(this)
    }
}