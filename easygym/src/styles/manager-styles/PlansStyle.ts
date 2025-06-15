import styled from "styled-components";
import { InfoOutlined, FitnessCenter, AttachMoneyOutlined, Settings } from "@mui/icons-material";
import { IMaskInput } from 'react-imask';


const Container = styled.div`
  background-color:#252525;
`

const GymIcon = styled(FitnessCenter)`
    color:white;
    margin-left:20px;
    
`

const Frequency = styled.div`
  display:flex; 
  align-items:center;
  padding: 20px 10px 10px 10px
`;

const Title = styled.h3`
    color:white;
    text-align:left;
    font-weight:500
`

const Descricao = styled.h5`
    color:white;
    text-align:left;
    font-weight:normal
`

const InfoIcon = styled(InfoOutlined)`
    color:white;
    
`

const MoneyIcon = styled(AttachMoneyOutlined)`
    color:white;
    
`


const SettingsIcon = styled(Settings)`
    color:white;
    margin-left:20px;
    
`


const PlansSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 2px;
  padding: 40px;
`;

const PlanCard = styled.div`
  background: #333;
  padding: 30px;
  border-radius: 2px;
  text-align: center;
  flex-grow: 1;
  width:100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlanList = styled.ul`
  display: block;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  
`;

const PlanListItem = styled.li`
  text-align: left;
  padding: 5px;
  margin-top: 15px;
  margin-bottom: 15px;
  align-items:center;
  justify-content:left;
  display:flex;
  color:white;
  font-size: 12px;
  
`;

const Icon = styled.img`
  width: 15px;
  margin-right: 10px;
`;


const Button = styled.button`
  background: #DD212F;
  width: 100%;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: #ccc;
    background-color: darkred;
  }
`;
const InputMasked = styled(IMaskInput)`
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #444;
  border-radius: 5px;
  border: 1px solid #666;

  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:has(input:focus) {
    transform: scale(1.05); 
   
  }

  @media (max-width: 768px) {
    width: 100%; 
  }
`;


export { Container, Title, InfoIcon, Frequency,MoneyIcon,GymIcon, SettingsIcon, PlansSection, PlanCard, PlanList, PlanListItem, Icon, Button, Descricao, InputMasked, InputContainer}