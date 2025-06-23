import { People } from "@mui/icons-material";
import styled from "styled-components";
import { IMaskInput } from 'react-imask';

const Member = styled.div`
  color: white;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #333;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const MemberInfo = styled.div`
  h3 {
    font-weight: 600;
  }
  p {
    color: #bbb;
  }
`;

const Actions = styled.div`
  display: grid;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 15px;
  &:hover {
    color: #ddd;
  }
`;

const SearchButton = styled.button`
  width: 250px;
  background: #dd212f;
  color: white;
  border: none;
  padding: 14px;
  font-size: 13px;
  cursor: pointer;
  border-radius: 20px;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: #b71c1c;
  }
`

const FilterContainer = styled.div` 
  background-color: #393939;
  align-items:center;
  justify-content:space-evenly;
  align-content: center;
  border-radius: 10px;
  
`

const MembersIcon = styled(People)`
    color:white;
    
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #444;
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

const InputContainerEdit = styled.div`
  display: flex;
  align-items: center;
  background: #444;
  border-radius: 5px;
  border: 1px solid #666;
  margin-top: 10px;

  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:has(input:focus) {
    transform: scale(1.05); 
   
  }
    
  &:has(input:disabled) {
    background-color: #3b3b3b
   
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

    &::-webkit-calendar-picker-indicator {
    filter: invert(1); 
    }
`;

const InputMasked = styled(IMaskInput)`
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

    &::-webkit-calendar-picker-indicator {
    filter: invert(1); 
    }
`;

export {Actions,Button,Card,Member,Grid,MemberInfo,Title,MembersIcon, FilterContainer, SearchButton, Input, InputMasked, InputContainer, InputContainerEdit}