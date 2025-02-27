import { List, ListItemText } from "@mui/material";
import { ErrorOutline, ExitToApp, MonetizationOnOutlined } from "@mui/icons-material";
import { Logo, LogoContainer } from "../../styles/HeaderStyle";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/home-assets/logo-quadrado-v2.png';
import { SidebarDrawer, SidebarListItem, SidebarListItemIcon, SidebarListItemText } from "../../styles/SidebarStyles";
import SettingsIcon from '@mui/icons-material/Settings';


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
                <SidebarListItem onClick={() => setActivePage("member")}  style={ activePage === "member" ? { backgroundColor: "#ccc"} : {} }>
                    <SidebarListItemIcon><ErrorOutline style={ activePage === "member" ? { color: "black" } : {} }/></SidebarListItemIcon>
                    <SidebarListItemText primary="Meu Plano"  style={ activePage === "member" ? { color: "black" } : {} }/>
                </SidebarListItem>
                <SidebarListItem onClick={() => setActivePage("payments")} style={ activePage === "payments" ? { backgroundColor: "#ccc"} : {} }>
                    <SidebarListItemIcon><MonetizationOnOutlined style={ activePage === "payments" ? { color: "black" } : {} } /></SidebarListItemIcon>
                    <SidebarListItemText primary="Pagamentos" style={ activePage === "payments" ? { color: "black" } : {} }/>
                </SidebarListItem>
                <SidebarListItem onClick={() => setActivePage("settings")} style={ activePage === "settings" ? { backgroundColor: "#ccc"} : {} }>
                    <SidebarListItemIcon><SettingsIcon style={ activePage === "settings" ? { color: "black" } : {} }/></SidebarListItemIcon>
                    <ListItemText primary="Configurações" style={ activePage === "settings" ? { color: "black" } : {} }/>
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