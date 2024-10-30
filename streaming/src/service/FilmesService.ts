import { Filme } from "../entity/Filme";
import { FilmeRepositorio } from "../repository/RepositoryFilme";


export class FilmeService{
    private filmeRepositorio: FilmeRepositorio;

    constructor(){
        this.filmeRepositorio = new FilmeRepositorio()
    }

    async criar(f:Filme): Promise<Filme>{
        return await this.filmeRepositorio.create(f);
    }

    async listar(): Promise<Filme[]>{
        return await this.filmeRepositorio.listar();
    }

    async atualizar(id:number, dados: Partial<Filme>):Promise<void>{
        await this.filmeRepositorio.atualizar(id,dados);
    }
    
    async remover(id:number):Promise<boolean>{
        const filme = await this.filmeRepositorio.pesquisar({id:id});
        if(!filme) {return false}

        await this.filmeRepositorio.remover(filme);
        return true;
    }
}