import { PaymentStatus } from './../../pages/constants/PaymentStatus';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #1e1e1e;
  color: white;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const PaymentTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  gap: 0.5rem;
  color: white;
`;

const PaymentCard = styled.div`
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const PaymentLabel = styled.span`
  text-align:center;
  color:#C3C3C3;
  margin-bottom: 10px;
  font-size: 16px;
  font-style: italic;
  margin-top: 18px;
`;

const Value = styled.div`
  text-align: right;
  color: white;
  justify-content:start;
`;

const Status = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  color: white;
`;

const SettingsContainer = styled.div`
  display: flex;
  width: 75rem;
  gap: 1rem;
  margin-top: 2rem;
`;

const SettingCard = styled.div`
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white;
`;

const SettingDescription = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: white
`;

const AlterButton = styled.button`
  background: #DD212F;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1.2rem;
  cursor: pointer;
`;

const ValueDescription = styled.p`
text-align:center;
color:#C3C3C3;
margin-top: 10px;
font-size: 18px;
font-style: italic;
`

export {AlterButton,Container,PaymentCard,PaymentInfo,PaymentLabel,SettingCard,SettingDescription,SettingTitle,SettingsContainer,Status,Value,PaymentTitle,PaymentStatus, ValueDescription}