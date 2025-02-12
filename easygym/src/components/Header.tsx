
import * as HeaderS from "../styles/HeaderStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png'

const Header = () => {
    return (

        <HeaderS.Container>
            <HeaderS.LogoContainer>
                <HeaderS.Logo src={logo} />
            </HeaderS.LogoContainer>
            <HeaderS.Nav>
                <HeaderS.NavLink href="#about">Sobre Nós</HeaderS.NavLink>
                <HeaderS.NavLink href="#plans">Planos</HeaderS.NavLink>
                <HeaderS.NavLink href="#contact">Contato</HeaderS.NavLink>
                <HeaderS.Button>Área do Cliente</HeaderS.Button>
            </HeaderS.Nav>
        </HeaderS.Container>

    )
}

export default Header;