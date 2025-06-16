import styled from 'styled-components';
import { PaymentStatus } from './../../pages/constants/PaymentStatus';
import { AttachMoneyOutlined } from "@mui/icons-material";
import { IMaskInput } from "react-imask";

const PaymentTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  gap: 0.5rem;
  color: white;
`;

const PaymentCard = styled.div`
  background: #373737;
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TitleCard = styled.div`
  display:flex; 
  align-items:center;
  margin-bottom: 20px;
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  flex-grow: 1;
  align-items: start;
  width: 100%;
`;

const PaymentLabel = styled.span`
  text-align: center;
  color: #C3C3C3;
  margin-bottom: 10px;
  font-size: 14px;
  font-style: italic;
  margin-top: 18px;
`;

const Value = styled.div`
  text-align: right;
  color: white;
  justify-content: start;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const Text = styled.p`
  color: white;
  font-size: 15px;
`;

const StatusDiv = styled.div`
  text-align: right;
  color: white;
  justify-content: start;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const ValueDescription = styled.p`
  text-align: center;
  color: #C3C3C3;
  font-size: 14px;
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
  background: #373737;
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

const Container = styled.div`
  background-color:#252525;
  width: 100%;
  padding: 10px;
`

const MoneyIcon = styled(AttachMoneyOutlined)`
    color:white;
`

const Title = styled.h3`
    color:white;
    text-align:left;
    padding-left:10px;
    font-weight:500
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #444;
  border-radius: 5px;
  border: 1px solid #666;
  flex-grow: 1;
  margin-bottom: 10px;

  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:has(input:focus) {
    transform: scale(1.05); 
   
  }

  @media (max-width: 768px) {
    width: 100%; 
  }
`;

const Input = styled.input`
  width:100%;
  height: 40px;
  border: none;
  background: none;
  outline: none;
  flex: 1;
  padding: 0px 10px 0px 10px;
  font-size: 12px;
  color:white;

    &:disabled {
        color: gray;
    }

    &::-moz-placeholder {
        color: gray; 
    }

    &::-ms-input-placeholder {
        color: gray; 
    }

    &::-webkit-calendar-picker-indicator {
    filter: invert(1); 
    }
`;

const PaymentsDiv = styled.div`
    max-height: 435px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Tag = styled.span<{ status: PaymentStatus }>`
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 13px;
  font-style: italic;
  color: white;

  background-color: ${({ status }) => {
    switch (status) {
      case PaymentStatus.PAID:
        return "#1e7f14";
      case PaymentStatus.PENDING:
        return "#c7311c";
      case PaymentStatus.UPCOMING:
        return "#757575";
      default:
        return "#757575";
    }
  }};
`;

const CustomMaskedInput = styled(IMaskInput)`
  width:100%;
  height: 40px;
  border: none;
  background: none;
  outline: none;
  flex: 1;
  padding: 0px 10px 0px 10px;
  font-size: 12px;
  color:white;

    &:disabled {
        color: gray;
    }

    &::-moz-placeholder {
        color: gray; 
    }

    &::-ms-input-placeholder {
        color: gray; 
    }

    &::-webkit-calendar-picker-indicator {
    filter: invert(1); 
    }
`;

export {
  Select,
  Wrapper,
  NotificationWrapper,
  AlterButton,
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
  ValueDescription,
  StatusDiv,
  Text,
  Title,
  TitleCard,
  Container,
  MoneyIcon,
  Input,
  InputContainer,
  PaymentsDiv,
  Tag,
  CustomMaskedInput
};
