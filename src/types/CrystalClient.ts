import { Client, type ClientOptions, Collection } from "discord.js";
import { loadEvents } from "../modules/utils/eventHandler";
import { type Command } from "./Command";

export default class CrystalClient extends Client {
    static commands: Collection<string, Command>
    static events: Collection<string, (...args: any[]) => void>
    
    constructor(options: ClientOptions) {
        super(options)

        CrystalClient.commands = new Collection()
        CrystalClient.events = new Collection()

        void loadEvents(this);
    }
}