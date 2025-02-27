import { AccountBox } from "@mui/icons-material";
import styled from "styled-components";

const Member = styled.div`
  padding: 2rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  margin-top: 10px;
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
  width: 200px;
  background: #dd212f;
  color: white;
  border: none;
  padding: 14px;
  font-size: 16px;
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

const MembersIcon = styled(AccountBox)`
    color:white;
    margin-left:20px;
    
`

export {Actions,Button,Card,Member,Grid,MemberInfo,Title,MembersIcon, FilterContainer, SearchButton}