import {
  Title, PlansSection, PlanCard, PlanList, PlanListItem, Icon, Button, Descricao
} from "../../styles/PlansStyle";
import ok from "../../assets/img/home-assets/green-ok.png";
import x from "../../assets/img/home-assets/red-x.png";
import { useState } from "react";

import { useTheme, useMediaQuery } from "@mui/material";

interface Feature {
    name: String;
    value: Boolean;
}

interface Plan {
    id: number;
    title: String;
    description: String;
    value: number;
    features: Feature [];
    fidelity: String;
}

export const plans: Plan[] = [
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
    fidelity: "12 meses de fidelidade"
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
  },
];

const Plans = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedPlan, setSelectedPlan] = useState<Plan>();
    
    const handleSelect = (plan: Plan) => {
        setSelectedPlan(plan);
        window.location.href='/login'
    };

    return (
        <PlansSection id="plans" style={{ flexDirection: isMobile ? "column" : "row", padding: isMobile ? "20px" : "20px 200px" }}>
            {plans.map((plan) => (
            <PlanCard key={plan.id}>
                <div>
                <Title>Plano {plan.title}</Title><br />
                <Descricao>{plan.description}</Descricao>
                </div>
                <div>
                <PlanList>
                    {plan.features.map((feature, idx) => (
                    <PlanListItem key={idx}>
                        <Icon src={feature.value ? ok : x} /> {feature.name}
                    </PlanListItem>
                    ))}
                </PlanList>
                <hr style={{ marginBottom: "10px", borderColor: "#898989" }} />
                <center><p style={{ color: "#fff", marginBottom: 10, fontSize: 14 }}>A partir de R$ {plan.value}</p></center>
                <center><p style={{ color: "#ccc", marginBottom: 10, fontSize: 12, fontStyle: "italic" }}>{plan.fidelity}</p></center>
                <Button onClick={() => handleSelect(plan)}>Quero Esse</Button>
                </div>
            </PlanCard>
            ))}
        </PlansSection>
    )
}

export default Plans;