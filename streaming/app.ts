import "reflect-metadata";
import { banco } from "./src/data-source";
import { Filme } from "./src/entity/Filme";
import { Perfil } from "./src/entity/Perfis";
import { Conta } from "./src/entity/Conta";
import { FilmeService } from "./src/service/FilmesService";
import { PerfilService } from "./src/service/PerfisService";
import { ContaService } from "./src/service/ContaService";

banco.initialize()
    .then(async () => {
        const filmeService = new FilmeService();
        const perfilService = new PerfilService();
        const contaService = new ContaService();

        // 1. Criar instâncias das entidades
        const filme1 = new Filme();
        filme1.nome = "Aventura na Selva";
        filme1.duracao = 150;
        filme1.idadeRecomendacao = 10;
        filme1.diretor = "Steven Spielberg";

        const perfil1 = new Perfil();
        perfil1.nome = "Aventureiro";
        perfil1.idade = 30;

        const conta1 = new Conta();
        conta1.email = "aventureiro@email.com";
        conta1.senha = "senhaforte";
        conta1.perfil = perfil1;

        perfil1.filmes = [filme1];

        // 2. Salvar as entidades usando os serviços
        await filmeService.criar(filme1);
        await perfilService.criar(perfil1);
        await contaService.criar(conta1);

        // 3. Consultar os dados usando os serviços
        const filmes = await filmeService.listar();
        const perfis = await perfilService.listar();
        const contas = await contaService.listar();

        // 4. Exibir os dados no console
        console.log("Filmes:", filmes);
        console.log("Perfis:", perfis);
        console.log("Contas:", contas);
    })
    .catch((error) => console.log(error));