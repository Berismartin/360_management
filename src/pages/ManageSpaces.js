import Sidebar from "../components/SideBar";
import TopNav from "../components/TopNav";
import BreadCrumb from "../components/BreadCrumb";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { ring } from "ldrs";
import SpaceCard from "../reusable/SpaceCards";
import { Link } from "react-router-dom"

const ManageSpaces = () => {
  const url = process.env.REACT_APP_API;
  const [spaces, setSpaces] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const [isloading, setisLoading] = useState(false);
  ring.register();

  // Default values shown

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `${url}/site_management/spaces/allspaces`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else {
        setSpaces(response.data);
      }
      // console.log(response.data);
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
      <div className="flex ">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["Site Management", "Manage spaces"]} />

          <div className="mt-5">
            <div className="flex   justify-around">
              <Link to="/manage/spaces/create">
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
                        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className=" text-2xl font-bold text-white shadow-xl">
                      Upload Space
                    </h1>
                    <h1 className="text-sm font-light mt-4 text-gray-200 shadow-xl">
                      Create a new Space record
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
                        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className=" text-2xl font-bold text-white shadow-xl">
                      Remove Space
                    </h1>
                    <h1 className="text-sm font-light mt-4 text-gray-200 shadow-xl">
                      Delete a Space Record
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider mt-20">Site Spaces</div>
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
              <SpaceCard spaces = {spaces} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSpaces;
