import styled from "styled-components";
import { InfoOutlined } from "@mui/icons-material";

const InfoIcon = styled(InfoOutlined)`
    color:white;
    
`
const Container = styled.div`
  background-color:#252525;
`

const TitleBox = styled.div`
  display:flex; 
  align-items:center;
  padding: 20px 10px 10px 10px
`;

const Title = styled.h3`
    color:white;
    text-align:left;
    padding-left:10px;
    font-weight:500
`

const PlanContainer = styled.div`
  background: linear-gradient(to bottom, #444, #3a3a3a);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px;
  max-width: 800px;
  box-shadow: 5px 5px 15px #1a1a1a;

  @media (max-width: 1024px) {
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Plan = styled.div`

  padding:10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PlanText = styled.p`
  text-align: center;
  color: #c3c3c3;
  margin-bottom: 10px;
  font-size: 12px;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  background: #DD212F;
  width: 220px;
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

const Icon = styled.img`
  width: 20px;
  margin-right: 10px;
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
  font-size: 15px;
  
`;

const PlansSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 2px;
  padding: 40px;
  

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
`;

export { PlanContainer, Plan, PlanText, InfoIcon, Container, TitleBox, Title, Button, Icon, PlanList, PlanListItem, PlansSection };
