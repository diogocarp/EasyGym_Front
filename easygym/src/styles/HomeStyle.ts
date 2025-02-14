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
  
  
`;

const Icon = styled.img`
  width: 20px;
`;

const AboutSection = styled.div`
  width: 800px;
  height: 400px;
  background: linear-gradient(to top, #3a3a3a, #1a1a1a);
  border-left: 5px solid #fff;
  color: white;
  padding: 50px;
  margin-right: 100px;
  font-size: 20px;
  position: absolute;
  right: 0;

  @media (max-width: 1200px) {
    width: 600px;
    margin-right: 100px;
  }

  @media (max-width: 1000px) {
    width: 100%;
    margin-right: 0;
    position: relative;
    border-left: none;
    border-top: 5px solid #fff;
    padding: 20px;
    height: auto;
  }
`;

const AboutImage = styled.img`
  width: 45%;

  @media (max-width: 1000px) {
    width: 100%;
  }
    
`;

const ContactSection = styled.div`
  width: 900px;
  height: 400px;
  background: linear-gradient(to bottom, #3a3a3a, #1a1a1a);
  border-right: 5px solid #fff;
  color: white;
  font-size: 20px;
  padding: 50px;
  margin-left: 100px;
  position: absolute;
  left: 0;

  @media (max-width: 1200px) {
    width: 600px;
    margin-left: 100px;
  }

  @media (max-width: 1000px) {
    width: 100%;
    margin-left: 0;
    position: relative;
    border-right: none;
    border-bottom: 5px solid #fff;
    padding: 20px;
    height: auto;
  }
`;

const ContactImage = styled.img`
  width: 45%;

  @media (max-width: 1000px) {
    width: 100%;
  }


`;

const Section = styled.section`
  display: flex;
  align-items: center;
  padding: 40px;
  gap: 20px;
  margin-top: 60px;
  margin-bottom: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const Text = styled.p`
  color: white;
  margin-top: 20px;
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