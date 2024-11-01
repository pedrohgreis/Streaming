
//  RENAN EU TE AMO :)

import { FilmeService } from '../src/service/FilmesService'; 
import { FilmeRepositorio } from '../src/repository/RepositoryFilme';
import { Filme } from '../src/entity/Filme';

jest.mock('../src/repository/RepositoryFilme'); // Certifique-se de que o caminho está correto

describe('FilmeService', () => {
    let filmeService: FilmeService;
    let filmeRepositorioMock: jest.Mocked<FilmeRepositorio>;

    beforeEach(() => {
        // Aqui, estamos criando um novo mock para a instância do repositório
        filmeRepositorioMock = new FilmeRepositorio() as jest.Mocked<FilmeRepositorio>;
        filmeRepositorioMock.create = jest.fn(); // Definindo create como um mock
        filmeService = new FilmeService();
        filmeService['filmeRepositorio'] = filmeRepositorioMock; // Substitui o repositório real pelo mock
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpa mocks após cada teste
    });

    it("Criando filme", async () => {
        const movie: Filme = { id: 1, nome: 'Filme Teste', duracao: 204, idadeRecomendacao: 14, diretor: 'John', perfis: [] };

        // Mocka o retorno do método create
        filmeRepositorioMock.create.mockResolvedValue(movie);

        // Chama o método criar do FilmeService
        const result = await filmeService.criar(movie);

        // Verifica se o método create foi chamado corretamente
        expect(filmeRepositorioMock.create).toHaveBeenCalledWith(movie);
        
        // Verifica se o resultado do método criar é o que esperamos
        expect(result).toEqual(movie);
    });

    it("Listar Filmes", async () => {
        const listarmock: Filme[] = [{ id: 1, nome: 'Filme Teste', duracao: 204, idadeRecomendacao: 14, diretor: 'John', perfis: []}];

        filmeRepositorioMock.listar.mockResolvedValue(listarmock);

        const result = await filmeService.listar();

        
        expect(filmeRepositorioMock.listar).toHaveBeenCalledWith();
        
        
        expect(result).toEqual(listarmock);
    });


    it("Deve atualizar filme", async () => {

        filmeRepositorioMock.atualizar.mockResolvedValue();

        const result = await filmeService.atualizar(1,{nome: "Filme 2"});

        expect(filmeRepositorioMock.atualizar).toHaveBeenCalled();
    });

    it("Deletar filme existente", async () => {
        const deletar: Filme = { id: 1, nome: 'Filme Teste', duracao: 204, idadeRecomendacao: 14, diretor: 'John', perfis: [] };
        filmeRepositorioMock.pesquisar.mockResolvedValue(deletar);
        filmeRepositorioMock.remover.mockResolvedValue(undefined);

        const result = await filmeService.remover(1);
        expect(filmeRepositorioMock.pesquisar).toHaveBeenCalledWith({ id: 1 });
        expect(filmeRepositorioMock.remover).toHaveBeenCalledWith(deletar);
        expect(result).toBe(true);

    });

    it("deve retornar falso ao tentar remover um filme inexistente", async () => {
        filmeRepositorioMock.pesquisar.mockResolvedValue(null)

        const result = await filmeService.remover(1);

        expect(filmeRepositorioMock.pesquisar).toHaveBeenCalledWith({id:1})
        expect(result).toBe(false)
    });
});
