import styled from 'styled-components';

const Section = styled.div`
  margin-top: 2rem;
  width: 90%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    width: 95%;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-top: 1.5rem;
  }
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

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.8rem;
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

const Input = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background-color: #DD212F;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
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
  margin-top: 1rem;

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

export { Button, Card, Field, Input, Row, Section, SectionTitle, ButtonContainer, NotificationWrapper, Wrapper };
