import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
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
    perfis: Perfil[];

    constructor(nome?: string, duracao?: number, idadeRecomendacao?: number, diretor?: string, perfis?: Perfil[]) {
        this.nome = nome;
        this.duracao = duracao;
        this.idadeRecomendacao = idadeRecomendacao;
        this.diretor = diretor;
        this.perfis = perfis;
    }
}