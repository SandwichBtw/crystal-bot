import { type RestEvents } from "discord.js"

export type Event = {
    name: keyof RestEvents | string,
    once: boolean,
    rest: boolean,
    execute: (...args: any[]) => void
}