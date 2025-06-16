import styled from 'styled-components';
import { Settings } from "@mui/icons-material";
import { IMaskInput } from "react-imask";


const Container = styled.div`
  background-color:#252525;
`

const TitleBox = styled.div`
  display:flex; 
  align-items:center;
`;

const Title = styled.h3`
    color:white;
    text-align:left;
    padding-left:10px;
    font-weight:500
`

const SettingsIcon = styled(Settings)`
    color:white;
    
`;

const Section = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: white;
  font-size: 1.4rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Card = styled.div`
  background-color: #2c2c2c;
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

const Row = styled.div`
  width: 100%;
  display:flex;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  flex: 1;
  min-width: 180px; 
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #eee;
  color: #000;
  padding: 0.5rem;
  border-radius: 0.3rem;

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const Button = styled.button`
  background-color: #DD212F;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
  width: 150px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background: #b71c1c;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.8rem 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 480px) {
    justify-content: stretch;
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
  

  @media (max-width: 1150px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NotificationWrapper = styled.div`
  width: 300px;

  @media (max-width: 1150px) {
    width: 100%;
    :only-child{
      width:100%
    }
  }
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


const CustomMaskedInput = styled(IMaskInput)`
  width:100%;
  border: none;
  background: none;
  outline: none;
  flex: 1;
  padding-left: 10px;
  font-size: 12px;
  color:white;

    &:disabled {
        color: gray;
        cursor: not-allowed;
    }

    &::-webkit-datetime-edit {
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

    &:-internal-autofill-selected {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
    &:-webkit-autofill {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
    &:-webkit-autofill:focus {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }

`;


const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #444;
  border-radius: 5px;
  border: 1px solid #666;
  flex-grow: 1;
  padding-right: 5px;
  height: 35px;
  width: 100%;

  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:has(input:focus) {
    transform: scale(1.05); 
   
  }
  &:has(input:disabled) {
    background-color: #3b3b3b
   
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
        cursor: not-allowed;
    }

    &::-moz-placeholder {
        color: white; 
    }

    &::-ms-input-placeholder {
        color: white; 
    }

    &::-webkit-datetime-edit {
        color: white;
    }

    &::-webkit-calendar-picker-indicator {
    filter: invert(1); 
    }

    &:-internal-autofill-selected {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
    &:-webkit-autofill {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
    &:-webkit-autofill:focus {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
}
`;

export { Button, Card, Field, Input, Row, Section, SectionTitle, ButtonContainer, NotificationWrapper, Wrapper, Container, TitleBox, Title, SettingsIcon, AlterButton, CustomMaskedInput, InputContainer };
