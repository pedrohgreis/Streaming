import "reflect-metadata"
import { DataSource } from "typeorm"
import { Filme } from "./entity/Filme"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "pedro3026",
    database: "streaming",
    synchronize: true,
    logging: false,
    entities: [Filme],
    migrations: [],
    subscribers: [],
})
