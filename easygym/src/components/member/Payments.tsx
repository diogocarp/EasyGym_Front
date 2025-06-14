import {  useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { Text } from "../../styles/HomeStyle";
import { Container, Frequency, MoneyIcon, Title } from "../../styles/manager-styles/DashboardStyle";
import {
  AlterButton,
  NotificationWrapper,
  PaymentCard,
  PaymentInfo,
  PaymentLabel,
  PaymentStatus,
  SettingCard,
  SettingDescription,
  SettingsContainer,
  SettingTitle,
  Value,
  ValueDescription,
  Wrapper,
  Select
} from "../../styles/member-styles/PaymentStyles";
import { Input, InputContainer } from "../../styles/LoginStyle";

import Notification from "../painel/Notification";
import { PaymentProps } from "../../pages/constants/PaymentStatus";

import {useMediaQuery, useTheme } from "@mui/material";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openDueDateModal, setOpenDueDateModal] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("credit");
  const [cardName, setCardName] = useState("DIOGO C GALES");
  const [cardNumber, setCardNumber] = useState("1111 0000 0000 0000");
  const [cardExpiry, setCardExpiry] = useState("05/29");
  const [cardCVV, setCardCVV] = useState("123");

  const [paymentMethod, setPaymentMethod] = useState(`Cartão de crédito final ${cardNumber.slice(-4)}`);
  const [dueDate, setDueDate] = useState<string>("10");
  const [date,setDate] = useState("10");

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
  setDate(dueDate); 
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
    <div style={{
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  flexWrap: "wrap",
  width: "100%",
  boxSizing: "border-box"
}}>

      {!isMobile && <Container style={{ width: "20%" }} />} 
      <Wrapper>
      <Container style={{ width: isMobile ? "100%" : "80%" }}>
        <Frequency>
          <MoneyIcon fontSize="large" />
          <Title>Pagamentos</Title>
        </Frequency>

        {pagamentos.map((p, i) => (
          <PaymentCard key={i}>
            <PaymentInfo>
              <div><strong>{p.mes}</strong></div>
              <PaymentLabel>Vencimento {p.vencimento}</PaymentLabel>
            </PaymentInfo>
            <Value>
              <div><strong>Valor</strong></div>
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

      

      <Modal open={openPaymentModal} onClose={() => setOpenPaymentModal(false)}>
        <Box sx={modalStyle}>
          <h2>Editar Forma de Pagamento</h2>
          <label htmlFor="paymentType">Escolha a forma de pagamento:</label>
          <Select
  value={selectedMethod}
  onChange={(e) => setSelectedMethod(e.target.value)}
>
  <option value="credit">Cartão de crédito</option>
  <option value="boleto">Boleto bancário</option>
  <option value="pix">Pix</option>
</Select>


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
            <Select
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
>
  <option value="10">10</option>
  <option value="15">15</option>
  <option value="20">20</option>
</Select>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <AlterButton onClick={() => setOpenDueDateModal(false)}>Cancelar</AlterButton>
            <AlterButton onClick={handleSaveDueDate}>Salvar</AlterButton>
          </div>
        </Box>
      </Modal>
        <NotificationWrapper>
    <Notification />
  </NotificationWrapper>
      </Wrapper>
    </div>

    
  );
};

export default Payments;
