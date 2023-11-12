export type Command = {
    name: string
    data: any
    execute: (...args: any[]) => void | Promise<void>
}
