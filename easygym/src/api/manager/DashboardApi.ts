export type DashboardData = {
  frequency: {
    active: number;
    lazy: number;
  };
  memberships: {
    enrolled: number;
    canceled: number;
  };
  financial: {
    awaitingPayment: number;
    defaulters: number;
    payers: number;
  };
};

const fetchWithAuth = async (url: string, token: string): Promise<any> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Erro ao buscar dados do dashboard.");
  }


  return response.json();
};

export const DashboardApi = {

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
    return data.access;
  },

  getMetrics: async (
    auth: string,
    start_date?: string,
    end_date?: string
  ): Promise<DashboardData> => {
    if (!auth) throw new Error("Token ausente.");

    const accessToken = await DashboardApi.getNewAccessToken(auth);
    
    const params = new URLSearchParams();
    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);

    const [frequency, memberships, financial] = await Promise.all([
      fetchWithAuth(`/api/statistics/active-subscriptions/?${params.toString()}`, accessToken),
      fetchWithAuth(`/api/statistics/enrolled-members/?${params.toString()}`, accessToken),
      fetchWithAuth(`/api/statistics/financial/?${params.toString()}`, accessToken)
    ]);

    return {
      frequency: {
        active: frequency.data.active,
        lazy: frequency.data.canceled
      },
      memberships: {
        enrolled: memberships.data.total_active_members,
        canceled: memberships.data.members_with_active_subscription
      },
      financial: {
        awaitingPayment: financial.data.pending.count,
        defaulters: financial.data.overdue.count,
        payers: financial.data.paid.count
      }
    };
  }
};
