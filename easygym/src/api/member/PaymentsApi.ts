import { TOKEN } from '../Token';

// Simula armazenamento dos dados
let paymentList = [
  { month: "Maio 2025", due: "10/05/2025", value: "R$ 89,99", status: "Pago" },
  { month: "Junho 2025", due: "10/06/2025", value: "R$ 89,99", status: "Pago" },
  { month: "Julho 2025", due: "10/07/2025", value: "R$ 89,99", status: "Aguardando Pagamento" },
  { month: "Agosto 2025", due: "10/08/2025", value: "R$ 89,99", status: "A vencer" },
];

let paymentMethod = "Cartão de crédito final 6613";
let dueDate = "15";

export const PaymentsApi = {
  getPayments: async (auth: string) => {
    await delay();
    const responseCode = 200;

    if (responseCode === 200) {
      return paymentList;
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
      paymentMethod = `Cartão de crédito final ${lastDigits}`;
    } else {
      const labels: any = {
        boleto: "Boleto",
        pix: "Pix",
      };
      paymentMethod = labels[method] || "Outro método";
    }

    return { success: true };
  },

  getPaymentMethod: async (refreshToken: string) => {
    const accessToken = await PaymentsApi.getNewAccessToken(refreshToken);
    const userRes = await fetch("/api/users/me/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });


    if (!userRes.ok) {
      const err = await userRes.json();
      throw new Error(err.message || "Erro ao buscar método de pagamento");
    }

    const user = await userRes.json();
    return user.payment_method_display;
  },

  updateDueDate: async (auth: string, newDueDate: string) => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    if (!newDueDate) throw new Error("Data inválida");
    await delay();
    const responseCode = 200;

    if (responseCode === 200) {
      dueDate = newDueDate;
      return { success: true };
    } else {
      throw new Error("Erro ao atualizar data de due");
    }
  },

  getDueDate: async (refreshToken: string) => {
    const accessToken = await PaymentsApi.getNewAccessToken(refreshToken);

    const res = await fetch("/api/users/me/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao buscar data de vencimento");
    }

    const user = await res.json();
    return user.due_day;
  },

  getNewAccessToken: async (refreshToken: string): Promise<string> => {
    const res = await fetch("/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"refresh": refreshToken}),
    });

    console.log(JSON.stringify({"refresh": refreshToken}));

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao renovar token");
    }

    const data = await res.json();
    console.log(data);
    return data.access;
  },
};

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));