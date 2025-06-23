// Simula armazenamento dos dados
let paymentList = [
  { month: "Maio 2025", due: "10/05/2025", value: "R$ 89,99", status: "Pago" },
  { month: "Junho 2025", due: "10/06/2025", value: "R$ 89,99", status: "Pago" },
  { month: "Julho 2025", due: "10/07/2025", value: "R$ 89,99", status: "Aguardando Pagamento" },
  { month: "Agosto 2025", due: "10/08/2025", value: "R$ 89,99", status: "A vencer" },
];

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
    refreshToken: string,
    method: string,
    cardData?: {
      name: string;
      number: string;
      expiry: string;
      cvv: string;
      address: string;
    }
  ) => {
    if (!method) throw new Error("Forma de pagamento inválida");

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
    }

    const accessToken = await PaymentsApi.getNewAccessToken(refreshToken);
    const response = await fetch("api/users/payment/method/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(
        { 
          "method": method,
          cardData
        }
      )
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Erro ao atualizar método de pagamento");
    }

    return await response.json();
  },

  getPaymentMethod: async (refreshToken: string) => {
    const accessToken = await PaymentsApi.getNewAccessToken(refreshToken);
    const userRes = await fetch("api/users/payment/method/", {
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

    if(user.body.length > 0){
      return user.body[0].method;
    }else{
      return "Não cadastrado"
    }
    
  },

  updateDueDate: async (refreshToken: string, newDueDate: string) => {
    const accessToken = await PaymentsApi.getNewAccessToken(refreshToken);
    const response = await fetch("api/users/payment/duedate/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ "dueDate": newDueDate })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Erro ao atualizar data de vencimento");
    }

    return await response.json();
  },

  getDueDate: async (refreshToken: string) => {
    const accessToken = await PaymentsApi.getNewAccessToken(refreshToken);
    const userRes = await fetch("api/users/payment/duedate/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });


    if (!userRes.ok) {
      const err = await userRes.json();
      throw new Error(err.message || "Erro ao buscar data de vencimento");
    }

    const user = await userRes.json();

    if(user.body.length > 0){
      return user.body[0].dueDate;
    }else{
      return "6"
    }
  },

  getNewAccessToken: async (refreshToken: string): Promise<string> => {
    const res = await fetch("/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"refresh": refreshToken}),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao renovar token");
    }

    const data = await res.json();
    return data.access;
  },
};

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));