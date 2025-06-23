import { useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
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
  PlansSection,
  PlanCard,
  Descricao
} from "../../styles/member-styles/MemberPlanStyles";
import ok from "../../assets/img/home-assets/green-ok.png";
import x from "../../assets/img/home-assets/red-x.png";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';

//API
import { PlansApi } from '../../api/member/PlanApi';
import Cookies from 'js-cookie';

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  features: Feature[];
  duration_months: number;
  startDate?: string;
  endDate?: string;
  subscription_id?: string;
}

interface Feature {
  name: string;
  available: string;
}

const MemberPlan = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(900));
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [preSelectedPlan, setPreSelectedPlan] = useState<Plan | null>(null);
  const [confirmSelectionModal, setConfirmSelectionModal] = useState(false);
  const [agreeWithTerms, setAgreeWithTerms] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [isConvinceModal, setIsConvinceModal] = useState(false);
  const [agreeWithCancelTerms, setAgreeWithCancelTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loyalty, setLoyalty] = useState<{in_loyalty_period:string, loyalty_end_date: string, remaining_days: number, penalty_value: number} | null>(null);

  const refreshToken = Cookies.get("refreshToken") || sessionStorage.getItem("refreshToken") || "";

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const fetchedPlans = await PlansApi.getPlans();
        setPlans(fetchedPlans);
        
        const plan = await PlansApi.getUserPlan(refreshToken);
        setSelectedPlan(plan);
        
        if(plan){
          const loyalty = await PlansApi.getLoyalty(refreshToken, plan? plan.id.toString() : "0");
          setLoyalty(loyalty);  
        }
      } catch (e) {
        showToast("Erro ao carregar planos.", "error");
      }
      setIsLoading(false);
    };

    fetchPlans();
  }, []);

  const handleSelect = (plan: Plan) => {
    setPreSelectedPlan(plan);
    setConfirmSelectionModal(true);
  };

  const getModalStyle = () => {
    return {
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: '#333', boxShadow: 24, p: 4,
      borderRadius: isMobile? "0px" : "8px", 
      maxWidth: "600px",
      width: "100%",
      maxHeight: "100%",
      height: isMobile? "100%" : "auto",
      padding: isMobile? "15px" : "32px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    };
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info', duration = 3000) => {
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

  const confirmPlanSelection = async () => {
    if (!agreeWithTerms || !preSelectedPlan) {
      showToast("Por favor, aceite os termos para continuar.", "error");
      return;
    }

    try {
      await PlansApi.setUserPlan(refreshToken, preSelectedPlan);
      const plan = await PlansApi.getUserPlan(refreshToken);
      setSelectedPlan(plan);
        
      if(plan){
        const loyalty = await PlansApi.getLoyalty(refreshToken, plan? plan.id.toString() : "0");
        setLoyalty(loyalty);  
      }
      showToast("Plano contratado com sucesso!", "success");
    } catch (err: any) {
      showToast(err.message || "Erro ao contratar plano", "error");
    } finally {
      setConfirmSelectionModal(false);
      setAgreeWithTerms(false);
    }
  };

  const handleCancel = async () => {
    if(loyalty?.in_loyalty_period){
      setOpenConfirmModal(true);
    }else{
      setIsConvinceModal(true);
    }
  };

  const handleConfirmCancelNormal = async () => {
    if (!selectedPlan) return;
    if (!agreeWithCancelTerms && openConfirmModal) {
      showToast("Por favor, confirme o cancelamento antes de prosseguir...", "error");
      return;
    }

    try {
      await PlansApi.cancelNormalPlan(refreshToken, selectedPlan);
      setSelectedPlan(null);
      showToast("Plano cancelado com sucesso.", "success");
    } catch (err: any) {
      showToast(err.message || "Erro ao cancelar plano", "error");
    } finally {
      setAgreeWithCancelTerms(false);
      setOpenConfirmModal(false);
      setIsConvinceModal(false);
    }
  };

  const handleConfirmCancelPenalty = async () => {
    if (!selectedPlan) return;
    if (!agreeWithCancelTerms && openConfirmModal) {
      showToast("Por favor, confirme o cancelamento antes de prosseguir...", "error");
      return;
    }

    try {
      await PlansApi.cancelPenaltyPlan(refreshToken, selectedPlan);
      setSelectedPlan(null);
      showToast("Plano cancelado com sucesso.", "success");
    } catch (err: any) {
      showToast(err.message || "Erro ao cancelar plano", "error");
    } finally {
      setAgreeWithCancelTerms(false);
      setOpenConfirmModal(false);
      setIsConvinceModal(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "20px" }}>
      <Container style={{ width: "100%" }}>
        <TitleBox>
          <InfoIcon fontSize="large" />
          <Title style={{paddingLeft: "10px"}}>Meu Plano</Title>
        </TitleBox>

        {isLoading && (
          <PlansSection style={{ flexDirection: isMobile ? "column" : "row" }}>
              <PlanCard>
                <div>
                  <Descricao>Carregando...</Descricao>
                </div>
              </PlanCard>
          </PlansSection>
        )}

        {!selectedPlan && !isLoading && (
          <PlansSection style={{ flexDirection: isMobile ? "column" : "row" }}>
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
                  <center><p style={{ color: "#ccc", marginBottom: 10, fontSize: 12, fontStyle: "italic" }}>{plan.duration_months == 0 ? "Sem fidelidade" : plan.duration_months + " meses de fidelidade"}</p></center>
                  <Button onClick={() => handleSelect(plan)}>Quero Esse</Button>
                </div>
              </PlanCard>
            ))}
          </PlansSection>
        )}

        {selectedPlan && !isLoading && !confirmSelectionModal && (
          <PlanContainer>
            <PlansSection style={{ flex: 1, paddingTop: isMobile? "15px" : "0px" }}>
              <Plan
                style={{
                  display: isMobile ? "flex" : "grid",
                  flexDirection: isMobile ? "column" : undefined,
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Title style={{ textAlign: "center" }}>Plano {selectedPlan.name}</Title>
                <PlanText>{selectedPlan.duration_months == 0 ? "Sem fidelidade" : selectedPlan.duration_months + " meses de fidelidade"}</PlanText>
                {selectedPlan.startDate && loyalty?.loyalty_end_date && (
                  <PlanText>
                    Período de {new Date(selectedPlan.startDate).toLocaleDateString('pt-BR')} à {new Date(loyalty.loyalty_end_date).toLocaleDateString('pt-BR')}
                  </PlanText>
                )}
                <Button style={{ marginTop: "10px", alignSelf: "center" }} onClick={handleCancel}>
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
                {selectedPlan.features?.map((feature, idx) => (
                  <PlanListItem key={idx}>
                    <Icon src={feature.available ? ok : x} /> {feature.name}
                  </PlanListItem>
                ))}
              </PlanList>
            </Plan>
          </PlanContainer>
        )}
      </Container>

      {/* Modal com fidelidade */}
      <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
        <Box sx={getModalStyle}>
          <center><h3 style={{ color: "white" }}>Você está em um plano com fidelidade até {loyalty && new Date(loyalty.loyalty_end_date).toLocaleDateString('pt-BR')}. Tem certeza que deseja cancelar?</h3></center>
          <br/>
          <center><p style={{ color: "#fff", marginBottom: 10, fontSize: 14 }}>Ao confirmar, será aplicada uma multa de {loyalty && loyalty.penalty_value}, referente a porcentagem das mensalidades restantes.</p></center>
          <br/>
          <label style={{ display: "flex", color: "white", alignItems: "center", fontSize: 13 }}>
            <input
              type="checkbox"
              checked={agreeWithCancelTerms}
              onChange={() => setAgreeWithCancelTerms(!agreeWithCancelTerms)}
              style={{ marginRight: "10px" }}
            />
            <span style={{textAlign: "left"}}>Sim, estou ciente da multa de {loyalty && loyalty.penalty_value} e desejo prosseguir com o cancelamento.</span>
          </label>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={handleConfirmCancelPenalty}>Confirmar</Button>
            <Button onClick={() => setOpenConfirmModal(false)}>Cancelar</Button>
          </div>
        </Box>
      </Modal>

      {/* Modal sem fidelidade (convencimento) */}
      <Modal open={isConvinceModal} onClose={() => setIsConvinceModal(false)}>
        <Box sx={getModalStyle}>
          <center><h3 style={{ color: "white" }}>Tem certeza que deseja cancelar seu plano?</h3></center>
          <br/>
          <p style={{ color: "#ccc", fontSize: 14, textAlign: "center" }}>
            Você ainda pode aproveitar todos os benefícios! Estamos sempre evoluindo para te oferecer a melhor experiência. Que tal continuar com a gente?
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
            <Button onClick={handleConfirmCancelNormal}>Sim, quero cancelar</Button>
            <Button onClick={() => setIsConvinceModal(false)}>Vou continuar</Button>
          </div>
        </Box>
      </Modal>

      <Modal open={confirmSelectionModal} onClose={() => setConfirmSelectionModal(false)}>
        <Box sx={getModalStyle}>
          <h4 style={{ color: "white", textAlign: "center" }}>Ótima escolha! Gostaria de prosseguir com a contratação do plano abaixo?</h4>
          {preSelectedPlan && (
            <PlanCard style={{ marginTop: 20, background: "#434343", paddingBottom: "10px", padding: isMobile? "15px" : "20px" }}>
              <div>
                <Title>Plano {preSelectedPlan.name}</Title>
                <br/>
                <Descricao>{preSelectedPlan.description}</Descricao>
                <PlanList>
                  {preSelectedPlan.features?.map((feature, idx) => (
                    <PlanListItem style={{marginTop: isMobile? "10px" : "15px", marginBottom: isMobile? "10px" : "15px"}} key={idx}>
                      <Icon src={feature.available ? ok : x} /> {feature.name}
                    </PlanListItem>
                  ))}
                </PlanList>
                <hr style={{ marginBottom: "10px", borderColor: "#898989" }} />
                <p style={{ color: "#fff", marginTop: 10 }}>R$ {preSelectedPlan.price} por mês</p>
                <p style={{ color: "#ccc", fontSize: 12 }}>{preSelectedPlan.duration_months == 0 ? "Sem fidelidade" : preSelectedPlan.duration_months + " meses de fidelidade"}</p>
              </div>
            </PlanCard>
          )}
          <label style={{ display: "flex", color: "white", marginTop: 20, fontSize: 13 }}>
            <input
              type="checkbox"
              checked={agreeWithTerms}
              onChange={() => setAgreeWithTerms(!agreeWithTerms)}
              style={{ marginRight: 10 }}
            />
            <span style={{textAlign: "left"}}>Sim, li os <span style={{color: "#09f", textDecoration: "underline", cursor: "pointer"}} onClick={() => window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank")}>termos e condições</span> e concordo com a contratação desse plano</span>
          </label>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={confirmPlanSelection}>Assinar</Button>
            <Button onClick={() => setConfirmSelectionModal(false)}>Cancelar</Button>
          </div>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default MemberPlan;
