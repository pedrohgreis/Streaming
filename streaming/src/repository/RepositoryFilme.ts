import { Filme } from "../entity/Filme";
import { banco } from "../../data-source";
import { Repository } from "typeorm";
import { Perfil } from "../entity/Perfis";

interface IFilmeRepository {
    create(f: Filme): Promise<Filme>;
    listar(): Promise<Filme[]>;
    obter(id: number): Promise<Filme | null>;
    pesquisar(filtro: Partial<Filme>): Promise<Filme | null>;
    remover(filme: Filme): Promise<Filme>;
    atualizar(id: number, dados: Partial<Filme>): Promise<void>;
}

export class FilmeRepositorio implements IFilmeRepository {
    private repositorio: Repository<Filme>;

    constructor() {
        this.repositorio = banco.getRepository(Filme);
    }

    async create(f: Filme): Promise<Filme> {
        try {
            return await this.repositorio.save(f);
        } catch (error) {
            throw new Error("Erro ao criar filme.");
        }
    }

    async listar(): Promise<Filme[]> {
        try {
            return await this.repositorio.find({
                relations: ["perfis"]
            });
        } catch (error) {
            throw new Error("Erro ao listar filmes.");
        }
    }

    async obter(id: number): Promise<Filme | null> {
        try {
            return await this.repositorio.findOne({
                where: { id },
                relations: ["perfis"]
            });
        } catch (error) {
            throw new Error("Erro ao obter filme.");
        }
    }

    async pesquisar(filtro: Partial<Filme>): Promise<Filme | null> {
        try {
            return await this.repositorio.findOne({ where: filtro });
        } catch (error) {
            throw new Error("Erro ao pesquisar filme.");
        }
    }

    async remover(filme: Filme): Promise<Filme> {
        try {
            return await this.repositorio.remove(filme);
        } catch (error) {
            throw new Error("Erro ao remover filme.");
        }
    }

    async atualizar(id: number, dados: Partial<Filme>): Promise<void> {
        try {
            await this.repositorio.update(id, dados);
        } catch (error) {
            throw new Error("Erro ao atualizar filme.");
        }
    }

    async listarPerfis(id: number): Promise<Perfil[]> {
        const filme = await this.repositorio.findOne({
            where: { id: id },
            relations: {
                perfis: {
                    filmes: true
                }
            }
        });

        if (filme) {
            return filme.perfis;
        } else {
            throw new Error("Filme não encontrado");
        }
    }
}
