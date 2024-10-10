import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Sidebar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import BreadCrumb from "../../components/BreadCrumb";

const SalaryRecords = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [salaryId, setSalaryId] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const url = process.env.REACT_APP_API;
  const token = sessionStorage.getItem("accessToken");

  // Function to get current month and year
  const getCurrentMonth = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  };

  // Initialize the form with default values
  const resetForm = () => {
    setSalaryId(null);
    setEmployeeId('');
    setMonth(getCurrentMonth()); // Set current month by default
    setAmount('');
    setIsOpen(false);
  };

  // Fetch salary records from the API
  const fetchSalaryRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/system/get_data/salaries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else {
        setSalaryRecords(response.data);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch employees list
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${url}/system/get_data/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.length >= 0) {
        setEmployees(response.data);
      } else {
        toast.error("Failed to fetch employees");
      }
    } catch (err) {
      toast.error("Error fetching employees");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (employeeId.trim() === "" || amount.trim() === "" || month.trim() === "") {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setIsLoading(true);
      const response = salaryId
        ? await axios.put(`${url}/salary/records/${salaryId}`, { employeeId, month, amount }, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : await axios.post(`${url}/systems/salary/create_records`, { employeeId, month, amount }, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // console.log(response.data)
      if (response.data.status === 1) {
        toast.success("Salary record saved successfully");
        fetchSalaryRecords();
      } else {
        throw new Error("Failed to save salary record");
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
      resetForm(); // Reset the form after submission
    }
  };

  // Handle editing of a salary record
  const handleEdit = (record) => {
    setSalaryId(record.id);
    setEmployeeId(record.employeeId);
    setMonth(record.month);
    setAmount(record.amount);
    setIsOpen(true);
  };

  // Handle deletion of a salary record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        setIsLoading(true);
        const response = await axios.delete(`${url}/salary/records/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.status === 1) {
          toast.success("Salary record deleted successfully");
          fetchSalaryRecords();
        } else {
          throw new Error("Failed to delete salary record");
        }
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Open and close the modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => resetForm();

  // Fetch data when component mounts
  useEffect(() => {
    fetchSalaryRecords();
    fetchEmployees();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div>
      <TopNav />
      <Toaster />
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["Payroll", "Manage Salary Records"]} />
          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-slate-800 rounded-lg p-8 w-96 shadow-lg relative">
                <h2 className="text-xl font-bold mb-4 flex justify-between">
                  {salaryId ? "Edit Salary Record" : "Add Salary Record"}
                  <button onClick={closeModal} className="text-red-200">X</button>

                </h2>
                <div className="container">
                  {/* Employee Dropdown */}
                  <div className="my-4">
                    <label>Employee</label>
                    <select
                      required
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="select appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
                    >
                      <option value="">Select Employee</option>
                      {employees && employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name} 
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Month Auto-complete */}
                  <div className="my-4">
                    <label>Month</label>
                    <input
                      required
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      type="text"
                      placeholder="Enter Month (e.g., September 2023)"
                      className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
                    />
                  </div>
                  {/* Salary Amount */}
                  <div className="my-4">
                    <label>Salary Amount</label>
                    <input
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      placeholder="Enter Salary Amount"
                      className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="button btn-primary w-1/2 mx-auto py-2 my-6 md:px-12 rounded-lg"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
               
              </div>
            </div>
          )}
          <div className="my-5">
            <div className="text-end">
              <button className="btn btn-primary" onClick={openModal}>
                Add Salary Record
              </button>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full border rounded-sm text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">#</th>
                          <th scope="col" className="px-6 py-4">Employee</th>
                          <th scope="col" className="px-6 py-4">Month</th>
                          <th scope="col" className="px-6 py-4">Amount</th>
                          <th scope="col" className="px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salaryRecords.map((record, index) => (
                          <tr key={record.id} className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{record.employeeName}</td>
                            <td className="whitespace-nowrap px-6 py-4">{record.month}</td>
                            <td className="whitespace-nowrap px-6 py-4">UGX {record.amount}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <button onClick={() => handleEdit(record)} className="btn btn-slate-500">
                                Edit
                              </button>
                              {/* <button onClick={() => handleDelete(record.id)} className="btn btn-danger">
                                Delete
                              </button> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {isLoading && <p>Loading...</p>}
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

export default SalaryRecords;
