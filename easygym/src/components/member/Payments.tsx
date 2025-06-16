import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  AlterButton,
  PaymentCard,
  PaymentInfo,
  PaymentLabel,
  SettingCard,
  SettingDescription,
  SettingsContainer,
  SettingTitle,
  Value,
  ValueDescription,
  Wrapper,
  Select,
  StatusDiv,
  Text,
  TitleCard,
  Container,
  MoneyIcon,
  Title,
  Input,
  InputContainer,
  PaymentsDiv,
  Tag,
  CustomMaskedInput
} from "../../styles/member-styles/PaymentStyles";
import { PaymentStatus } from "../../pages/constants/PaymentStatus";
import { toast, ToastContainer } from 'react-toastify';


// === VARIÁVEIS FIXAS ===
const VENCIMENTOS_FIXOS = ["5", "15", "27"];
const METODOS_PAGAMENTO = [
  { value: "credit", label: "Cartão de crédito" },
  { value: "boleto", label: "Boleto bancário" },
  { value: "pix", label: "Pix" },
];

const PAGAMENTOS = [
  { mes: "Maio 2025", vencimento: "10/05/2025", valor: "R$ 89,99", status: PaymentStatus.PAID },
  { mes: "Junho 2025", vencimento: "10/06/2025", valor: "R$ 89,99", status: PaymentStatus.PAID },
  { mes: "Julho 2025", vencimento: "10/07/2025", valor: "R$ 89,99", status: PaymentStatus.PENDING },
  { mes: "Agosto 2025", vencimento: "10/08/2025", valor: "R$ 89,99", status: PaymentStatus.UPCOMING },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#333",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  width: "400px",
  color: "white",
};

const Payments = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openDueDateModal, setOpenDueDateModal] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("15");
  const [paymentMethod, setPaymentMethod] = useState<string>("Cartão de crédito final 6613");

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    address: "",
  });

  const handleSavePaymentMethod = () => {
    if (selectedMethod === "") {
      toast.error("Por favor, selecione um meio de pagamento", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { backgroundColor: "#444", color: "white" }
      });
      return;
    }

    if (selectedMethod === "credit") {
      const camposObrigatorios = ["name", "number", "expiry", "cvv", "address"] as const;

      const camposVazios = camposObrigatorios.filter(campo => !cardData[campo].trim());

      if (camposVazios.length > 0) {
        toast.error("Preencha todos os campos do cartão de crédito", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { backgroundColor: "#444", color: "white" }
        });
        return;
      }

      setPaymentMethod(`Cartão de crédito final ${cardData.number.slice(-4)}`);
    } else {
      const metodoSelecionado = METODOS_PAGAMENTO.find(m => m.value === selectedMethod);
      setPaymentMethod(metodoSelecionado?.label || "");
    }

    setOpenPaymentModal(false);
  };

  const handleSaveDueDate = () => {
    setDueDate(dueDate);
    setOpenDueDateModal(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", width: "100%" }}>
      <Wrapper>
        <Container>
          <TitleCard>
            <MoneyIcon fontSize="large" />
            <Title>Pagamentos</Title>
          </TitleCard>

          <PaymentsDiv>
            {PAGAMENTOS.map((p, i) => (
              <PaymentCard key={i}>
                <PaymentInfo>
                  <div><strong>{p.mes}</strong></div>
                  <PaymentLabel>Vencimento {p.vencimento}</PaymentLabel>
                </PaymentInfo>
                <Value>
                  <Text style={{ marginBottom: "10px", fontWeight: "bold" }}>Valor</Text>
                  <ValueDescription>{p.valor}</ValueDescription>
                </Value>
                <StatusDiv>
                  <Text style={{ marginBottom: "10px", fontWeight: "bold" }}>Status</Text>
                  <Tag status={p.status}>{p.status}</Tag>
                </StatusDiv>
              </PaymentCard>
            ))}
          </PaymentsDiv>

          <SettingsContainer>
            <SettingCard>
              <SettingTitle>Forma de pagamento</SettingTitle>
              <SettingDescription>{paymentMethod}</SettingDescription>
              <AlterButton onClick={() => {
                setCardData({ name: "", number: "", expiry: "", cvv: "", address: "" });
                setSelectedMethod("");
                setOpenPaymentModal(true);
              }}>
                Alterar
              </AlterButton>
            </SettingCard>

            <SettingCard>
              <SettingTitle>Data de vencimento</SettingTitle>
              <SettingDescription>{`Todo dia ${dueDate} do mês`}</SettingDescription>
              <AlterButton onClick={() => setOpenDueDateModal(true)}>Alterar</AlterButton>
            </SettingCard>
          </SettingsContainer>
        </Container>

        {/* Modal de Forma de Pagamento */}
        <Modal open={openPaymentModal} onClose={() => setOpenPaymentModal(false)}>
          <Box sx={modalStyle}>
            <h3>Cadastrar nova forma de pagamento</h3>
            <br/>
            <label>Escolha a forma de pagamento:</label>
            <Select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
              <option value="">Selecione</option>
              {METODOS_PAGAMENTO.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </Select>

            {selectedMethod === "credit" && (
                <>
                  <InputContainer>
                    <Input
                      placeholder="Nome no cartão"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    />
                  </InputContainer>

                  <InputContainer>
                    <CustomMaskedInput
                      placeholder="Número do cartão"
                      value={cardData.number}
                      mask="0000 0000 0000 0000"
                      unmask={true}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardData({ ...cardData, number: e.target.value })}
                    />
                  </InputContainer>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <InputContainer style={{ flex: 1 }}>
                      <CustomMaskedInput
                        placeholder="Validade (MM/AA)"
                        value={cardData.expiry}
                        mask="00/00"
                        unmask={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardData({ ...cardData, expiry: e.target.value })}
                      />
                    </InputContainer>

                    <InputContainer style={{ flex: 1 }}>
                      <CustomMaskedInput
                        placeholder="CVV"
                        value={cardData.cvv}
                        mask="000"
                        unmask={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardData({ ...cardData, cvv: e.target.value })}
                      />
                    </InputContainer>
                  </div>

                  <InputContainer>
                    <Input
                      placeholder="Endereço de cobrança"
                      value={cardData.address}
                      onChange={(e) => setCardData({ ...cardData, address: e.target.value })}
                    />
                  </InputContainer>
                </>
              )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
              <AlterButton onClick={() => setOpenPaymentModal(false)}>Cancelar</AlterButton>
              <AlterButton onClick={handleSavePaymentMethod}>Salvar</AlterButton>
            </div>
          </Box>
        </Modal>

        {/* Modal de Vencimento */}
        <Modal open={openDueDateModal} onClose={() => setOpenDueDateModal(false)}>
          <Box sx={modalStyle}>
            <h3>Editar Data de Vencimento</h3>
            <Select value={dueDate} onChange={(e) => setDueDate(e.target.value)}>
              {VENCIMENTOS_FIXOS.map(v => (
                <option key={v} value={v}>{`Dia ${v} do mês`}</option>
              ))}
            </Select>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
              <AlterButton onClick={() => setOpenDueDateModal(false)}>Cancelar</AlterButton>
              <AlterButton onClick={handleSaveDueDate}>Salvar</AlterButton>
            </div>
          </Box>
        </Modal>
      </Wrapper>
      <ToastContainer />
    </div>
  );
};

export default Payments;
