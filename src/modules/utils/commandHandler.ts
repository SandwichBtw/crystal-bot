import { type Command } from "../../types/Command"
import CrystalClient from "../../types/CrystalClient"
import { loadFiles } from "./fileLoader"

export async function loadCommands(client: CrystalClient): Promise<void> {
    console.time("Commands loaded")

    CrystalClient.commands.clear()

    const success = []
    const commands = []

    const files = await loadFiles("modules/commands")

    for (const file of files) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const command: Command = require(file)
            if (command.name == null) throw new Error("Invalid event file")

            CrystalClient.commands.set(command.name, command)
            success.push({ Command: command.name, Status: "✅" })
            commands.push(command.data.toJSON())
        } catch (error) {
            success.push({ Event: file.replace(/\\/g, "/").split("/").pop()?.slice(0, -3), Status: "🛑" })
        }
    }

    await client.application?.commands.set([])
    await client.application?.commands.set(commands)

    console.table(success, ["Command", "Status"])
    // \n - Newline
    // \x1b[36m - Cyan
    // %s - string placeholder for console.info (Gets replaced with "Loaded Commands")
    // \x1b[0m - reset
    // https://gist.github.com/abritinthebay/d80eb99b2726c83feb0d97eab95206c4
    console.info("\n\x1b[36m%s\x1b[0m", "Loaded Commands")
    console.timeEnd("Commands loaded")
}
