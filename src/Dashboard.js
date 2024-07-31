import Sidebar from "./components/SideBar";
import TopNav from "./components/TopNav";
import BreadCrumb from "./components/BreadCrumb";

const DashboardHome = () => {
  return (
    <div>
      <TopNav />
      <div className="flex">
        <Sidebar />
        <div className="p-5">
          {sessionStorage.getItem('accessToken')}
          <BreadCrumb  page={['Dashboard', 'All Details']}/>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
