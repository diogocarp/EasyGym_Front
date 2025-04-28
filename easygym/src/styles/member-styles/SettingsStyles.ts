import styled from 'styled-components';

const Section = styled.div`
  margin-top: 2rem;
  width:90%;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: white;
`;

const Card = styled.div`
  background-color: #2c2c2c;
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Field = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #eee;
  color: #000;
  padding: 0.5rem;
  border-radius: 0.3rem;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
`;

const Button = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
  width:150px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem; 
`;

export {Button,Card,Field,Input,Row,Section,SectionTitle, ButtonContainer}

