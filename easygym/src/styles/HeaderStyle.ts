import styled from "styled-components";


const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: radial-gradient(circle, #3a3a3a 0%, #1a1a1a 100%);
  align-items: center; 
  border-bottom: 2px solid #fff;
`;

const Logo = styled.img`
  cursor: pointer;
  width:50%;
`;

const LogoContainer = styled.div`
  background-color:#4D4B4D;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:10px;
`

const Nav = styled.nav`
  display: flex;
  gap: 40px;
  align-items: center; 
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    color:#ccc;
  }
`;

const Button = styled.button`
width: 160px;
height:45px;
color:white;
background-color:#DD212F;
cursor: pointer;
margin-right:25px;
border-radius:20px;
border:none;
&:hover {
    color:#ccc;
    background-color:darkred;
  }
`



export {Container, Logo,Nav,NavLink,Button,LogoContainer}