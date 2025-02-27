import { JSX, useState } from "react";
import Sidebar from "../components/sidebars/SidebarManager";
import Dashboard from "../components/manager/Dashboard";
import Plans from "../components/manager/Plans";
import Members from "../components/manager/Members";

const ManagerPage: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("dashboard");

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
    <>
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div>{renderPage()}</div>
    </>
  );
};

export default ManagerPage;
