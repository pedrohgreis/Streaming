import { Perfil } from '../entity/Perfis';
import { PerfilRepositorio } from '../repository/ReporitoryPerfis';
import { Filme } from '../entity/Filme';

export class PerfilService {
    private perfilRepositorio: PerfilRepositorio;

    constructor() {
        this.perfilRepositorio = new PerfilRepositorio();
    }

    async criar(perfil: Perfil): Promise<Perfil> {
        return await this.perfilRepositorio.create(perfil);
    }

    async listar(): Promise<Perfil[]> {
        return await this.perfilRepositorio.listar();
    }

    async atualizar(id: number, perfil: Partial<Perfil>): Promise<void> {
        await this.perfilRepositorio.atualizar(id, perfil);
    }

    async remover(id: number): Promise<boolean> {
        const perfil = await this.perfilRepositorio.pesquisar({ id: id });
        if (!perfil) {
            return false;
        }
        await this.perfilRepositorio.remover(perfil);
        return true;
    }

    async listarFilmesPorPerfil(id: number): Promise<Filme[]> {
        try {
            return await this.perfilRepositorio.listarFilmes(id);
        } catch (error) {
            throw new Error(`Erro ao listar filmes do perfil com ID ${id}: ${error.message}`);
        }
    }
}