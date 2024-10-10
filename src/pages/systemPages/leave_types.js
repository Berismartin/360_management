import Sidebar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import BreadCrumb from "../../components/BreadCrumb";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { waveform } from "ldrs";

const LeaveTypes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leavetype, setleavetype] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [leavetypes, setleavetypes] = useState([]);
  waveform.register();
  const url = process.env.REACT_APP_API;
  const token = sessionStorage.getItem("accessToken");

  const handlesubmit = async () => { 
    if (leavetype.trim() === "") {
      toast.error("Fill in leave title");
    } else {
      try {
        
        setisLoading(true); 
        const response = await axios.post(
          `${url}/systems/leave_types/create`,
          {leavetype},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(response.data);
        if (response.data.status === 1) {
          toast.success("leave Type created successfully");
          // fetchleaves();
        } else {
          throw new Error("Failed to create leave type");
        }
      } catch (e) {
        toast.error(e.message);
      } finally {
        setisLoading(false);
        setleavetype("");
        fetchData();
        closeModal();
      }
    }
  };


  const fetchData = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(`${url}/system/get_data/leave_types`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data);
      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else {
        setleavetypes(response.data);
      }
      // console.log(response.data);
    } catch (err) {
      //   toast.error(err.message);
    } finally {
      setisLoading(false);
    }
  };

  const openModal = () => {
    console.log('opened');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchData();
  }
,[])

  return (
    <div>
      <TopNav />
      <Toaster />
      <div className="flex ">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["System", "Manage Leave Types"]} />
          {/* modal */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-slate-800 rounded-lg p-8 w-96 shadow-lg relative">
                <h2 className="text-xl font-bold mb-4">Add New Leave Type</h2>
                    <div className="conatiner">
                      <div className="my-4">
                        <label>Leave Type</label>
                        <input required value={leavetype} onChange={(e) => setleavetype(e.target.value)} name="title" type="text" placeholder="Enter Leave Type" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                      </div>
                    </div> 
                    <button
                      onClick={handlesubmit}
                      disabled={isLoading}
                      className="button btn-primary w-1/2 mx-auto py-2 my-6 md:px-12 rounded-lg"
                    >
                      {isLoading ? (
                        <l-waveform
                          size="25"
                          stroke="3.5"
                          speed="1"
                          color="white"
                        ></l-waveform>
                      ) : (
                        "Submit"
                      )}
                    </button>
                        </div>
                      </div>
                    )} 

          <div className="my-5">
            <div className="text-end">
                <button className="btn btn-primary" onClick={openModal}
                >
                    Add Leave Type
                </button>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full border rounded-sm text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            #
                          </th> 
                          <th scope="col" className="px-6 py-4">
                            Leave Types
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        { leavetypes.map((leavetype, key) => 
                        
                        <tr key={key} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {++key}
                          </td> 
                          <td className="whitespace-nowrap px-6 py-4">{leavetype.leave_type}</td>
                        </tr>
                        )}
                       
                         
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveTypes;
