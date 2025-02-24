import { Button, Icon, PlanCard, PlanList, PlanListItem, PlansSection, Title } from "../../styles/HomeStyle"
import { plans } from "../../pages/constants/HomeContants";
const Plans = () => {
    return (
        <PlansSection id="plans">
                {plans.map((plan) => (
                    <PlanCard key={plan.id}>
                        <Title>Plano {plan.title}</Title>
                        <PlanList>
                            <PlanListItem>
                                <Icon src={plan.advantages[0]} /> Acesso à sauna e spa
                            </PlanListItem>
                            <PlanListItem>
                                <Icon src={plan.advantages[1]} /> Consultas com Nutricionista
                            </PlanListItem>
                            <PlanListItem>
                                <Icon src={plan.advantages[2]} />  Personal Trainer
                            </PlanListItem>
                            <PlanListItem>
                                <Icon src={plan.advantages[3]} />  Área de musculação e cardio
                            </PlanListItem>
                            <center><p style={{ color: "#ccc", marginBottom: 10, fontSize: 12, fontStyle: "italic" }}>{plan.fidelity}</p></center>
                        </PlanList>
                        <Button>Quero esse!</Button>
                    </PlanCard>
                ))}
            </PlansSection>
    )
}

export default Plans;