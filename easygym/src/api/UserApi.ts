import { TOKEN } from './Token';

// Simula armazenamento do JSON textual do usuário
let userJsonText = `
{
  "name": "Bruno Ferreira da Silva",
  "email": "brunofs99@hotmail.com",
  "cpf": "123.456.789-09",
  "tel": "+55 (11) 94572-6687",
  "birth": "2000-01-01"
}`;

export const UserApi = {
  // Simula GET /user
  getUser: async (auth: string) => {
    // Verifica se o token está ok
    if (auth !== TOKEN) throw new Error("Unauthorized");

    // Realiza a "chamada" da API e recebe response
    await delay();
    const responseCode = 200;
    const responseText = userJsonText;

    if (responseCode === 200) {
      // Converte response para objeto e retorna
      const userObj = JSON.parse(responseText);
      return userObj;
    }else {
      // Lança erro com mensagem
      throw new Error("Erro ao buscar usuário");
    }
  },

  // Simula POST /user/update
  updateUser: async (auth: string, updatedData: Partial<UserData>) => {
    // Verifica se o token está ok
    if (auth !== TOKEN) throw new Error("Unauthorized");

    // Realiza a "chamada" da API e recebe os dados atuais
    await delay();
    const responseCode = 200;
    const responseText = userJsonText;

    if (responseCode === 200) {
      // Converte os dados atuais, aplica alterações e salva o novo JSON como texto
      const currentData = JSON.parse(responseText);
      const newData = { ...currentData, ...updatedData };
      userJsonText = JSON.stringify(newData);

      // Retorna sucesso
      return { success: true };
    }else {
      // Lança erro com mensagem
      throw new Error("Erro ao atualizar usuário");
    }
  },

  // Simula POST /user/password
  changePassword: async (auth: string, oldPass: string, newPass: string) => {
    // Verifica se o token está ok
    if (auth !== TOKEN) throw new Error("Unauthorized");

    // Verifica se os dados estão completos
    if (!oldPass || !newPass) throw new Error("Invalid input");

    // Realiza a "chamada" da API e envia os dados de senha
    await delay();
    const responseCode = 200;
    const passwordPayload = JSON.stringify({ oldPass, newPass });

    // Apenas exibe o payload (simulação de envio)
    console.log("Simulando envio de senha:", passwordPayload);

    if (responseCode === 200) {
      // Retorna sucesso
      return { success: true };
    }else {
      // Lança erro com mensagem
      throw new Error("Erro ao atualizar senha");
    }
  },

  // Simula POST /user/report
  getReport: async (auth: string, start: string, end: string) => {
    // Verifica se o token está ok
    if (auth !== TOKEN) throw new Error("Unauthorized");

    // Verifica se as datas foram preenchidas
    if (!start || !end) throw new Error("Datas obrigatórias");

    // Realiza a "chamada" da API e envia os filtros de relatório
    await delay();
    const responseCode = 200;
    const reportPayload = JSON.stringify({ start, end });

    // Apenas exibe o payload (simulação de envio)
    console.log("Simulando envio de filtro de relatório:", reportPayload);

    if (responseCode === 200) {
      // Retorna a URL do PDF
      return {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      };
    }else {
      // Lança erro com mensagem
      throw new Error("Erro ao gerar relatório");
    }
  }
};

// Simula atraso de rede
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Tipagem para o usuário
type UserData = {
  name: string;
  email: string;
  cpf: string;
  tel: string;
  birth: string;
};
