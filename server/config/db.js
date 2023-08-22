if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
})

if(pool) {
    console.log(`Postgresql connected at DB: ${pool.options.database}`)
}

module.exports = pool