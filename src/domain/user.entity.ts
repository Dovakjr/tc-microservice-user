export class User {
  cpf: string;
  name: string;
  email: string;

  constructor(cpf: string, name: string, email?: string) {
    this.cpf = cpf;
    this.name = name;
    this.email = email;
  }
}
