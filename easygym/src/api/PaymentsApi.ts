import { TOKEN } from './Token';

// Simula armazenamento dos dados
let pagamentoList = [
  { mes: "Maio 2025", vencimento: "10/05/2025", valor: "R$ 89,99", status: "Pago" },
  { mes: "Junho 2025", vencimento: "10/06/2025", valor: "R$ 89,99", status: "Pago" },
  { mes: "Julho 2025", vencimento: "10/07/2025", valor: "R$ 89,99", status: "Aguardando Pagamento" },
  { mes: "Agosto 2025", vencimento: "10/08/2025", valor: "R$ 89,99", status: "A vencer" },
];

let metodoPagamento = "Cartão de crédito final 6613";
let dataVencimento = "15";

export const PaymentsApi = {
  getPayments: async (auth: string) => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    await delay();
    const responseCode = 200;

    if (responseCode === 200) {
      return pagamentoList;
    } else {
      throw new Error("Erro ao buscar pagamentos");
    }
  },

  updatePaymentMethod: async (
    auth: string,
    method: string,
    cardData?: {
      name: string;
      number: string;
      expiry: string;
      cvv: string;
      address: string;
    }
  ) => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    if (!method) throw new Error("Forma de pagamento inválida");

    await delay();

    if (method === "credit") {
      if (
        !cardData ||
        !cardData.name ||
        !cardData.number ||
        !cardData.expiry ||
        !cardData.cvv ||
        !cardData.address
      ) {
        throw new Error("Dados do cartão incompletos");
      }

      // Aqui você poderia fazer o "envio" para uma API real
      console.log("Simulando envio do cartão:", cardData);

      const lastDigits = cardData.number.slice(-4);
      metodoPagamento = `Cartão de crédito final ${lastDigits}`;
    } else {
      const labels: any = {
        boleto: "Boleto",
        pix: "Pix",
      };
      metodoPagamento = labels[method] || "Outro método";
    }

    return { success: true };
  },

  getPaymentMethod: async (auth: string) => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    await delay();
    const responseCode = 200;

    if (responseCode === 200) {
      return metodoPagamento;
    } else {
      throw new Error("Erro ao buscar forma de pagamento");
    }
  },

  updateDueDate: async (auth: string, newDueDate: string) => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    if (!newDueDate) throw new Error("Data inválida");
    await delay();
    const responseCode = 200;

    if (responseCode === 200) {
      dataVencimento = newDueDate;
      return { success: true };
    } else {
      throw new Error("Erro ao atualizar data de vencimento");
    }
  },

  getDueDate: async (auth: string) => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    await delay();
    const responseCode = 200;

    if (responseCode === 200) {
      return dataVencimento;
    } else {
      throw new Error("Erro ao buscar data de vencimento");
    }
  },
};

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));