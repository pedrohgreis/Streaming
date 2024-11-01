import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Perfil } from "./Perfis";

@Entity()
export class Conta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => Perfil, (perfil) => perfil.contas)
  perfil: Perfil[]; // Remova a inicialização do array

  constructor(email?: string, senha?: string) {
    this.email = email;
    this.senha = senha;
  }
}
