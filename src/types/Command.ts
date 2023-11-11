export type Command = {
    name: string,
    execute: (...args: any[]) => void
}