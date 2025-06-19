import { TOKEN } from '../Token';

export type MemberType = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  tel: string;
  birth: string;
  status: boolean;
};

let members: MemberType[] = [
   { id: 1, status: true, name: "Ana Carolina Santos Oliveira", cpf: "529.982.310-74", email: "ana.oliveira@email.com", tel: "(21) 98745-6321", birth: "1995-03-15" },
      { id: 2, status: true, name: "Pedro Henrique Almeida Costa", cpf: "718.456.230-95", email: "pedro.costa@email.com.br", tel: "(11) 99876-5432", birth: "1998-07-22" },
      { id: 3, status: false, name: "Juliana Pereira Rodrigues", cpf: "324.765.890-12", email: "juliana.rodrigues@email.org", tel: "(31) 98543-2109", birth: "1993-11-05" },
      { id: 4, status: true, name: "Lucas Martins Ferreira", cpf: "876.543.210-68", email: "lucas.ferreira@email.net", tel: "(51) 97654-3210", birth: "1997-09-18" },
      { id: 5, status: true, name: "Camila Gonçalves Souza", cpf: "456.789.123-45", email: "camila.souza@email.com", tel: "(19) 98765-4321", birth: "1996-04-30" },
      { id: 6, status: true, name: "Rafael Barbosa Lima", cpf: "987.654.321-09", email: "rafael.lima@email.com.br", tel: "(27) 99876-5432", birth: "1994-12-08" },
      { id: 7, status: true, name: "Isabela Castro Ribeiro", cpf: "234.567.890-34", email: "isabela.ribeiro@email.org", tel: "(47) 98567-1234", birth: "1999-02-14" },
      { id: 8, status: true, name: "Marcos Vinicius Oliveira Santos", cpf: "765.432.109-87", email: "marcos.santos@email.net", tel: "(85) 97654-3210", birth: "1992-06-25" },
      { id: 9, status: false, name: "Fernanda Alves Pereira", cpf: "543.216.789-01", email: "fernanda.pereira@email.com", tel: "(31) 98765-1234", birth: "1991-08-17" },
      { id: 10, status: true, name: "Gustavo Henrique Silva Costa", cpf: "321.654.987-23", email: "gustavo.costa@email.com.br", tel: "(11) 99876-5432", birth: "1998-05-03" },
      { id: 11, status: true, name: "Patrícia Nunes Carvalho", cpf: "678.901.234-56", email: "patricia.carvalho@email.org", tel: "(21) 98543-2109", birth: "1995-10-29" },
      { id: 12, status: true, name: "Roberto Carlos Mendes", cpf: "890.123.456-78", email: "roberto.mendes@email.net", tel: "(51) 97654-3210", birth: "1993-01-12" },
      { id: 13, status: true, name: "Amanda Dias Fernandes", cpf: "109.876.543-21", email: "amanda.fernandes@email.com", tel: "(19) 98765-4321", birth: "1997-07-07" },
      { id: 14, status: true, name: "Diego Souza Alencar", cpf: "432.109.876-54", email: "diego.alencar@email.com.br", tel: "(27) 99876-5432", birth: "1994-03-21" },
      { id: 15, status: false, name: "Carolina Oliveira Martins", cpf: "654.321.098-76", email: "carolina.martins@email.org", tel: "(47) 98567-1234", birth: "1990-12-19" },
      { id: 16, status: true, name: "Thiago Pereira Ramos", cpf: "987.012.345-67", email: "thiago.ramos@email.net", tel: "(85) 97654-3210", birth: "1996-09-02" },
      { id: 17, status: true, name: "Larissa Costa Silva", cpf: "210.987.654-32", email: "larissa.silva@email.com", tel: "(31) 98765-1234", birth: "1999-04-15" },
      { id: 18, status: true, name: "Vinicius Rodrigues Almeida", cpf: "543.210.987-65", email: "vinicius.almeida@email.com.br", tel: "(11) 99876-5432", birth: "1992-11-28" },
      { id: 19, status: true, name: "Beatriz Santos Lima", cpf: "876.543.210-98", email: "beatriz.lima@email.org", tel: "(21) 98543-2109", birth: "1997-08-10" },
      { id: 20, status: true, name: "Ricardo Ferreira Gomes", cpf: "321.098.765-43", email: "ricardo.gomes@email.net", tel: "(51) 97654-3210", birth: "1995-02-23" },
      { id: 21, status: false, name: "Mariana Alves Costa", cpf: "654.321.098-76", email: "mariana.costa@email.com", tel: "(19) 98765-4321", birth: "1993-06-14" },
      { id: 22, status: true, name: "Felipe Oliveira Ribeiro", cpf: "987.654.321-09", email: "felipe.ribeiro@email.com.br", tel: "(27) 99876-5432", birth: "1998-01-27" },
      { id: 23, status: true, name: "Gabriela Silva Santos", cpf: "123.456.789-01", email: "gabriela.santos@email.org", tel: "(47) 98567-1234", birth: "1994-05-08" },
      { id: 24, status: true, name: "Leonardo Martins Pereira", cpf: "456.789.123-45", email: "leonardo.pereira@email.net", tel: "(85) 97654-3210", birth: "1991-10-31" },
      { id: 25, status: true, name: "Tatiane Rodrigues Alencar", cpf: "789.012.345-67", email: "tatiane.alencar@email.com", tel: "(31) 98765-1234", birth: "1996-07-12" },
      { id: 26, status: true, name: "Rodrigo Costa Fernandes", cpf: "234.567.890-12", email: "rodrigo.fernandes@email.com.br", tel: "(11) 99876-5432", birth: "1999-03-25" },
      { id: 27, status: true, name: "Vanessa Souza Gomes", cpf: "567.890.123-45", email: "vanessa.gomes@email.org", tel: "(21) 98543-2109", birth: "1992-09-18" },
      { id: 28, status: true, name: "Alexandre Pereira Lima", cpf: "890.123.456-78", email: "alexandre.lima@email.net", tel: "(51) 97654-3210", birth: "1990-12-01" },
      { id: 29, status: false, name: "Daniela Almeida Santos", cpf: "012.345.678-90", email: "daniela.santos@email.com", tel: "(19) 98765-4321", birth: "1997-04-22" },
      { id: 30, status: false, name: "Marcelo Ribeiro Costa", cpf: "345.678.901-23", email: "marcelo.costa@email.com.br", tel: "(27) 99876-5432", birth: "1994-08-05" }
];

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const MembersApi = {
  getMembers: async (auth: string): Promise<MemberType[]> => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    await delay();
    return members;
  },

  updateMember: async (auth: string, updated: MemberType): Promise<MemberType> => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    await delay();

    const index = members.findIndex(m => m.id === updated.id);
    if (index === -1) throw new Error("Aluno não encontrado");

    members[index] = { ...members[index], ...updated };
    return members[index];
  },

  filterMembers: async (auth: string, name: string, cpf: string): Promise<MemberType[]> => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    await delay();

    return members.filter(m =>
      m.name.toLowerCase().includes(name.toLowerCase()) &&
      m.cpf.includes(cpf)
    );
  }
};
