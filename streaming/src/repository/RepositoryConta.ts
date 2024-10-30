import { Conta } from "../entity/Conta";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

export class ContaRepository{
    private repositorio: Repository<Conta>

    constructor(){
        this.repositorio = AppDataSource.getRepository(Conta)
    }

    async criar(c:Conta): Promise<Conta>{
        return await this.repositorio.save(c);
    }

    async listar(): Promise<Conta[]>{
        return await this.repositorio.find();
    }

    async obter(id:number): Promise<Conta>{
        return await this.repositorio.findOneBy({id:id});
    }

    async pesquisar(contas: Partial<Conta>):Promise<Conta | null>{
        return await this.repositorio.findOne({where:contas})
    }

    async remover(c: Conta): Promise<Conta>{
        return await this.repositorio.remove(c);
    }

    async atualizar(id:number, dados:Partial <Conta>): Promise <void>{
        await this.repositorio.update(id,dados);
    }
}