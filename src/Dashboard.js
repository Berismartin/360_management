import Sidebar from "./components/SideBar";
import TopNav from "./components/TopNav";
import BreadCrumb from "./components/BreadCrumb";
import axios from 'axios';
import { useEffect, useState } from 'react' 
import { Link } from "react-router-dom"; 
import SubscriberChart from "./components/chartMd"
import VideoCard from './reusable/videoCards'
import SpaceCard from './reusable/SpaceCards'
const DashboardHome = () => {
  const url = process.env.REACT_APP_API;
  const [users, setUsers] = useState([]);
  const [eqp, setEqp] = useState([]);
  const [deps, setDeps] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const [videos, setVideos] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [segments, setSegments] = useState([]);
  const [sub, setSub] = useState([]);
  const [isloading, setisLoading] = useState(false); 

 useEffect ( () => { 
  const fetchdata = async () => {
    setisLoading(true);
    try { // Set loading state before fetching data
    
      // Fetch users
      const usersResponse = await axios.get(`${url}/system/get_data/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(usersResponse.data);
    
      // Fetch equipment
      const eqpResponse = await axios.get(`${url}/system/get_data/equipments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEqp(eqpResponse.data);
    
      // Fetch departments
      const depsResponse = await axios.get(`${url}/system/get_data/departments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeps(depsResponse.data);
    
      // Fetch videos
      const videosResponse = await axios.get(`${url}/system/get_data/videos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(videosResponse.data);
    
      // Fetch spaces
      const spacesResponse = await axios.get(`${url}/system/get_data/spaces`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpaces(spacesResponse.data);
    
      // Fetch segments
      const segmentsResponse = await axios.get(`${url}/system/get_data/segments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSegments(segmentsResponse.data);
    
      const subResponse = await axios.get(`${url}/system/get_data/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSub(subResponse.data);
    
    } catch (err) {
      console.error(err.message);
    } finally {
      setisLoading(false);
    }
    
  }
  fetchdata();
 }, [])


 

const subscriberData = [
  { label: 'January', value: 3393 },
  { label: 'February', value: 3923},
  { label: 'March', value: 4567 },
  { label: 'April', value: 5129 },
  { label: 'May', value: 5532 },
];
  return (
    <div>
      <TopNav />
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["System", "Manage Requests"]} />
 
          <div className="my-5"> 
            <div className="  dark:bg-gray-900">
            <div className="grid gap-7  sm:grid-cols-2 lg:grid-cols-4 ">
          <Link to ="/system/employees">
          <div className="p-5 bg-base-300 rounded  shadow-sm dark:bg-gray-800">
            <div className="text-base text-gray-400 dark:text-gray-300">Employees</div>
            <div className="flex items-center pt-1">
              <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{users && users.length}</div>  
            </div>
          </div>
          </Link>
          <Link to="/system/equipments">
          <div className="p-5 bg-base-300 rounded  shadow-sm dark:bg-gray-800">
            <div className="text-base text-gray-400 dark:text-gray-300">Equipments</div>
            <div className="flex items-center pt-1">
              <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{eqp && eqp.length}</div>
              {/* <span className="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>2.5%</span>
              </span> */}
            </div>
          </div></Link>
          <Link to="/system/departments">
          <div className="p-5 bg-base-300 rounded  shadow-sm dark:bg-gray-800">
            <div className="text-base text-gray-400 dark:text-gray-300">Departments</div>
            <div className="flex items-center pt-1">
              <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{deps && deps.length}</div>
              {/* <span className="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full text-green-600 bg-green-100 dark:bg-green-900 dark:text-emerald-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>5.2%</span>
              </span> */}
            </div>
          </div>
          </Link>
          <Link to="/users">
          <div className="p-5 bg-base-300 rounded  shadow-sm dark:bg-gray-800">
            <div className="text-base text-gray-400 dark:text-gray-300">Subscribers</div>
            <div className="flex items-center pt-1">
              <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">5532</div>
              {/* <span className="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full text-green-600 bg-green-100 dark:bg-green-900 dark:text-emerald-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>2.2%</span>
              </span> */}
            </div>
          </div>
          </Link>
        </div>
            </div>
            <div className="  my-5 dark:bg-gray-900">
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/manage/videos">
          <div className="p-5 bg-base-300 rounded  shadow-sm dark:bg-gray-800">
            <div className="text-base text-gray-400 dark:text-gray-300">Videos</div>
            <div className="flex items-center pt-1">
              <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{videos && videos.length}</div>
              {/* <span className="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full text-green-600 bg-green-100 dark:bg-green-900 dark:text-emerald-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>1.8%</span>
              </span> */}
            </div>
          </div>
          </Link>
          <Link to="/manage/spaces">
          <div className="p-5 bg-base-300 rounded  shadow-sm dark:bg-gray-800">
            <div className="text-base text-gray-400 dark:text-gray-300">Spaces</div>
            <div className="flex items-center pt-1">
              <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{spaces && spaces.length}</div>
              {/* <span className="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>2.5%</span>
              </span> */}
            </div>
          </div>
          </Link>
          <Link to="/manage/videos/category">
          <div className="p-5 bg-base-300 rounded  shadow-sm dark:bg-gray-800">
            <div className="text-base text-gray-400 dark:text-gray-300">Segments</div>
            <div className="flex items-center pt-1">
              <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{segments && segments.length}</div>
              {/* <span className="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full text-green-600 bg-green-100 dark:bg-green-900 dark:text-emerald-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>5.2%</span>
              </span> */}
            </div>
          </div>
          </Link>
          <Link to="/users">
          <div className="p-5 bg-base-300 rounded  shadow-sm dark:bg-gray-800">
            <div className="text-base text-gray-400 dark:text-gray-300">system users</div>
            <div className="flex items-center pt-1">
              <div className="text-2xl font-bold text-gray-100 dark:text-gray-100">{ sub  && sub.length}</div>
              {/* <span className="flex items-center px-2 py-0.5 mx-2 text-sm rounded-full text-green-600 bg-green-100 dark:bg-green-900 dark:text-emerald-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>2.2%</span>
              </span> */}
            </div>
          </div>
          </Link>
        </div>
            </div>


     <div className="grid grid-cols-2 gap-4">
     <div className="p-4 max-w-md bg-base-300 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-base-500 dark:text-white">Active Subscribers</h3>
          <Link to="/users" className="text-sm font-medium text-white hover:underline dark:text-white">
            View all
          </Link>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {sub && sub.map((subs, key) => (
              key < 5 && (
                <li key={key} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={url + '/' + subs.img || subs.img}
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-base-500 truncate dark:text-white">
                        {subs.username} {/* Assuming subs has a name property */}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {subs.email} {/* Assuming subs has an email property */}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-base-500 dark:text-white">
                      
                      {subs.verified == 1 ? (<><span className="rounded-full p-1 bg-green-600"></span>Active</>): (<><span className="rounded-full p-1 bg-red-600"></span>Inactive</>)}
                    </div>
                  </div>
                </li>
              )
            ))}

             
          </ul>
        </div>
      </div> 
        <SubscriberChart data={subscriberData} />  
      </div>

          </div>

          <div>
            <h3 className="text-5xl my-10">Trending videos</h3>
            { videos && <VideoCard videos={videos.slice(0,6)} />}
          </div>

          <div>
            <h3 className="text-5xl my-10">Trending Spaces</h3>
            {spaces && <SpaceCard spaces={spaces.slice(0,6)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
