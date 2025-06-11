import { JSX, useState } from "react";
import Sidebar from "../components/sidebars/SidebarManager";
import Dashboard from "../components/manager/Dashboard";
import Plans from "../components/manager/Plans";
import Members from "../components/manager/Members";
import { useTheme, useMediaQuery, IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const ManagerPage: React.FC = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderPage = (): JSX.Element => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "plans":
        return <Plans />;
      case "members":
        return <Members />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#252525", minHeight: "100vh" }}>
      <Sidebar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          if (isMobile) setDrawerOpen(false); // Fecha após seleção
        }}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      {isMobile && (
        <IconButton onClick={() => setDrawerOpen(true)} style={{ height: 40, width: 40, color: "rgb(37, 37, 37)", backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: "50%", top: 10, left: 10, position: "fixed", fontSize: "20px" }}>
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      )}
      <div style={{ flexGrow: 1, padding: 24 }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default ManagerPage;
