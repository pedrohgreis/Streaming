import { Filme } from '../entity/Filme';
import { FilmeRepositorio } from '../repository/RepositoryFilme';

export class FilmeService {
    private filmeRepositorio: FilmeRepositorio;

    constructor() {
        this.filmeRepositorio = new FilmeRepositorio();
    }

    async criar(filme: Filme): Promise<Filme> {
        return await this.filmeRepositorio.create(filme);
    }

    async listar(): Promise<Filme[]> {
        return await this.filmeRepositorio.listar();
    }

    async atualizar(id: number, filme: Partial<Filme>): Promise<void> {
        await this.filmeRepositorio.atualizar(id, filme);
    }

    async remover(id: number): Promise<boolean> {
        const filme = await this.filmeRepositorio.pesquisar({ id: id });
        if (!filme) {
            return false;
        }
        await this.filmeRepositorio.remover(filme);
        return true;
    }
}