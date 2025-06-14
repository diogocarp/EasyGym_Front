import styled from "styled-components";

const Container = styled.div`
  width: 250px;
  background: #222;
  padding: 10px;
  border-left: 4px solid #ccc;
  color: #fff;

  @media (max-width: 900px) {
    width: 100%;
    border-left: none;
    border-top: 4px solid #ccc;
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const Box = styled.div`
  background: #333;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InfoIcon = styled.span`
  margin-right: 10px;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 5px;
  }
`;

const Text = styled.p`
  font-style: italic;
  color: #ccc;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export { InfoIcon, Container, Box, Text, Title };
