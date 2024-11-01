import { Perfil } from "../entity/Perfis";
import { banco } from "../../data-source";
import { Repository } from "typeorm";
import { Filme } from "../entity/Filme";

interface IPerfilRepository {
    create(f: Perfil): Promise<Perfil>;
    listar(): Promise<Perfil[]>;
    obter(id: number): Promise<Perfil | null>;
    pesquisar(filtro: Partial<Perfil>): Promise<Perfil | null>;
    remover(perfil: Perfil): Promise<Perfil>;
    atualizar(id: number, dados: Partial<Perfil>): Promise<void>;
}

export class PerfilRepositorio implements IPerfilRepository {
    private repositorio: Repository<Perfil>;

    constructor() {
        this.repositorio = banco.getRepository(Perfil);
    }

    async create(f: Perfil): Promise<Perfil> {
        try {
            return await this.repositorio.save(f);
        } catch (error) {
            throw new Error("Erro ao criar perfil.");
        }
    }

    async listar(): Promise<Perfil[]> {
        try {
            return await this.repositorio.find({
                relations: ["filmes", "contas"]
            });
        } catch (error) {
            throw new Error("Erro ao listar perfis.");
        }
    }

    async obter(id: number): Promise<Perfil | null> {
        try {
            return await this.repositorio.findOne({
                where: { id },
                relations: ["filmes", "contas"]
            });
        } catch (error) {
            throw new Error("Erro ao obter perfil.");
        }
    }

    async pesquisar(filtro: Partial<Perfil>): Promise<Perfil | null> {
        try {
            return await this.repositorio.findOne({ where: filtro });
        } catch (error) {
            throw new Error("Erro ao pesquisar perfil.");
        }
    }

    async remover(perfil: Perfil): Promise<Perfil> {
        try {
            return await this.repositorio.remove(perfil);
        } catch (error) {
            throw new Error("Erro ao remover perfil.");
        }
    }

    async atualizar(id: number, dados: Partial<Perfil>): Promise<void> {
        try {
            // Primeiro, buscar o perfil existente com suas relações
            const perfilExistente = await this.repositorio.findOne({
                where: { id },
                relations: ["filmes"]
            });

            if (!perfilExistente) {
                throw new Error("Perfil não encontrado");
            }

            // Se houver filmes nos dados, atualizar a relação
            if (dados.filmes) {
                perfilExistente.filmes = dados.filmes;
                await this.repositorio.save(perfilExistente);
            } else {
                // Se não houver filmes, atualizar apenas os outros dados
                await this.repositorio.update(id, dados);
            }
        } catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao atualizar perfil.");
        }
    }

    async listarFilmes(id: number): Promise<Filme[]> {
        const perfil = await this.repositorio.findOne({
            where: { id: id },
            relations: {
                filmes: {
                    perfis: true
                }
            }
        });

        if (perfil) {
            return perfil.filmes;
        } else {
            throw new Error("Perfil não encontrado");
        }
    }
}