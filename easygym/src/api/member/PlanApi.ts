export const PlansApi = {
  getPlans: async () => {
    const userRes = await fetch("https://gym.mestracegonhas.com/api/plans/?ordering=name", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!userRes.ok) {
      const err = await userRes.json();
      throw new Error(err.message || "Erro ao buscar planos");
    }

    const plans = await userRes.json();
    return plans;
  },

  getUserPlan: async (refreshToken: string) => {
    const userId = await PlansApi.getUserId(refreshToken);

    var accessToken = await PlansApi.getNewAccessToken(refreshToken);
    const userRes = await fetch("https://gym.mestracegonhas.com/api/subscriptions/?member_id=" + userId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userRes.ok) {
      const err = await userRes.json();
      throw new Error(err.message || "Erro ao buscar assinatura do usuário");
    }

    const subscriptions = await userRes.json();

    if (subscriptions.length > 0) {
      for (const subscription of subscriptions) {
        if (subscription.is_active) {
          const planRes = await fetch(`https://gym.mestracegonhas.com/api/plans/${subscription.plan}/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!planRes.ok) {
            const err = await planRes.json();
            throw new Error(err.message || "Erro ao buscar plano do usuário");
          }

          const plan = await planRes.json();
          return plan;
        }
      }
    }

    return null;
  },

  setUserPlan: async (auth: string, plan: Plan) => {
    await delay();
    if (!auth) throw new Error("Unauthorized");
    JSON.stringify(plan);
    return { success: true };
  },

  cancelPlan: async (auth: string) => {
    await delay();
    if (!auth) throw new Error("Unauthorized");
    return { success: true };
  },
  
  getUserId: async (refreshToken: string) => {
    const accessToken = await PlansApi.getNewAccessToken(refreshToken);
    const res = await fetch("https://gym.mestracegonhas.com/api/users/me/", {
      method: "GET",
      headers: {
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

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  features: Feature[];
  duration_months: number;
  startDate?: string;
  endDate?: string;
}

interface Feature {
  name: string;
  available: string;
}