import  { useState } from "react";
import * as HeaderS from "../styles/HeaderStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(true);

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
        <HeaderS.Container>
            <HeaderS.LogoContainer>
                <HeaderS.Logo src={logo} onClick={()=>navigate("/")}/>
            </HeaderS.LogoContainer>

            <HeaderS.MenuIcon onClick={toggleMenu}>
                {isMenuOpen ? <CloseIcon style={{marginRight:40}}/> : <MenuIcon style={{marginRight:40}}/>}
            </HeaderS.MenuIcon>

            <HeaderS.Nav>
                <HeaderS.NavLink href="#about" onClick={(e) => smoothScroll(e, "about")}>Sobre Nós</HeaderS.NavLink>
                <HeaderS.NavLink href="#plans" onClick={(e) => smoothScroll(e, "plans")}>Planos</HeaderS.NavLink>
                <HeaderS.NavLink href="#contact" onClick={(e) => smoothScroll(e, "contact")}>Contato</HeaderS.NavLink>
                <HeaderS.Button onClick={() => isLogged  ? navigate("/login") : navigate("/client")}>Área do Cliente</HeaderS.Button>
            </HeaderS.Nav>

            <HeaderS.Sidebar isOpen={isMenuOpen}>
                <HeaderS.NavLink href="#about" onClick={(e) => smoothScroll(e, "about")}>Sobre Nós</HeaderS.NavLink>
                <HeaderS.NavLink href="#plans" onClick={(e) => smoothScroll(e, "plans")}>Planos</HeaderS.NavLink>
                <HeaderS.NavLink href="#contact" onClick={(e) => smoothScroll(e, "contact")}>Contato</HeaderS.NavLink>
                <HeaderS.Button onClick={() => isLogged  ? navigate("/login") : navigate("/client")}>Área do Cliente</HeaderS.Button>
            </HeaderS.Sidebar>
        </HeaderS.Container>
    );
};

export default Header;