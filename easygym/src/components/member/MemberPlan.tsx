import { useTheme, useMediaQuery } from "@mui/material";
import { 
  Plan, 
  PlanContainer, 
  PlanText, 
  InfoIcon, 
  Container, 
  TitleBox, 
  Title, 
  Button, 
  Icon, 
  PlanList, 
  PlanListItem, 
  PlansSection 
} from "../../styles/member-styles/MemberPlanStyles";
import ok from "../../assets/img/home-assets/green-ok.png";
import x from "../../assets/img/home-assets/red-x.png";

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
    startDate: String;
    endDate: String;
}

export const plan: Plan =
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
  };

const MemberPlan = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(900)); 

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "flex-start",
        gap: "20px",
      }}
    >
      <Container style={{ width: "100%" }}>
        <TitleBox>
          <InfoIcon fontSize="large" />
          <Title>Meu Plano</Title>
        </TitleBox>

        <PlanContainer>
          <PlansSection style={{ flex: 1 }}>
            <Plan
              style={{
                display: isMobile ? "flex" : "grid",
                flexDirection: isMobile ? "column" : undefined,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Title style={{ textAlign: "center" }}>Plano {plan.title}</Title>
              <PlanText>{plan.fidelity}</PlanText>
              <PlanText>Período de {plan.startDate} à {plan.endDate}</PlanText>
              <Button style={{ marginTop: "10px", alignSelf: "center" }}>
                Cancelar Plano
              </Button>
            </Plan>
          </PlansSection>

          <Plan
            style={{
              flex: 1,
              display: isMobile ? "flex" : "grid",
              flexDirection: isMobile ? "column" : undefined,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlanList>
              {plan.features.map((feature, idx) => (
                <PlanListItem key={idx}>
                    <Icon src={feature.value ? ok : x} /> {feature.name}
                </PlanListItem>
                ))}
            </PlanList>
          </Plan>
        </PlanContainer>
      </Container>
    </div>
  );
};

export default MemberPlan;
