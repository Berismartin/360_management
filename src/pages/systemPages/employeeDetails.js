import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import BreadCrumb from "../../components/BreadCrumb";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployeeDetailsPage = () => {
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const url = process.env.REACT_APP_API;
  const token = sessionStorage.getItem("accessToken");
  const { id } = useParams();
  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`${url}/system/employees/details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);
      setEmployee(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  return (
    <div>
      <TopNav />
      <Toaster />
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["System", "Employee Details"]} />

          <div className=" shadow-lg rounded-lg p-6 max-w-lg mx-auto">
            {isLoading ? (
              <div className="text-center">
                <div className="loader">Loading...</div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <img
                    src={url+ '/' + employee.photo || "/default-avatar.png"}
                    alt="Employee"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold text-gray-500">{employee.name}</h2>
                  <p className="text-gray-500">{employee.position}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Email:</span>
                    <span className="text-gray-500">{employee.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Date of Birth:</span>
                    <span className="text-gray-500">{new Date(employee.dob).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Gender:</span>
                    <span className="text-gray-500">{employee.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Role:</span>
                    <span className="text-gray-500">{employee.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Department:</span>
                    <span className="text-gray-500">{employee.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Salary:</span>
                    <span className="text-gray-500">UGX {employee.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Date of Hire:</span>
                    <span className="text-gray-500">{new Date(employee.dateOfHire).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <a
                    href={url + '/' + employee.resume}
                    download
                    className="text-indigo-500 hover:underline"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
