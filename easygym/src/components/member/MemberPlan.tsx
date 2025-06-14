import { useTheme, useMediaQuery } from "@mui/material";
import { Button, Icon, PlanList, PlanListItem, PlansSection } from "../../styles/HomeStyle";
import { InfoIcon, Container, Frequency, Title } from "../../styles/manager-styles/DashboardStyle";
import { Plan, PlanContainer, PlanText } from "../../styles/member-styles/MemberPlanStyles";
import Notification from "../painel/Notification";
import ok from "../../assets/img/home-assets/green-ok.png";

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
        <Frequency>
          <InfoIcon fontSize="large" />
          <Title>Meu Plano</Title>
        </Frequency>

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
              <Title style={{ textAlign: "center" }}>Plano TotalFit</Title>
              <PlanText>12 meses de fidelidade</PlanText>
              <PlanText>Período de 31/10/2024 à 31/10/2025</PlanText>
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
              <PlanListItem>
                <Icon src={ok} /> Acesso à sauna e spa
              </PlanListItem>
              <PlanListItem>
                <Icon src={ok} /> Consultas com Nutricionista
              </PlanListItem>
              <PlanListItem>
                <Icon src={ok} /> Personal Trainer
              </PlanListItem>
              <PlanListItem>
                <Icon src={ok} /> Área de musculação e cardio
              </PlanListItem>
            </PlanList>
          </Plan>
        </PlanContainer>
      </Container>

      <div style={{ width: isMobile ? "100%" : "300px" }}>
        <Notification />
      </div>
    </div>
  );
};

export default MemberPlan;
