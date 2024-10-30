import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Perfis } from "./Perfis";

@Entity()
export class Conta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    senha: string;

    @ManyToOne(() => Perfis, (perfil) => perfil.contas)
    perfil: Perfis;
}


