import { ObjectId } from "typeorm";
import { Conta } from "../entity/Conta";
import { ContaRepository } from "../repository/RepositoryConta";

export class ContaService{
    private contaRepositorio: ContaRepository;

    constructor(){
        this.contaRepositorio = new ContaRepository()
    }

    async criar(c:Conta): Promise<Conta>{
        return await this.contaRepositorio.criar(c)
    }

    async listar(): Promise<Conta[]>{
        return await this.contaRepositorio.listar()
    }

    async atualizar(id:number, dados: Partial<Conta>): Promise <void>{
        await this.contaRepositorio.atualizar(id,dados)
    }

    async remover(id:number): Promise<boolean>{
        const conta = await this.contaRepositorio.pesquisar({id:id})
        if(!conta){return false}
        await this.contaRepositorio.remover(conta)
        return true;
    }
}