import Sidebar from "./components/SideBar";
import TopNav from "./components/TopNav";
import BreadCrumb from "./components/BreadCrumb";
import axios from 'axios';
import { useEffect } from 'react'

const DashboardHome = () => {

 useEffect ( () => {
  const getjumia = async () => {
    const options = {
      method: 'POST',
      url: 'https://jumia-pricing-data1.p.rapidapi.com/api/v1.0/site/jumia',
      headers: {
        'x-rapidapi-key': '684a8f266bmsh795e3f5f3b02e79p1ca9a0jsne68cb78493e1',
        'x-rapidapi-host': 'jumia-pricing-data1.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        url: 'https://www.jumia.com.ng/generic-victory-with-headrest-mesh-chair-293821847.html',
        username: 'user'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
   }
   getjumia();
 }, [])
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
