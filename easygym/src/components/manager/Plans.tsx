import { useState } from "react";
import {
  Container, Frequency, GymIcon, Title, PlansSection,
  PlanCard, PlanList, PlanListItem, Icon, Button, Descricao, InputMasked, InputContainer
} from "../../styles/manager-styles/PlansStyle";
import ok from "../../assets/img/home-assets/green-ok.png";
import x from "../../assets/img/home-assets/red-x.png";
import { useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>();
  const [newValue, setNewValue] = useState("");

  const handleEditClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setNewValue(plan.value.toFixed(2));
    setOpen(true);
  };

  const handleSave = () => {
    if (selectedPlan) {
      const index = plans.findIndex(p => p.id === selectedPlan.id);
      if (index !== -1) {
        plans[index].value = parseFloat(newValue.replace(',', '.'));
      }
    }
    setOpen(false);
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
              <center><p style={{ color: "#fff", marginBottom: 10, fontSize: 14 }}>A partir de R$ {plan.value}</p></center>
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
