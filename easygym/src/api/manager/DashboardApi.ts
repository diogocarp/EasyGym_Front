    
import { TOKEN } from "../Token";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export type DashboardData = {
  frequency: {
    active: number;
    lazy : number;
  };
  memberships: {
    enrolled : number;
    canceled: number;
  };
  financial: {
    awaitingPayment: number;
    defaulters: number;
    noncompliant: number;
  };
};

export const DashboardApi = {
  getMetrics: async (auth: string): Promise<DashboardData> => {
    if (auth !== TOKEN) throw new Error("Unauthorized");

    await delay();

    return {
      frequency: {
        active: 35,
        lazy: 17,
      },
      memberships: {
        enrolled: 52,
        canceled: 5,
      },
      financial: {
        awaitingPayment: 20,
        defaulters: 4,
        noncompliant: 28,
      },
    };
  }
};
