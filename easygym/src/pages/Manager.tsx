import { JSX, useState, useEffect } from "react";
import Sidebar from "../components/sidebars/SidebarManager";
import Dashboard from "../components/manager/Dashboard";
import Plans from "../components/manager/Plans";
import Members from "../components/manager/Members";
import Page404 from "./Page404";
import { useTheme, useMediaQuery, IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthApi } from "../api/AuthApi";

const ManagerPage: React.FC = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const sessionRefresh = sessionStorage.getItem("refreshToken");
  const cookieRefresh = Cookies.get("refreshToken");

  useEffect(() => {
    (async () => {

      if (!sessionRefresh && !cookieRefresh) {
        navigate("/login");
      } else {
        const refreshToken = cookieRefresh || sessionRefresh || "";

        const accessToken = await AuthApi.getNewAccessToken(refreshToken);
        const profile = await AuthApi.getProfile(accessToken);

        if (!profile.is_staff) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          navigate("/login");
        }
      }
    })();
  }, [navigate]);

  const renderPage = (): JSX.Element => {
    if (sessionRefresh || cookieRefresh) {
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
    }else{
        return <Page404 />;
    }
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#252525", minHeight: "100vh" }}>
      <Sidebar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          if (isMobile) setDrawerOpen(false);
        }}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      {isMobile && (
        <IconButton onClick={() => setDrawerOpen(true)} style={{ height: 40, width: 40, color: "rgb(37, 37, 37)", backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: "50%", top: 10, left: 10, position: "fixed", fontSize: "20px" }}>
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      )}
      <div style={{ flexGrow: 1 }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default ManagerPage;
