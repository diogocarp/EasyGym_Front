import { TOKEN } from "../Token";

export interface Feature {
  name: string;
  value: boolean;
}

export interface Plan {
  id: number;
  title: string;
  description: string;
  value: number;
  features: Feature[];
  fidelity: string;
}

let plans: Plan[] = [
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
  },
  {
    id: 2,
    title: "Essencial",
    description: "Nosso plano mais economico para você se exercitar quando quiser, com auxilio do nosso personal trainer",
    value: 89.99,
    features: [
      { name: "Acesso à sauna e spa", value: false },
      { name: "Consultas com Nutricionista", value: false },
      { name: "Personal Trainer", value: true },
      { name: "Área de musculação e cardio", value: true },
    ],
    fidelity: "12 meses de fidelidade",
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
    fidelity: "Sem fidelidade",
  },
];

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const PlansApi = {
  getPlans: async (auth: string): Promise<Plan[]> => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    await delay();
    return plans;
  },

  updatePlanValue: async (auth: string, id: number, newValue: number): Promise<Plan> => {
    if (auth !== TOKEN) throw new Error("Unauthorized");
    await delay();

    const index = plans.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Plano não encontrado");

    plans[index].value = newValue;
    return plans[index];
  },
};


