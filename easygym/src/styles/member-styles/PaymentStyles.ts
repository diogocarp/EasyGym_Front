import styled from 'styled-components';
import { PaymentStatus } from './../../pages/constants/PaymentStatus';

const Container = styled.div`
  background-color: #1e1e1e;
  color: white;
  padding: 2rem;
  font-family: Arial, sans-serif;
  width: 100%;
  box-sizing: border-box;
`;

const PaymentTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  gap: 0.5rem;
  color: white;
`;

const PaymentCard = styled.div`
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const PaymentLabel = styled.span`
  text-align: center;
  color: #C3C3C3;
  margin-bottom: 10px;
  font-size: 16px;
  font-style: italic;
  margin-top: 18px;
`;

const Value = styled.div`
  text-align: right;
  color: white;
  justify-content: start;
`;

const ValueDescription = styled.p`
  text-align: center;
  color: #C3C3C3;
  margin-top: 10px;
  font-size: 18px;
  font-style: italic;
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
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SettingCard = styled.div`
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  flex: 1 1 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 260px;
`;

const SettingTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white;
`;

const SettingDescription = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: white;
  text-align: center;
`;

const AlterButton = styled.button`
  background: #DD212F;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1.2rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #b71c1c;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  box-sizing: border-box;
  align-items: flex-start;
  gap: 1rem;
  

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NotificationWrapper = styled.div`
  width: 300px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Select = styled.select`
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  background: #1e1e1e;
  color: white;
  border: 1px solid #444;
  font-size: 1rem;
  transition: border 0.2s ease;

  &:hover {
    border-color: #888;
  }

  option {
    background: #1e1e1e;
    color: white;
  }
`;



export {
  Select,
  Wrapper,
  NotificationWrapper,
  AlterButton,
  Container,
  PaymentCard,
  PaymentInfo,
  PaymentLabel,
  SettingCard,
  SettingDescription,
  SettingTitle,
  SettingsContainer,
  Status,
  Value,
  PaymentTitle,
  PaymentStatus,
  ValueDescription
};
