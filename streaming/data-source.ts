import { DataSource } from "typeorm"
import { Filme } from "./src/entity/Filme";
import { Perfil } from "./src/entity/Perfis";
import { Conta } from "./src/entity/Conta";

export const banco = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "pedro3026",
    database: "streaming",
    entities: [Filme, Perfil, Conta],
    synchronize: true,
    dropSchema: false,
    logging: false
});


