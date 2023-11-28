export type Config = {
    token: string
    admins: string[]
    channelId: string
    shards: number
    postgresConfig: PostgresConfig
}

export type PostgresConfig = {
    host: string
    username: string
    password: string
    port: number
    database: string
}
