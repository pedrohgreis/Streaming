import { Conta } from "../entity/Conta";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

interface IContaRepository {
    criar(conta: Conta): Promise<Conta>;
    listar(): Promise<Conta[]>;
    obter(id: number): Promise<Conta | null>;
    pesquisar(filtro: Partial<Conta>): Promise<Conta | null>;
    remover(conta: Conta): Promise<Conta>;
    atualizar(id: number, dados: Partial<Conta>): Promise<void>;
}

export class ContaRepository implements IContaRepository {
    private repositorio: Repository<Conta>;

    constructor() {
        this.repositorio = AppDataSource.getRepository(Conta);
    }

    async criar(conta: Conta): Promise<Conta> {
        try {
            // Validações de dados podem ser adicionadas aqui
            return await this.repositorio.save(conta);
        } catch (error) {
            // Tratamento de erros
            throw new Error("Erro ao criar conta.");
        }
    }

    async listar(): Promise<Conta[]> {
        try {
            return await this.repositorio.find();
        } catch (error) {
            throw new Error("Erro ao listar contas.");
        }
    }

    async obter(id: number): Promise<Conta | null> {
        try {
            return await this.repositorio.findOneBy({ id: id });
        } catch (error) {
            throw new Error("Erro ao obter conta.");
        }
    }

    async pesquisar(filtro: Partial<Conta>): Promise<Conta | null> {
        try {
            return await this.repositorio.findOne({ where: filtro });
        } catch (error) {
            throw new Error("Erro ao pesquisar conta.");
        }
    }

    async remover(conta: Conta): Promise<Conta> {
        try {
            return await this.repositorio.remove(conta);
        } catch (error) {
            throw new Error("Erro ao remover conta.");
        }
    }

    async atualizar(id: number, dados: Partial<Conta>): Promise<void> {
        try {
            await this.repositorio.update(id, dados);
        } catch (error) {
            throw new Error("Erro ao atualizar conta.");
        }
    }
}