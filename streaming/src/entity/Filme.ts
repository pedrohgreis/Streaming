import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

import { Perfil } from "./Perfis";


@Entity()
export class Filme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'float' })
  duracao: number;

  @Column()
  idadeRecomendacao: number;

  @Column()
  diretor: string;

  @ManyToMany(() => Perfil, (perfil) => perfil.filmes)
  @JoinTable({
        name: "filme_perfil", // Nome da tabela de junção
        joinColumn: {
            name: "filme_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "perfil_id",
            referencedColumnName: "id"
        }
    })
    perfis: Perfil[];

    constructor(nome?: string, duracao?: number, idadeRecomendacao?: number, diretor?: string, perfis?: Perfil[]) {
        this.nome = nome;
        this.duracao = duracao;
        this.idadeRecomendacao = idadeRecomendacao;
        this.diretor = diretor;
        this.perfis = perfis;
    }
}

