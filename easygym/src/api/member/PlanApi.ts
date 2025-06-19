let userSelectedPlanJson = "";

const plans = [
  {
    id: 1,
    title: "TotalFit",
    description: "Treine na unidade com diversos beneficios únicos e atendimento customizado",
    value: 129.99,
    features: [
      { name: "Acesso à sauna e spa", value: true },
      { name: "Consultas com Nutricionista", value: true },
      { name: "Personal Trainer", value: true },
      { name: "Área de musculação e cardio", value: true },
    ],
    fidelity: "12 meses de fidelidade",
    startDate: "01/01/2025",
    endDate: "31/12/2025"
  },
  {
    id: 2,
    title: "Essencial",
    description: "Nosso plano mais econômico para você se exercitar quando quiser, com auxílio do nosso personal trainer",
    value: 89.99,
    features: [
      { name: "Acesso à sauna e spa", value: false },
      { name: "Consultas com Nutricionista", value: false },
      { name: "Personal Trainer", value: true },
      { name: "Área de musculação e cardio", value: true },
    ],
    fidelity: "12 meses de fidelidade"
  },
  {
    id: 3,
    title: "Livre",
    description: "Nosso plano mensal para você que não quer se comprometer, mas quer treinar em uma academia de alto padrão",
    value: 109.99,
    features: [
      { name: "Acesso à sauna e spa", value: false },
      { name: "Consultas com Nutricionista", value: false },
      { name: "Personal Trainer", value: false },
      { name: "Área de musculação e cardio", value: true },
    ],
    fidelity: "Sem fidelidade"
  }
];

export const PlansApi = {
  getPlans: async () => {
    await delay();
    return plans;
  },

  getUserPlan: async (auth: string) => {
    await delay();
    if (!auth) throw new Error("Unauthorized");
    return userSelectedPlanJson ? JSON.parse(userSelectedPlanJson) : null;
  },

  setUserPlan: async (auth: string, plan: Plan) => {
    await delay();
    if (!auth) throw new Error("Unauthorized");
    userSelectedPlanJson = JSON.stringify(plan);
    return { success: true };
  },

  cancelPlan: async (auth: string) => {
    await delay();
    if (!auth) throw new Error("Unauthorized");
    userSelectedPlanJson = "";
    return { success: true };
  }
};

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export interface Plan {
  id: number;
  title: string;
  description: string;
  value: number;
  features: Feature[];
  fidelity: string;
  startDate?: string;
  endDate?: string;
}

interface Feature {
  name: string;
  value: boolean;
}
