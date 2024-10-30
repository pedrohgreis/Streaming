import { Filme } from "../entity/Filme";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

export class FilmeRepositorio{
    private repositorio: Repository<Filme>

    constructor(){
        this.repositorio = AppDataSource.getRepository(Filme)
    }

    async create(f:Filme): Promise<Filme>{
        return await this.repositorio.save(f);
    }

    async listar(): Promise<Filme[]>{
        return await this.repositorio.find();
    }

    async obter(id:number): Promise<Filme>{
        return await this.repositorio.findOneBy({id:id});
    }

    async pesquisar(filmes: Partial<Filme>):Promise<Filme | null>{
        return await this.repositorio.findOne({where:filmes})
    }

    async remover(fm: Filme): Promise<Filme>{
        return await this.repositorio.remove(fm);
    }

    async atualizar(id:number, movie:Partial <Filme>): Promise <void>{
        await this.repositorio.update(id,movie);
    }
}

