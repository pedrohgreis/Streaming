import "reflect-metadata";
import { banco } from "./data-source";
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

        // 1. Criar e salvar o perfil primeiro
        const perfil1 = new Perfil();
        perfil1.nome = "Aventureiro";
        perfil1.idade = 30;
        perfil1.filmes = []; // Inicializar array vazio
        const perfilSalvo1 = await perfilService.criar(perfil1);


        const perfil2 = new Perfil();
        perfil2.nome = "Explorador";
        perfil2.idade = 25;
        perfil2.filmes = []; // Inicializar array vazio
        const perfilSalvo2 = await perfilService.criar(perfil2);

        // 2. Criar e salvar o filme
        const filme1 = new Filme();
        filme1.nome = "Aventura na Selva";
        filme1.duracao = 150;
        filme1.idadeRecomendacao = 10;
        filme1.diretor = "Steven Spielberg";
        filme1.perfis = [perfilSalvo1,perfilSalvo2]; // Associar com o perfil salvo
        const filmeSalvo = await filmeService.criar(filme1);

        // 3. Atualizar o perfil com o filme
        try {
            await perfilService.atualizar(perfilSalvo1.id, { filmes: [filmeSalvo] });
            await perfilService.atualizar(perfilSalvo2.id, { filmes: [filmeSalvo] });
            console.log("Perfil atualizado com sucesso");
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
        }

        // 4. Criar e salvar a conta associada ao perfil
        const conta1 = new Conta();
        conta1.email = "aventureiro@email.com";
        conta1.senha = "senhaforte";
        conta1.perfil = [perfilSalvo1,perfilSalvo2];
        await contaService.criar(conta1);

        // 5. Consultas com relações
        const filmesComPerfis = await filmeService.listarPerfisPorFilme(filmeSalvo.id);
        const perfilComFilmes1 = await perfilService.listarFilmesPorPerfil(perfilSalvo1.id);
        const perfilComFilmes2 = await perfilService.listarFilmesPorPerfil(perfilSalvo2.id);


        console.log("Filmes do perfil:");
        perfilComFilmes1.forEach(filme => {
            console.log({
                id: filme.id,
                nome: filme.nome,
                diretor: filme.diretor,
                perfis: filme.perfis?.map(p => ({
                    id: p.id,
                    nome: p.nome
                }))
            });
        });

        console.log("\nFilmes do perfil Explorador:");
        perfilComFilmes2.forEach(filme => {
            console.log({
                id: filme.id,
                nome: filme.nome,
                diretor: filme.diretor,
                perfis: filme.perfis?.map(p => ({
                    id: p.id,
                    nome: p.nome
                }))
            });
        });

        console.log("\nPerfis do filme:");
        filmesComPerfis.forEach(perfil => {
            console.log({
                id: perfil.id,
                nome: perfil.nome,
                filmes: perfil.filmes?.map(f => ({
                    id: f.id,
                    nome: f.nome
                }))
            });
        });
    })
    .catch((error) => console.log(error));