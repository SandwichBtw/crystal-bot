import { Command } from "../../types/Command";
import CrystalClient from "../../types/CrystalClient";
import { loadFiles } from "./fileLoader";

export async function loadCommands(client: CrystalClient) {
    console.time("Commands loaded");

    const commands = new Array();

    const files = await loadFiles("modules/commands");

    for (const file of files) {
        try {
            const command: Command = require(file);
            if (command.name == null) throw new Error("Invalid event file")

            const execute = (...args: any[]) => command.execute(...args);

            CrystalClient.commands.set(command.name, execute);
            commands.push({ Command: command.name, Status: "✅"})

        } catch (error) {
            commands.push({Event: file.replace(/\\/g, "/").split("/").pop()?.slice(0, -3), Status: "🛑"})
        }
    }
    console.table(commands, ["Command", "Status"])
    console.info("\n\x1b[36m%s\x1b[0m", "Loaded Commands")
    console.timeEnd("Commands loaded")
}