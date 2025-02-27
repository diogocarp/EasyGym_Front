import styled from "styled-components";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FitnessCenter, MonetizationOnOutlined, Settings } from "@mui/icons-material";


const Container = styled.div`
  background-color:#252525;
  height:120vh;
`

const GymIcon = styled(FitnessCenter)`
    color:white;
    margin-left:20px;
    
`

const Square = styled.div`
  background: linear-gradient(to bottom, #444, #3a3a3a);
  width:50%;
  margin:20px;
  align-content: center;
  border-radius: 10px;
  box-shadow: 5px 5px ; 
  
`;

const SquareImage = styled.img`
  width:40%;
  display:block;
  margin: 0 auto;
  
`;

const SquareTitle = styled.p`
  color: #fff;
  font-size: 18px;
  text-align:center;
  margin: 10px;
`;

const SquareData = styled.p`
  color: #fff;
  font-size: 25px;
  text-align:center
`;

const Frequency = styled.div`
  display:flex; 
  align-items:center;
`;

const FrequencySquare = styled.div`
padding:10px;
 width:400px;
 height:225px;
 display: flex;
`;

const Title = styled.h2`
    color:white;
    text-align:left;
    padding:20px;
`

const AlertIcon = styled(ErrorOutlineIcon)`
    color:white;
    margin-left:20px;
    
`

const MoneyIcon = styled(MonetizationOnOutlined)`
    color:white;
    margin-left:20px;
    
`


const SettingsIcon = styled(Settings)`
    color:white;
    margin-left:20px;
    
`



export { Container, Title, AlertIcon, Frequency, Square, FrequencySquare,MoneyIcon,SquareData,SquareImage,SquareTitle,GymIcon, SettingsIcon}