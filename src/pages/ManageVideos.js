import Sidebar from "../components/SideBar";
import TopNav from "../components/TopNav";
import BreadCrumb from "../components/BreadCrumb";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { ring } from "ldrs";
import VideoCards from "../reusable/videoCards";
import { Link } from 'react-router-dom';

const ManageVideos = () => {
  const url = process.env.REACT_APP_API;
  const [videos, setVideos] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const [isloading, setisLoading] = useState(false);
  ring.register();

  // Default values shown

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `${url}/site_management/videos/allvideos`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else {
        setVideos(response.data); 
        console.log(response.data)
      }
      console.log(response.data);
    } catch (err) {
      //   toast.error(err.message);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div>
      <TopNav />
      <Toaster />
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["Site Management", "Manage Videos"]} />

          <div className="mt-5">
            <div className="flex justify-around">
              <Link to='/manage/videos/create'>
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
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className=" text-2xl font-bold text-white shadow-xl">
                      Upload Video
                    </h1>
                    <h1 className="text-sm font-light mt-4 text-gray-200 shadow-xl">
                      Create a new video record
                    </h1>
                  </div>
                </div>
              </div>
              </Link>
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
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className=" text-2xl font-bold text-white shadow-xl">
                      Remove Video
                    </h1>
                    <h1 className="text-sm font-light mt-4 text-gray-200 shadow-xl">
                      Delete a video Record
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider mt-20">Site Videos</div>
            {isloading ? (
              <div className="flex justify-center items-center h-full">
                <l-ring
                  size="50"
                  stroke="5"
                  bg-opacity="0"
                  speed="1"
                  color="white"
                ></l-ring>
              </div>
            ) : (
              <VideoCards videos= {videos} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageVideos;
