import {
  Title, PlansSection, PlanCard, PlanList, PlanListItem, Icon, Button, Descricao
} from "../../styles/PlansStyle";
import ok from "../../assets/img/home-assets/green-ok.png";
import x from "../../assets/img/home-assets/red-x.png";
import { useEffect, useState } from "react";

import { useTheme, useMediaQuery } from "@mui/material";
import { Plan, PlansApi } from "../../api/manager/PlansApi";

import { toast } from "react-toastify";

const Plans = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedPlan, setSelectedPlan] = useState<Plan>();
    const [plans, setPlans] = useState<Plan[]>([]);
    
    const handleSelect = (plan: Plan) => {
        setSelectedPlan(plan);
        console.log(selectedPlan)
        window.location.href='/login'
    };
    
    useEffect(() => {
      (async () => {
        try {
          const data = await PlansApi.getPlans();
          setPlans(data);
        } catch (err: any) {
          showToast(err.message || "Erro ao carregar planos", "error");
        }
      })();
    }, []);
    
    const showToast = (
      message: string,
      type: 'success' | 'error' | 'info',
      duration = 3000
    ) => {
      toast[type](message, {
        position: "bottom-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: type !== 'info',
        draggable: true,
        style: { backgroundColor: "#444", color: "white" },
      });
    };

    return (
        <PlansSection id="plans" style={{ flexDirection: isMobile ? "column" : "row", padding: isMobile ? "20px" : "20px 200px" }}>
            {plans.map((plan) => (
              <PlanCard key={plan.id}>
                <div>
                  <Title>Plano {plan.name}</Title><br />
                  <Descricao>{plan.description}</Descricao>
                </div>
                <div>
                  <PlanList>
                    {plan.features.map((feature, idx) => (
                      <PlanListItem key={idx}>
                        <Icon src={feature.available ? ok : x} /> {feature.name}
                      </PlanListItem>
                    ))}
                  </PlanList>
                  <hr style={{ marginBottom: "10px", borderColor: "#898989" }} />
                  <center><p style={{ color: "#fff", marginBottom: 10, fontSize: 14 }}>R$ {plan.price} por mês</p></center>
                  <center><p style={{ color: "#ccc", marginBottom: 10, fontSize: 12, fontStyle: "italic" }}>{plan.duration_months != 0 ? `${plan.duration_months} meses de fidelidade` : "Sem fidelidade" } </p></center>
                  <Button onClick={() => handleSelect(plan)}>Quero Esse</Button>
                </div>
              </PlanCard>
            ))}
        </PlansSection>
    )
}

export default Plans;