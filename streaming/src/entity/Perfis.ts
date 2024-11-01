import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { Conta } from "./Conta";
import { Filme } from "./Filme";

@Entity()
export class Perfil {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    idade: number;

    @ManyToOne(() => Conta, (conta) => conta.perfil)
    contas: Conta;

    @ManyToMany(() => Filme, (filme) => filme.perfis)
    filmes: Filme[];

    constructor(nome?: string, idade?: number, contas?: Conta, filmes?: Filme[]) {
        this.nome = nome;
        this.idade = idade;
        this.contas = contas;
        this.filmes = filmes;
    }
}