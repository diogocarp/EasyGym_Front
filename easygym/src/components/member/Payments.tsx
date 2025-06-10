import {  useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { Text } from "../../styles/HomeStyle";
import { Container, Frequency, MoneyIcon, Title } from "../../styles/manager-styles/DashboardStyle";
import {
  AlterButton,
  PaymentCard,
  PaymentInfo,
  PaymentLabel,
  PaymentStatus,
  SettingCard,
  SettingDescription,
  SettingsContainer,
  SettingTitle,
  Value,
  ValueDescription
} from "../../styles/member-styles/PaymentStyles";
import { Input, InputContainer } from "../../styles/LoginStyle";

import Notification from "../painel/Notification";
import { PaymentProps } from "../../pages/constants/PaymentStatus";

const Tag = styled.span<{ status: PaymentStatus }>`
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-style: italic;
  color: white;

  background-color: ${({ status }) => {
    switch (status) {
      case PaymentStatus.PAID:
        return "#28A109";
      case PaymentStatus.PENDING:
        return "#DD212F";
      case PaymentStatus.UPCOMING:
        return "#ADADAD";
      default:
        return "#757575";
    }
  }};
`;

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
  color: "white"
};

export const PaymentStatusTag = ({ status }: PaymentProps) => {
  return <Tag status={status}>{status}</Tag>;
};

const Payments = () => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openDueDateModal, setOpenDueDateModal] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("credit");
  const [cardName, setCardName] = useState("DIOGO C GALES");
  const [cardNumber, setCardNumber] = useState("1111 0000 0000 0000");
  const [cardExpiry, setCardExpiry] = useState("05/29");
  const [cardCVV, setCardCVV] = useState("123");

  const [paymentMethod, setPaymentMethod] = useState(`Cartão de crédito final ${cardNumber.slice(-4)}`);
  const [dueDate, setDueDate] = useState<string>("10");
  const [settings, setSettings] = useState<{ dueDate?: string } | null>(null);
  const [date,setDate] = useState(10);

  useEffect(() => {
    if (settings?.dueDate) {
      const formattedDate = settings.dueDate.substring(0, 10);
      setDueDate(formattedDate);
    }
  }, [settings]);

  const handleSavePaymentMethod = () => {
    if (selectedMethod === "credit") {
      setPaymentMethod(`Cartão de crédito final ${cardNumber.slice(-4)}`);
    } else if (selectedMethod === "boleto") {
      setPaymentMethod("Boleto bancário");
    } else if (selectedMethod === "pix") {
      setPaymentMethod("Pix");
    }
    setOpenPaymentModal(false);
  };

  const handleSaveDueDate = () => {
  if (dueDate) {
    const selectedDay = new Date(dueDate).getDate();
    setDate(selectedDay); 
    setDueDate(selectedDay.toString().padStart(2, '0')); 
  }
  setOpenDueDateModal(false);
};

  const pagamentos: {
    mes: string;
    vencimento: string;
    valor: string;
    status: PaymentStatus;
  }[] = [
    { mes: "Setembro 2024", vencimento: "01/10/2024", valor: "R$ 89,99", status: PaymentStatus.PAID },
    { mes: "Setembro 2024", vencimento: "01/10/2024", valor: "R$ 89,99", status: PaymentStatus.PENDING },
    { mes: "Setembro 2024", vencimento: "01/10/2024", valor: "R$ 89,99", status: PaymentStatus.UPCOMING },
    { mes: "Setembro 2024", vencimento: "01/10/2024", valor: "R$ 89,99", status: PaymentStatus.UPCOMING }
  ];

  return (
    <div style={{ display: "flex" }}>
      <Container style={{ width: "20%" }} />
      <Container style={{ width: "80%" }}>
        <Frequency>
          <MoneyIcon fontSize="large" />
          <Title>Pagamentos</Title>
        </Frequency>

        {pagamentos.map((p, i) => (
          <PaymentCard key={i}>
            <PaymentInfo>
              <div>
                <strong>{p.mes}</strong>
              </div>
              <PaymentLabel>Vencimento {p.vencimento}</PaymentLabel>
            </PaymentInfo>
            <Value>
              <div>
                <strong>Valor</strong>
              </div>
              <ValueDescription>{p.valor}</ValueDescription>
            </Value>
            <div>
              <Text style={{ marginBottom: "10px" }}>Status</Text>
              <PaymentStatusTag status={p.status} />
            </div>
          </PaymentCard>
        ))}

        <SettingsContainer>
          <SettingCard>
            <SettingTitle>Forma de pagamento</SettingTitle>
            <SettingDescription>{paymentMethod}</SettingDescription>
            <AlterButton onClick={() => setOpenPaymentModal(true)}>Alterar</AlterButton>
          </SettingCard>

          <SettingCard>
            <SettingTitle>Data de vencimento</SettingTitle>
            <SettingDescription>{`Todo dia ${dueDate} do mês`}</SettingDescription>
            <AlterButton onClick={() => setOpenDueDateModal(true)}>Alterar</AlterButton>
          </SettingCard>
        </SettingsContainer>
      </Container>

      <Notification />

      <Modal open={openPaymentModal} onClose={() => setOpenPaymentModal(false)}>
        <Box sx={modalStyle}>
          <h2>Editar Forma de Pagamento</h2>
          <label htmlFor="paymentType">Escolha a forma de pagamento:</label>
          <select
            id="paymentType"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
              background: "#222",
              color: "white",
              border: "1px solid #555"
            }}
          >
            <option value="credit">Cartão de crédito</option>
            <option value="boleto">Boleto bancário</option>
            <option value="pix">Pix</option>
          </select>

        {selectedMethod === "credit" && (
  <>
    <InputContainer>
      <Input
        type="text"
        placeholder="Nome no cartão"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
    </InputContainer>
    <InputContainer>
      <Input
        type="text"
        placeholder="Número do cartão"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
    </InputContainer>
    <InputContainer style={{ display: "flex", gap: "10px" }}>
      <Input
        type="text"
        placeholder="Validade (MM/AA)"
        value={cardExpiry}
        onChange={(e) => setCardExpiry(e.target.value)}
      />
      <Input
        type="text"
        placeholder="CVV"
        value={cardCVV}
        onChange={(e) => setCardCVV(e.target.value)}
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

      <Modal open={openDueDateModal} onClose={() => setOpenDueDateModal(false)}>
        <Box sx={modalStyle}>
          <h2>Editar Data de Vencimento</h2>
          <InputContainer>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Ex: Todo dia 10 do mês"
            />
          </InputContainer>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <AlterButton onClick={() => setOpenDueDateModal(false)}>Cancelar</AlterButton>
            <AlterButton onClick={handleSaveDueDate}>Salvar</AlterButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Payments;
