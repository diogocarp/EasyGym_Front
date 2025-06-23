export interface Feature {
  name: string;
  available: boolean;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  features: Feature[];
  duration_months: number;
  loyalty_months:number;
}

export const PlansApi = {

getNewAccessToken: async (refreshToken: string): Promise<string> => {
    const res = await fetch("https://gym.mestracegonhas.com/api/token/refresh/", {
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
    return data.access;
  },

  getPlans: async (): Promise<Plan[]> => {

    const response = await fetch("https://gym.mestracegonhas.com/api/plans/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao carregar planos.");
    }

    const rawPlans = await response.json();

    return rawPlans.map((raw: Plan): Plan => ({
      id: raw.id,
      name: raw.name,
      description: raw.description,
      price: raw.price,
      features: raw.features,
      duration_months: raw.duration_months,
      loyalty_months: raw.loyalty_months
    }));
  },

    updatePlanValue: async (auth: string, id: number, newValue: number): Promise<Plan> => {

    const accessToken = await PlansApi.getNewAccessToken(auth);

    const response = await fetch(`https://gym.mestracegonhas.com/api/plans/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ price: newValue.toFixed(2) })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao atualizar valor do plano.");
    }

    const updated = await response.json();

    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      price: updated.price,
      features: updated.features,
      duration_months: updated.duration_months,
      loyalty_months: updated.loyalty_months
    };
  }
};

