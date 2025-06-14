import { List, ListItemText } from "@mui/material";
import { ErrorOutline, ExitToApp, MonetizationOnOutlined } from "@mui/icons-material";
import { Logo, LogoContainer } from "../../styles/HeaderStyle";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/home-assets/logo-quadrado-v2.png';
import { SidebarDrawer, SidebarListItem, SidebarListItemIcon, SidebarListItemText } from "../../styles/SidebarStyles";
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme, useMediaQuery } from "@mui/material";


interface SidebarProps {
  setActivePage: (page: string) => void;
  activePage: string;
  open: boolean;
  onClose: () => void;

}

const drawerWidth: number = 240;

const Sidebar: React.FC<SidebarProps> = ({ setActivePage, activePage, open, onClose }) => {

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const drawerContent = (
        <>
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
        </>
    )

    return (
         <SidebarDrawer
              variant={isMobile ? "temporary" : "permanent"}
              open={isMobile ? open : true}
              onClose={onClose}
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              {drawerContent}
            </SidebarDrawer>
    );
};

export default Sidebar;