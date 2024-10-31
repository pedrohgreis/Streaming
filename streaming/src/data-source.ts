import { DataSource } from "typeorm"
import { Filme } from "./entity/Filme";
import { Perfil } from "./entity/Perfis";
import { Conta } from "./entity/Conta";

export const banco = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "gbmm",
    password: "123",
    database: "streaming",
    entities: [Filme, Perfil, Conta],
    synchronize: true,
    dropSchema: false,
    logging: false
});


