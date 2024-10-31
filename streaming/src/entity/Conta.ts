import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Perfil } from "./Perfis";

@Entity()
export class Conta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    senha: string;

    @ManyToOne(() => Perfil, (perfil) => perfil.contas)
    perfil: Perfil;//ajusta pois ele ta fazendo um perfil relacionaar com varias contas, deve ser o contrario

    constructor(email?: string, senha?: string, perfil?: Perfil) {
        this.email = email;
        this.senha = senha;
        this.perfil = perfil;
    }
}