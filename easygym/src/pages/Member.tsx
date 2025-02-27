import { JSX, useState } from "react";
import Sidebar from "../components/sidebars/SidebarMember";
import MemberPlan from "../components/member/MemberPlan";
import Settings from "../components/member/Settings";
import Payments from "../components/member/Payments";


const MemberPage: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("member");

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
    <>
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div>{renderPage()}</div>
    </>
  );
};

export default MemberPage;
