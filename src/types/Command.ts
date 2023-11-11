import { type SlashCommandBuilder } from "discord.js"

export type Command = {
    name: string,
    data: SlashCommandBuilder,
    execute: (...args: any[]) => void
}