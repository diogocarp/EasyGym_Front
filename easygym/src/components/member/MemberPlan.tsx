import { Button, Icon, PlanList, PlanListItem, PlansSection } from "../../styles/HomeStyle";
import { AlertIcon, Container, Frequency, Title } from "../../styles/manager-styles/DashboardStyle";
import { Plan, PlanContainer, PlanText } from "../../styles/member-styles/PlansStyles";
import ok from "../../assets/img/home-assets/green-ok.png"
import Notification from "../painel/Notification";

const MemberPlan = () => {
    return (
        <div style={{display:"flex"}}>
        <Container style={{ width: "30%" }}>
        </Container>
        <Container style={{ width: "90%" }}>
            <Frequency>
                <AlertIcon fontSize="large" /><Title>Meu Plano</Title>
            </Frequency>
            <PlanContainer>
                <PlansSection>
                <Plan>
                    <Title style={{textAlign:"center"}}>Plano TotalFit</Title>
                    <PlanText>12 meses de fidelidade</PlanText>
                    <PlanText>Período de 31/10/2024 à 31/10/2025</PlanText>
                    <Button style={{marginTop:"10px"}}>Alterar Plano</Button>
                    <Button style={{marginTop:"10px"}}>Cancelar Plano</Button>           
                </Plan>
                </PlansSection>
                <Plan style={{float:"right", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <PlanList >
                        <PlanListItem>
                            <Icon src={ok} /> Acesso à sauna e spa
                        </PlanListItem>
                        <PlanListItem>
                            <Icon src={ok} /> Consultas com Nutricionista
                        </PlanListItem>
                        <PlanListItem>
                            <Icon src={ok} />  Personal Trainer
                        </PlanListItem>
                        <PlanListItem>
                            <Icon src={ok} />  Área de musculação e cardio
                        </PlanListItem>

                    </PlanList>
                </Plan>
            </PlanContainer>
        </Container>
        <Notification/>
        </div>
    )
}

export default MemberPlan;