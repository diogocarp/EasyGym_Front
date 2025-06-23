// Simula armazenamento dos dados

export const PaymentsApi = {
  getPayments: async (refreshToken: string) => {
    const userId = await PaymentsApi.getUserId(refreshToken);

    var accessToken = await PaymentsApi.getNewAccessToken(refreshToken);
    const userRes = await fetch("https://gym.mestracegonhas.com/api/payments/?ordering=due_date&member_id=" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userRes.ok) {
      const err = await userRes.json();
      throw new Error(err.message || "Erro ao buscar assinatura do usuário");
    }

    const paymentList = await userRes.json();
    return paymentList;
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
    const response = await fetch("https://gym.mestracegonhas.com/api/users/payment/method/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  sendEmail: async (refreshToken: string, id: number) => {
    const accessToken = await PaymentsApi.getNewAccessToken(refreshToken);
    const response = await fetch("https://gym.mestracegonhas.com/api/payments/email/" + id + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Erro enviar email");
    }

    return await response.json();
  },

  getPaymentMethod: async (refreshToken: string) => {
    const accessToken = await PaymentsApi.getNewAccessToken(refreshToken);
    const userRes = await fetch("https://gym.mestracegonhas.com/api/users/payment/method/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch("https://gym.mestracegonhas.com/api/users/payment/duedate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    const userRes = await fetch("https://gym.mestracegonhas.com/api/users/payment/duedate/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

  getUserId: async (refreshToken: string) => {
    const accessToken = await PaymentsApi.getNewAccessToken(refreshToken);
    const res = await fetch("https://gym.mestracegonhas.com/api/users/me/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Erro ao buscar usuário");
    }

    const user = await res.json();
    const { id } = user;
    return id;
  },

  getNewAccessToken: async (refreshToken: string): Promise<string> => {
    const res = await fetch("https://gym.mestracegonhas.com/api/token/refresh/", {
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