import { List, ListItemText } from "@mui/material";
import { Dashboard, FitnessCenter, AccountBox, ExitToApp } from "@mui/icons-material";
import { Logo, LogoContainer } from "../styles/HeaderStyle";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import { SidebarDrawer, SidebarListItem, SidebarListItemIcon, SidebarListItemText } from "../styles/SidebarStyles";


interface SidebarProps {
    setActivePage: (page: string) => void;
    activePage:string;
}


const Sidebar: React.FC<SidebarProps> = ({ setActivePage, activePage }) => {

    const navigate = useNavigate();

    return (
        <SidebarDrawer variant="permanent" sx={{ flexShrink: 0 }}>
            <LogoContainer>
                <Logo src={logo} onClick={() => navigate("/")} />
            </LogoContainer>
            <List>
                <SidebarListItem onClick={() => setActivePage("dashboard")}  style={ activePage === "dashboard" ? { backgroundColor: "#ccc"} : {} }>
                    <SidebarListItemIcon><Dashboard style={ activePage === "dashboard" ? { color: "black" } : {} }/></SidebarListItemIcon>
                    <SidebarListItemText primary="Painel"  style={ activePage === "dashboard" ? { color: "black" } : {} }/>
                </SidebarListItem>
                <SidebarListItem onClick={() => setActivePage("plans")} style={ activePage === "plans" ? { backgroundColor: "#ccc"} : {} }>
                    <SidebarListItemIcon><FitnessCenter style={ activePage === "plans" ? { color: "black" } : {} } /></SidebarListItemIcon>
                    <SidebarListItemText primary="Planos" style={ activePage === "plans" ? { color: "black" } : {} }/>
                </SidebarListItem>
                <SidebarListItem onClick={() => setActivePage("members")} style={ activePage === "members" ? { backgroundColor: "#ccc"} : {} }>
                    <SidebarListItemIcon><AccountBox style={ activePage === "members" ? { color: "black" } : {} }/></SidebarListItemIcon>
                    <ListItemText primary="Alunos" style={ activePage === "members" ? { color: "black" } : {} }/>
                </SidebarListItem>
                <SidebarListItem onClick={() => navigate("/")}>
                    <SidebarListItemIcon>
                        <ExitToApp/>
                    </SidebarListItemIcon>
                    <SidebarListItemText primary="Sair" />
                </SidebarListItem>


            </List>
        </SidebarDrawer>
    );
};

export default Sidebar;