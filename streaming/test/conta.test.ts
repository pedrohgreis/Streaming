import { ContaRepository } from "../src/repository/RepositoryConta";
import { ContaService } from "../src/service/ContaService";
import { Conta } from "../src/entity/Conta";
import { Perfil } from "../src/entity/Perfis";

// Mockando o repositório
jest.mock("../src/repository/RepositoryConta");

describe("ContaService", () => {
    let contaService: ContaService;
    // promessa de mock
    let contaRepositorioMock: jest.Mocked<ContaRepository>;

    beforeEach(() => {
        contaRepositorioMock = new ContaRepository() as jest.Mocked<ContaRepository>
        contaRepositorioMock.criar = jest.fn();

        contaService = new ContaService();
        contaService['contaRepository'] = contaRepositorioMock;
    });

    afterEach(() => {
        jest.clearAllMocks()
    });


    it("Criando conta", async () => {
        const conta: Conta = {id:1, email: "lucas@gmail.com", senha: "123456", perfil: null}
        contaRepositorioMock.criar.mockResolvedValue(conta)

        const result = await contaService.criar(conta)

        expect(contaRepositorioMock.criar).toHaveBeenCalledWith(conta);
        expect(result).toEqual(conta);
    });

    it("Listar conta", async () => {
        const conta: Conta[] = [{id:1, email: "lucas@gmail.com", senha: "123456", perfil: null}];
        contaRepositorioMock.listar.mockResolvedValue(conta);

        const result = await contaService.listar();

        expect(contaRepositorioMock.listar).toHaveBeenCalledWith();
        expect(result).toEqual(conta)

    });

    it("Atualizar conta", async () => {
        contaRepositorioMock.atualizar.mockResolvedValue();

        const result = await contaService.atualizar(1,{email: "lucas@hotmail.com"});
        
        expect(contaRepositorioMock.atualizar).toHaveBeenCalled();
    });

    it("Deletar conta existente", async () => {
        const conta: Conta = {id:1, email: "lucas@gmail.com", senha: "123456", perfil: null};
        contaRepositorioMock.pesquisar.mockResolvedValue(conta);
        contaRepositorioMock.remover.mockResolvedValue(conta);

        const result = await contaService.remover(1);
        expect(contaRepositorioMock.pesquisar).toHaveBeenCalledWith({id:1});
        expect(contaRepositorioMock.remover).toHaveBeenCalledWith(conta);
        expect(result).toEqual(true);
    });

    it("deve retornar falso ao tentar remover uma conta inexistente", async () => {
        contaRepositorioMock.pesquisar(null);

        const result = await contaService.remover(1);

        expect(contaRepositorioMock.pesquisar).toHaveBeenCalledWith({id:1});

        expect(result).toEqual(false);
    });
})