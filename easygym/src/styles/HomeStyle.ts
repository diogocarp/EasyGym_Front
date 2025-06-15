import styled from "styled-components";

const Container = styled.div`
  background-color: #1a1a1a;
  color: white;
  
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

const PlanCard = styled.div`
  background: #333;
  padding: 20px;
  border-radius: 2px;
  text-align: center;

  @media (max-width: 1000px) {
    width: 300px;
    margin-bottom: 20px;
    
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
  
`;

const Icon = styled.img`
  width: 20px;
  margin-right: 10px;
`;

const AboutSection = styled.div`
  width: 550px;
  background: linear-gradient(to top, #3a3a3a, #252525);
  border-left: 5px solid #fff;
  color: white;
  padding: 50px;
  margin-right: 100px;
  font-size: 20px;

  @media (max-width: 1000px) {
    width: 100%;
    margin-right: 0;
    border-left: none;
    border-top: 5px solid #fff;
    padding: 20px;
    height: auto;
  }
`;

const AboutImage = styled.img`
  width: 650px;
  margin-right: -100px;

  @media (max-width: 1000px) {
    width: 100%;
  }
    
`;

const ContactSection = styled.div`
  width: 550px;
  background: linear-gradient(to top, #3a3a3a, #252525);
  border-right: 5px solid #fff;
  color: white;
  padding: 50px;
  margin-left: 100px;
  font-size: 20px;
  z-index: 999;

  @media (max-width: 1000px) {
    width: 100%;
    margin-left: 0;
    border-right: none;
    border-top: 5px solid #fff;
    padding: 20px;
    height: auto;
  }
`;

const ContactImage = styled.img`
  width: 650px;
  margin-left: -100px;

  @media (max-width: 1000px) {
    width: 100%;
  }

`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const Text = styled.p`
  color: white;
  margin-top: 20px;
  font-size: 15px;
`;

const Title = styled.h1`
  color: white;
`;

export {
  Button,
  ContactSection,
  Section,
  PlanCard,
  PlansSection,
  Container,
  PlanList,
  PlanListItem,
  Icon,
  AboutSection,
  Text,
  Title,
  AboutImage,
  ContactImage,
};