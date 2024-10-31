import { Conta } from '../entity/Conta';
import { ContaRepository } from '../repository/RepositoryConta';

export class ContaService {
    private contaRepository: ContaRepository;

    constructor() {
        this.contaRepository = new ContaRepository();
    }

    async criar(conta: Conta): Promise<Conta> {
        return await this.contaRepository.criar(conta);
    }

    async listar(): Promise<Conta[]> {
        return await this.contaRepository.listar();
    }

    async atualizar(id: number, conta: Partial<Conta>): Promise<void> {
        await this.contaRepository.atualizar(id, conta);
    }

    async remover(id: number): Promise<boolean> {
        const conta = await this.contaRepository.pesquisar({ id: id });
        if (!conta) {
            return false;
        }
        await this.contaRepository.remover(conta);
        return true;
    }
}