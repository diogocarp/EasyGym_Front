import styled from "styled-components";

const Container = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 80px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const Card = styled.div`
  background: linear-gradient(to left, #3a3a3a, #1a1a1a);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 450px;

  @media (max-width: 550px) {
    width: 90%;
    padding: 30px;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  width: 50%;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #444;
  padding: 12px;
  margin: 12px 0;
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

const Input = styled.input`
 width:100%;
  border: none;
  background: none;
  outline: none;
  flex: 1;
  padding-left: 10px;
  font-size: 14px;
  color:white;

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
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #bbb;
  margin-top: 15px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
  }
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const Link = styled.a`
  color: #ddd;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #dd212f;
  color: white;
  border: none;
  padding: 14px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  margin-top: 15px;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: #b71c1c;
  }
`;

export { Container, Section, Card, Logo, InputContainer, Input, Options, Checkbox, Link, Button };
