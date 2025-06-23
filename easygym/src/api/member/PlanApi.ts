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
          plan.startDate = subscription.start_date;
          plan.subscription_id = subscription.id
          return plan;
        }
      }
    }

    return null;
  },

  setUserPlan: async (refreshToken: string, plan: Plan) => {
    const accessToken = await PlansApi.getNewAccessToken(refreshToken);
    const res = await fetch("https://gym.mestracegonhas.com/api/subscriptions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({"plan": plan.id}),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao assinar plano");
    }

    const resp = await res.json();
    return resp;
  },
  
  getLoyalty: async (refreshToken: string, subscription_id: string) => {
    const accessToken = await PlansApi.getNewAccessToken(refreshToken);
    const res = await fetch("https://gym.mestracegonhas.com/api/check-loyalty/?subscription_id=" + subscription_id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Erro ao buscar usuário");
    }

    const loyalty = await res.json();
    if(loyalty.in_loyalty_period){
      return loyalty;
    }else{
      return null;
    }
  },

  cancelPenaltyPlan: async (refreshToken: string, plan: Plan) => {
    const accessToken = await PlansApi.getNewAccessToken(refreshToken);
    const res = await fetch("https://gym.mestracegonhas.com/api/subscriptions/" + plan.subscription_id + "/cancel_with_penalty/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao cancelar plano");
    }

    const resp = await res.json();
    return resp;
  },

  cancelNormalPlan: async (refreshToken: string, plan: Plan) => {
    const accessToken = await PlansApi.getNewAccessToken(refreshToken);
    const res = await fetch("https://gym.mestracegonhas.com/api/subscriptions/" + plan.subscription_id + "/cancel_subscription/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao cancelar plano");
    }

    const resp = await res.json();
    return resp;
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
  subscription_id?: string;
}

interface Feature {
  name: string;
  available: string;
}