import  { useState } from "react";
import {Button,Container,Logo,LogoContainer,HeaderMenuIcon,Nav,NavLink,Sidebar} from "../styles/HeaderStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogged] = useState(true);

    const navigate = useNavigate();
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function smoothScroll(e:React.MouseEvent<HTMLElement>, id:string) {
        e.preventDefault(); 
        const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            setIsMenuOpen(false); 
        };
    

    return (
        <Container>
            <LogoContainer>
                <Logo src={logo} onClick={()=>navigate("/")}/>
            </LogoContainer>

            <HeaderMenuIcon style={{justifyContent: isMenuOpen? "end" : "center"}} onClick={toggleMenu}>
                {isMenuOpen ? <CloseIcon style={{marginRight: 5}}/> : <MenuIcon/>}
            </HeaderMenuIcon>

            <Nav>
                <NavLink  href="#about" onClick={(e) => {navigate("/home"); smoothScroll(e, "about")}}>Sobre Nós</NavLink>
                <NavLink href="#plans" onClick={(e) => {navigate("/home"); smoothScroll(e, "plans")}}>Planos</NavLink>
                <NavLink href="#contact" onClick={(e) => {navigate("/home"); smoothScroll(e, "contact")}}>Contato</NavLink>
                <Button onClick={() => isLogged  ? navigate("/login") : navigate("/client")}>Área do Cliente</Button>
            </Nav>

            <Sidebar isOpen={isMenuOpen}>
                <NavLink  href="#about" onClick={(e) => {navigate("/home"); smoothScroll(e, "about")}}>Sobre Nós</NavLink>
                <NavLink href="#plans" onClick={(e) => {navigate("/home"); smoothScroll(e, "plans")}}>Planos</NavLink>
                <NavLink href="#contact" onClick={(e) => {navigate("/home"); smoothScroll(e, "contact")}}>Contato</NavLink>
                <Button onClick={() => isLogged  ? navigate("/login") : navigate("/client")}>Área do Cliente</Button>
            </Sidebar>
        </Container>
    );
};

export default Header;