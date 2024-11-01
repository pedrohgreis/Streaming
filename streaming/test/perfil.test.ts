import { PerfilRepositorio } from "../src/repository/ReporitoryPerfis";
import { PerfilService } from "../src/service/PerfisService";
import { Perfil } from "../src/entity/Perfis";
import { Filme } from "../src/entity/Filme";

jest.mock("../src/repository/ReporitoryPerfis");

describe("PerfilService", () => {
    let perfilService: PerfilService;
    let perfilRepositorioMock: jest.Mocked<PerfilRepositorio>

    beforeEach(() => {
        perfilRepositorioMock = new PerfilRepositorio() as jest.Mocked<PerfilRepositorio>;
        perfilRepositorioMock.create = jest.fn();

        perfilService = new PerfilService();
        perfilService['perfilRepositorio'] = perfilRepositorioMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("Criar Perfil", async () => {
        const perfil: Perfil = {id: 1,nome: "João", idade: 27, contas: null, filmes: []}

        perfilRepositorioMock.create.mockResolvedValue(perfil);

        const result = await perfilService.criar(perfil)

        expect(perfilRepositorioMock.create).toHaveBeenCalledWith(perfil);
        expect(result).toEqual(perfil)
    });

    it("Listar perfis", async () => {
        const listar:Perfil[] = [{id: 1,nome: "João", idade: 27, contas: null, filmes: []}]
        perfilRepositorioMock.listar.mockResolvedValue(listar)

        const result = await perfilService.listar()

        expect(perfilRepositorioMock.listar).toHaveBeenCalled();
        expect(result).toEqual(listar);
    });

    it("Atualizar Perfil", async () => {
        perfilRepositorioMock.atualizar.mockResolvedValue()

        const result = await perfilService.atualizar(1,{ nome: "Matheus", idade: 28})

        expect(perfilRepositorioMock.atualizar).toHaveBeenCalled();
    });

    it("Remover perfil", async () => {
        const perfil: Perfil = {id: 1,nome: "João", idade: 27, contas: null, filmes: []}

        perfilRepositorioMock.pesquisar.mockResolvedValue(perfil);
        perfilRepositorioMock.remover.mockResolvedValue(perfil);

        const result = await perfilService.remover(1);
        expect(perfilRepositorioMock.pesquisar).toHaveBeenCalledWith({id:1});
        expect(perfilRepositorioMock.remover).toHaveBeenCalledWith(perfil);
        expect(result).toEqual(true);
    });

    it("Tentar remover perfil inexistente", async () => {
        perfilRepositorioMock.pesquisar.mockResolvedValue(null);

        const result = await perfilService.remover(1);

        expect(perfilRepositorioMock.pesquisar).toHaveBeenCalledWith({id:1});
        expect(result).toEqual(false);

    });
});