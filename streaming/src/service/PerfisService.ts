import { Perfis } from "../entity/Perfis";
import { PerfisRepositorio } from "../repository/ReporitoryPerfis";

export class PerfilService{
    private perfilRepository: PerfisRepositorio

    constructor(){
        this.perfilRepository = new PerfisRepositorio()
    }

    async criar(p:Perfis): Promise<Perfis>{
        return await this.perfilRepository.create(p);
    }

    async listar():Promise<Perfis[]>{
        return await this.perfilRepository.listar()
    }

    async atualizar(id:number, perfis:Perfis): Promise<void>{
        return await this.atualizar(id,perfis);
    }

    async remover(id:number): Promise <boolean>{
        const perfil = await this.perfilRepository.pesquisar({id:id});

        if(!perfil) {return false}
        this.perfilRepository.atualizar(id,perfil);
        return true;
    }
}