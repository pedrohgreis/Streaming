import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Conta } from "./Conta";
import { Filme } from "./Filme";

@Entity()
export class Perfis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    idade: number;

    @OneToMany(() => Conta, (conta) => conta.perfil)
    contas: Conta[];

    @ManyToMany(() => Filme, (filme) => filme.perfis)
    filmes: Filme[];
}
