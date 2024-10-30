import { Perfis } from "../entity/Perfis";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

export class PerfisRepositorio{
    private repositorio: Repository<Perfis>

    constructor(){
        this.repositorio = AppDataSource.getRepository(Perfis)
    }

    async create(f:Perfis): Promise<Perfis>{
        return await this.repositorio.save(f);
    }

    async listar(): Promise<Perfis[]>{
        return await this.repositorio.find();
    }

    async obter(id:number): Promise<Perfis>{
        return await this.repositorio.findOneBy({id:id});
    }

    async pesquisar(filtro: Partial<Perfis>):Promise<Perfis | null>{
        return await this.repositorio.findOne({where:filtro})
    }

    async remover(perfil: Perfis): Promise<Perfis>{
        return await this.repositorio.remove(perfil);
    }

    async atualizar(id:number, dados:Partial <Perfis>): Promise <void>{
        await this.repositorio.update(id,dados);
    }
}

