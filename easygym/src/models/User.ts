
class User {
    private name: string;
    private email: string;
    private birth: Date;
    private cpf: string;
    private tel: string;
    private password: string;

    constructor(name: string, email: string, birth: Date, cpf:string, tel: string, password: string) {
        this.name = name;
        this.email = email;
        this.birth = birth;
        this.cpf = cpf;
        this.tel = tel;
        this.password = password;
    }


    
    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getBirth(): Date {
        return this.birth;
    }

    public getCpf(): string{
        return this.cpf;
    }

    public getTel(): string {
        return this.tel;
    }

    public getPassword(): string {
        return this.password;
    }

  
    public setName(name: string): void {
        this.name = name;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setBirth(birth: Date): void {
        this.birth = birth;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    public setTel(tel: string): void {
        this.tel = tel;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public toString(): string {
        return `Nome: ${this.name}\nEmail: ${this.email}\nData de Nascimento: ${this.birth}\nCPF: ${this.cpf}\nTelefone: ${this.tel}\nSenha: ${this.password}`;
    }   
}

export default User;