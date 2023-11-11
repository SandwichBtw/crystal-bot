import { type Command } from "../../types/Command";
import CrystalClient from "../../types/CrystalClient";
import { loadFiles } from "./fileLoader";

export async function loadCommands(client: CrystalClient): Promise<void> {
    console.time("Commands loaded");

    const commands = [];

    const files = await loadFiles("modules/commands");

    for (const file of files) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const command: Command = require(file);
            if (command.name == null) throw new Error("Invalid event file")

            const execute = (...args: any[]): void => { command.execute(...args); };

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