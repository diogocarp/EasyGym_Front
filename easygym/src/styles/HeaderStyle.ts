
import styled from "styled-components";

interface SidebarProps {
  isOpen:boolean;
}

 const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: radial-gradient(circle, #3a3a3a 0%, #1a1a1a 100%);
  border-bottom: 2px solid #fff;
`;

 const Logo = styled.img`
  cursor: pointer;
  width: 100px;
`;

 const LogoContainer = styled.div`
  background-color: #4D4B4D;
  height: 95px;
  width: 235px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

 const Nav = styled.nav`
  display: flex;
  gap: 40px;
  align-items: center;
  font-size: 13px;

  @media (max-width: 768px) {
    display: none;
  }
`;

 const NavLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    color: #ccc;
  }
`;

const Button = styled.button`
  padding: 10px 15px 10px 15px;
  color: white;
  background-color: #DD212F;
  cursor: pointer;
  margin-right: 25px;
  border-radius: 20px;
  border: none;
  &:hover {
    color: #ccc;
    background-color: darkred;
  }
`;

const HeaderMenuIcon = styled.div`
  display: none; 
  color: white;
  font-size: 24px;
  cursor: pointer;
  height: 100%;
  width: 100px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Sidebar = styled.div<SidebarProps>`
  display: none; 
  flex-direction: column;
  gap: 20px;
  background: radial-gradient(circle, #3a3a3a 0%, #1a1a1a 100%);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  max-width: 80%;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex; 
  }
`;

export {Button,Container,HeaderMenuIcon,Logo,LogoContainer,Nav,NavLink,Sidebar}