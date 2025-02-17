import styled from "styled-components";
import { IMaskInput } from "react-imask";


const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #444;
  padding: 10px;
  border-radius: 5px;
  width: 48%;
  @media (max-width: 768px) {
    width: 100%; 
  }
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:has(input:focus) {
    transform: scale(1.05); 
   
  }

  @media (max-width: 768px) {
    width: 100%; 
  }

   
`;

const CustomMaskedInput = styled(IMaskInput)`
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

const FullWidth = styled.div`
  width: 100%;
  display:flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export { Form, Input, InputContainer, FullWidth,CustomMaskedInput }