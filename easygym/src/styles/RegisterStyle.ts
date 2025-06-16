import styled from "styled-components";
import { IMaskInput } from "react-imask";


const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`;

const CustomMaskedInput = styled(IMaskInput)`
  width:100%;
  border: none;
  background: none;
  outline: none;
  flex: 1;
  padding-left: 10px;
  font-size: 12px;
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

    &:-internal-autofill-selected {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
    &:-webkit-autofill {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
    &:-webkit-autofill:focus {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }

`;


const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #444;
  border-radius: 5px;
  border: 1px solid #666;
  flex-grow: 1;
  padding-right: 5px;
  height: 35px;
  width: 100%;

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
  height: 40px;
  border: none;
  background: none;
  outline: none;
  flex: 1;
  padding: 0px 10px 0px 10px;
  font-size: 12px;
  color:white;

    &:disabled {
        color: gray;
    }

    &::-moz-placeholder {
        color: gray; 
    }

    &::-ms-input-placeholder {
        color: gray; 
    }

    &::-webkit-datetime-edit {
        color: gray;
    }

    &::-webkit-calendar-picker-indicator {
    filter: invert(1); 
    }

    &:-internal-autofill-selected {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
    &:-webkit-autofill {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
    &:-webkit-autofill:focus {
      transition: background-color 0s 600000s, color 0s 600000s !important;
    }
`;

const FullWidth = styled.div`
  width: 100%;
  display:flex;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export { Form, Input, InputContainer, FullWidth,CustomMaskedInput }