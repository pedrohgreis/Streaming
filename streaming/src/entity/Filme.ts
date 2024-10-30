import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Perfis } from "./Perfis";

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

    @ManyToMany(() => Perfis, (perfil) => perfil.filmes)
    perfis: Perfis[];
}
