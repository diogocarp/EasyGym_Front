import { Drawer, List } from "@mui/material";
import { Dashboard, FitnessCenter, AccountBox, ExitToApp } from "@mui/icons-material";
import { Logo, LogoContainer } from "../../styles/HeaderStyle";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/home-assets/logo-quadrado-v2.png';
import {
  SidebarDrawer,
  SidebarListItem,
  SidebarListItemIcon,
  SidebarListItemText
} from "../../styles/SidebarStyles";
import { useTheme, useMediaQuery } from "@mui/material";

const drawerWidth: number = 240;

interface SidebarProps {
  setActivePage: (page: string) => void;
  activePage: string;
  open: boolean;
  onClose: () => void;
}

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
        <SidebarListItem onClick={() => setActivePage("dashboard")} style={activePage === "dashboard" ? { backgroundColor: "#ccc" } : {}}>
          <SidebarListItemIcon><Dashboard style={activePage === "dashboard" ? { color: "#252525" } : {}} /></SidebarListItemIcon>
          <SidebarListItemText style={activePage === "dashboard" ? { color: "#252525" } : {}} primary="Painel" />
        </SidebarListItem>

        <SidebarListItem onClick={() => setActivePage("plans")} style={activePage === "plans" ? { backgroundColor: "#ccc" } : {}}>
          <SidebarListItemIcon><FitnessCenter style={activePage === "plans" ? { color: "#252525" } : {}} /></SidebarListItemIcon>
          <SidebarListItemText style={activePage === "plans" ? { color: "#252525" } : {}} primary="Planos" />
        </SidebarListItem>

        <SidebarListItem onClick={() => setActivePage("members")} style={activePage === "members" ? { backgroundColor: "#ccc" } : {}}>
          <SidebarListItemIcon><AccountBox style={activePage === "members" ? { color: "#252525" } : {}} /></SidebarListItemIcon>
          <SidebarListItemText style={activePage === "members" ? { color: "#252525" } : {}} primary="Alunos" />
        </SidebarListItem>

        <SidebarListItem onClick={() => navigate("/")}>
          <SidebarListItemIcon><ExitToApp /></SidebarListItemIcon>
          <SidebarListItemText primary="Sair" />
        </SidebarListItem>
      </List>
    </>
  );

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
