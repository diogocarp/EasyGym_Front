import { Text } from "../../styles/HomeStyle";
import { Container, Frequency, MoneyIcon, Title } from "../../styles/manager-styles/DashboardStyle";
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
  ValueDescription
} from "../../styles/member-styles/PaymentStyles";

import Notification from "../painel/Notification";
import styled from "styled-components";

export enum PaymentStatus {
  PAID = 'PAGO',
  PENDING = 'AGUARDANDO \nPAGAMENTO',
  UPCOMING = 'A VENCER',
}

interface PaymentProps {
  status: PaymentStatus;
}

const Tag = styled.span<{ status: PaymentStatus }>`
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-style: italic;
  color: white;

  background-color: ${({ status }) => {
    switch (status) {
      case PaymentStatus.PAID:
        return '#28A109';
      case PaymentStatus.PENDING:
        return '#DD212F'; 
      case PaymentStatus.UPCOMING:
        return '#ADADAD'; 
      default:
        return '#757575';
    }
  }};
`;

export const PaymentStatusTag = ({ status }: PaymentProps) => {
  return <Tag status={status}>{status}</Tag>;
};

const Payments = () => {
  const pagamentos: {
    mes: string;
    vencimento: string;
    valor: string;
    status: PaymentStatus;
  }[] = [
    { mes: 'Setembro 2024', vencimento: '01/10/2024', valor: 'R$ 89,99', status: PaymentStatus.PAID },
    { mes: 'Setembro 2024', vencimento: '01/10/2024', valor: 'R$ 89,99', status: PaymentStatus.PENDING },
    { mes: 'Setembro 2024', vencimento: '01/10/2024', valor: 'R$ 89,99', status: PaymentStatus.UPCOMING },
    { mes: 'Setembro 2024', vencimento: '01/10/2024', valor: 'R$ 89,99', status: PaymentStatus.UPCOMING },
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
            <div><strong>{p.mes}</strong></div>
              <PaymentLabel>Vencimento {p.vencimento}</PaymentLabel>
            </PaymentInfo>
            <Value>
              <div><strong>Valor</strong></div>
              <ValueDescription>{p.valor}</ValueDescription>
            </Value>
            <div>
              <Text style={{marginBottom:"10px"}}>Status</Text>
              <PaymentStatusTag status={p.status} />
            </div>
          </PaymentCard>
        ))}

        <SettingsContainer>
          <SettingCard>
            <SettingTitle>Forma de pagamento</SettingTitle>
            <SettingDescription>Cartão de crédito final 5578</SettingDescription>
            <AlterButton>Alterar</AlterButton>
          </SettingCard>

          <SettingCard>
            <SettingTitle>Data de vencimento</SettingTitle>
            <SettingDescription>Todo dia 01 do mês</SettingDescription>
            <AlterButton>Alterar</AlterButton>
          </SettingCard>
        </SettingsContainer>
      </Container>
      <Notification />
    </div>
  );
};

export default Payments;
