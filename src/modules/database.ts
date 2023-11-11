// Well see what happens here, for now I just made this file for fun.
// PostgreSQL database connection.
// yes and im gonna log when it connects and I wanna make the log rn 
// Ahh so you want to be able to access a Postgres DB?
// https://www.npmjs.com/package/postgres
import { Pool, Client } from 'pg';
import { getConfig } from './config';

const databaseConnection: boolean = true

// databaseConnection ? console.log("The client is now connected to the database.")

const config = getConfig()

const pool = new Pool({
  user: `${config.postgresConfig.username}`,
  host: `${config.postgresConfig.host}`,
  database: `${config.postgresConfig.database}`,
  password: `${config.postgresConfig.password}`,
  port: config.postgresConfig.port ?? 5432
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

// This is where clients would connect
// To query the DB, a client must first be connected using the pool already defined above
// Then run the query, process the results, and finally release the client
// Top-level await isn't allowed in es2016, but *is* in 2017 or 2022. We may switch to that
/*
async function main() {
    const client = await pool.connect()
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0])
    client.release()
}

main()
*/