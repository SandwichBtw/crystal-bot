import { type SlashCommandBuilder } from "discord.js"

export type Command = {
    name: string,
    data: any,
    execute: (...args: any[]) => void
}