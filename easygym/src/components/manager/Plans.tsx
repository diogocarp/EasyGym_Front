import { useEffect, useState } from "react";
import { Frequency, GymIcon, Title, PlansSection,
  PlanCard, PlanList, PlanListItem, Icon, Button, Descricao, InputMasked, InputContainer
} from "../../styles/manager-styles/PlansStyle";
import ok from "../../assets/img/home-assets/green-ok.png";
import x from "../../assets/img/home-assets/red-x.png";
import { useTheme, useMediaQuery } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import { PlansApi } from "../../api/manager/PlansApi";
import { TOKEN } from "../../api/Token";

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


const Plans = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [plans, setPlans] = useState<Plan[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [newValue, setNewValue] = useState("");

 const handleEditClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setNewValue(plan.value.toFixed(2));
    setOpen(true);
  };

useEffect(() => {
  (async () => {
    try {
      const data = await PlansApi.getPlans(TOKEN);
      setPlans(data);
    } catch (err: any) {
      toast.error(err.message || "Erro ao carregar planos");
    }
  })();
}, []);

const handleSave = async () => {
  try {
    if (!selectedPlan) return;

    const updated = await PlansApi.updatePlanValue(TOKEN, selectedPlan.id, parseFloat(newValue.replace(',', '.')));
    const updatedList = plans.map(p => p.id === updated.id ? updated : p);
    setPlans(updatedList);
    setOpen(false);
    toast.success("Valor atualizado com sucesso!");
  } catch (err: any) {
    toast.error(err.message || "Erro ao salvar alteração");
  }
};

  return (
    <div>
      <Frequency>
        <GymIcon fontSize="large" />
        <Title style={{ paddingLeft: "10px" }}>Planos</Title>
      </Frequency>
      <PlansSection id="plans" style={{ flexDirection: isMobile ? "column" : "row" }}>
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
              <center><p style={{ color: "#fff", marginBottom: 10, fontSize: 14 }}>R$ {plan.value} por mês</p></center>
              <center><p style={{ color: "#ccc", marginBottom: 10, fontSize: 12, fontStyle: "italic" }}>{plan.fidelity}</p></center>
              <Button onClick={() => handleEditClick(plan)}>Editar</Button>
            </div>
          </PlanCard>
        ))}
      </PlansSection>

      <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: '#333',
                boxShadow: 24, p: 4,
                borderRadius: "8px",
                width: "400px"
            }}>
                <h3 style={{ color: "white" }}>Editar valor mensal do plano</h3>
                <br></br>
                <InputContainer style={{ flexGrow: "1" }}>
                <AttachMoney fontSize="small" style={{ color: "white", marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                <InputMasked
                    style={{ paddingLeft: "45px" }}
                    mask={Number}
                    scale={2}
                    thousandsSeparator="."
                    padFractionalZeros= {true}
                    normalizeZeros= {true}
                    unmask={true}
                    value={newValue}
                    onAccept={(value) => setNewValue(value)}
                    placeholder="Digite o novo valor"
                >
                </InputMasked>
                </InputContainer>
                <p style={{ fontSize: "12px", fontStyle: "italic", color: "#ccc", marginTop: "8px" }}>
                A alteração de valor fará efeito em novas assinaturas, ou em assinaturas sem fidelidade.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <Button onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar</Button>
                </div>
            </Box>
        </Modal>
    </div>
  );
};

export default Plans;
