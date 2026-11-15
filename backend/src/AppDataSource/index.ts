import dotenv from 'dotenv'

import path from 'node:path'

import { DataSource } from 'typeorm'

dotenv.config()

const HOST = process.env.DB_HOST
const DB_PORT = Number(process.env.DB_PORT)
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [path.join(__dirname, '../entities/*{.ts,.js}')],
    synchronize:true,
    logging:true,
})

