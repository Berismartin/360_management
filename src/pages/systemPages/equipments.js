import Sidebar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import BreadCrumb from "../../components/BreadCrumb";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";  
import { waveform } from "ldrs";
import Skeleton from "../../components/Skeleton";
import { Link } from 'react-router-dom';
import EquipmentCard from '../../reusable/EquipmentsCards';

const Equipments = () => {
  const url = process.env.REACT_APP_API;
  const token = sessionStorage.getItem("accessToken");
  const [isLoading, setisLoading] = useState(false); 
  const [equipments, setEquipments] = useState([]);
  waveform.register();
 

  const fetchEquipments = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(`${url}/system/get_data/equipments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else {
        setEquipments(response.data);
      }
      console.log(response.data);
    } catch (err) {
      //   toast.error(err.message);
    } finally {
      setisLoading(false);
    }
  };

 
  useEffect(() => {
    fetchEquipments();
  }, []);
  return (
    <div>
      <TopNav />
      <Toaster /> 
      <div className="flex ">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["System", "Manage Equipments"]} />

          <div className="my-5">
          <div className="flex justify-around">
              <Link to='/system/equipment/create'>
              <div className="relative bg-base-300  cursor-pointer">
                <div className="absolute inset-0 bg-center dark:bg-black"></div>
                <div className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                  <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="animate-fade-in opacity-10 block h-full w-full scale-100 transform object-cover object-center  transition duration-300 group-hover:scale-110"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"                      />
                    </svg>
  
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className=" text-2xl font-bold text-white shadow-xl">
                      Register Equipment
                    </h1>
                    <h1 className="text-sm font-light mt-4 text-gray-200 shadow-xl">
                      Create a equipment record
                    </h1>
                  </div>
                </div>
              </div>
              </Link>
              
              {/* <Link  to='/manage/videos/category/'> */}
              <div className="relative bg-base-300 cursor-pointer">
                <div className="absolute inset-0 bg-center dark:bg-black"></div>
                <div className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                  <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="animate-fade-in opacity-10 block h-full w-full scale-100 transform object-cover object-center  transition duration-300  group-hover:scale-110"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"                      />
                    </svg> 

                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className=" text-2xl font-bold text-white shadow-xl">
                      Statistics
                    </h1>
                    <h1 className="text-sm font-light mt-4 text-gray-200 shadow-xl">
                      Analyze Your Equipment performance
                    </h1>
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </div>
          </div>
          <div className="mt-9 px-5"> 
            <h1 className="text-2xl font-bold">All Equipments</h1>
            <div className="mt-4 ">
              { isLoading ? (
               <div>
                 <Skeleton />
                 <Skeleton />
                </div>
              ): (
                <div>
                   <EquipmentCard  equipments={equipments} url = { url } />
                </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipments;
