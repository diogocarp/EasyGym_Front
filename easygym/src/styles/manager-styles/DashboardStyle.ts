import styled from "styled-components";
import { InfoOutlined, FitnessCenter, AttachMoneyOutlined, Settings } from "@mui/icons-material";


const Container = styled.div`
  background-color:#252525;
`

const GymIcon = styled(FitnessCenter)`
    color:white;
    margin-left:20px;
    
`

const Square = styled.div`
  background: linear-gradient(to bottom, #444, #3a3a3a);
  width:50%;
  height:120px;
  align-content: center;
  
`;

const SquareImage = styled.img`
  width:40px;
  display:block;
  margin: 0 auto;
  
`;

const SquareTitle = styled.p`
  color: #fff;
  font-size: 12px;
  text-align:center;
  margin: 10px;
`;

const SquareData = styled.p`
  color: #fff;
  font-size: 18px;
  text-align:center
`;

const Frequency = styled.div`
  display:flex; 
  align-items:center;
  padding: 20px 10px 10px 10px
`;

const FrequencySquare = styled.div`
  padding:0px 0px 10px 10px;
  display: flex;
  gap: 10px;
`;

const Title = styled.h3`
    color:white;
    text-align:left;
    padding-left:10px;
    font-weight:500
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



export { Container, Title, InfoIcon, Frequency, Square, FrequencySquare,MoneyIcon,SquareData,SquareImage,SquareTitle,GymIcon, SettingsIcon}