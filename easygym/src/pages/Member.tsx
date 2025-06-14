import { JSX, useState } from "react";
import Sidebar from "../components/sidebars/SidebarMember";
import MemberPlan from "../components/member/MemberPlan";
import Settings from "../components/member/Settings";
import Payments from "../components/member/Payments";
import { useTheme, useMediaQuery, IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';


const MemberPage: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("member");
    const [drawerOpen, setDrawerOpen] = useState(false);
  
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderPage = (): JSX.Element => {
    switch (activePage) {
      case "member":
        return <MemberPlan />;
      case "payments":
        return <Payments />;
      case "settings":
        return <Settings />;
      default:
        return <MemberPlan />;
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

export default MemberPage;
