import Sidebar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import BreadCrumb from "../../components/BreadCrumb";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import ModalForm from "../../forms/ModalForm";
import { waveform } from "ldrs";
import Skeleton from "../../components/Skeleton";

const Departments = () => {
  const url = process.env.REACT_APP_API;
  const token = sessionStorage.getItem("accessToken");
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  waveform.register();

  const openModal = (dept = null) => {
    if (dept) {
      setIsEditing(true);
      setSelectedDepartment(dept);
      setDepartment(dept.department);
    } else {
      setIsEditing(false);
      setDepartment("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDepartment("");
    setSelectedDepartment(null);
  };

  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/system/get_data/departments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else {
        setDepartments(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createDepartment = async () => {
    if (department.trim() === "") {
      toast.error("Fill in department title");
    } else {
      try {
        setIsLoading(true);
        const data = new FormData();
        data.append("title", department);
        const response = await axios.post(
          `${url}/systems/departments/create`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.status === 1) {
          toast.success("Department created successfully");
          fetchDepartments();
        } else {
          throw new Error("Failed to create department");
        }
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
        closeModal();
      }
    }
  };

  const updateDepartment = async () => {
    if (department.trim() === "") {
      toast.error("Fill in department title");
    } else {
      try {
        setIsLoading(true);
        const data = new FormData();
        data.append("title", department);
        const response = await axios.put(
          `${url}/systems/departments/update/${selectedDepartment.id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
 
        if (response.data.status === 1) {
          toast.success("Department updated successfully");
          fetchDepartments();
        } else {
          throw new Error("Failed to update department");
        }
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
        closeModal();
      }
    }
  };

  const deleteDepartment = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${url}/systems/departments/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status === 1) {
        toast.success("Department deleted successfully");
        fetchDepartments();
      } else {
        throw new Error("Failed to delete department");
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div>
      <TopNav />
      <Toaster />
      <ModalForm
        isOpen={isModalOpen}
        title={isEditing ? "Edit Department" : "Add Department"}
        onClose={closeModal}
      >
        <div className="mt-4">
          <input
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            name="title"
            type="text"
            placeholder="Department Title"
            className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="text-center">
          <button
            onClick={isEditing ? updateDepartment : createDepartment}
            disabled={isLoading}
            className="button btn-primary w-1/2 mx-auto py-2 my-6 md:px-12 rounded-lg"
          >
            {isLoading ? (
              <l-waveform size="25" stroke="3.5" speed="1" color="white"></l-waveform>
            ) : isEditing ? (
              "Update Department"
            ) : (
              "Add Department"
            )}
          </button>
        </div>
      </ModalForm>
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["System", "Manage Departments"]} />
          <div className="mt-5">
            <div className="container flex justify-between items-center">
              <h2 className="bold">360 Departments</h2>
              <div>
                <button
                  className="btn btn-sm btn-primary"
                  title="Add Department"
                  onClick={() => openModal()}
                >
                  Create Department
                </button>
              </div>
            </div>
            <div className="mt-4">
              {isLoading ? (
                <div>
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : (
                <div>
                  {departments.map((dept, index) => (
                    <div key={index} className="flex items-center p-2 bg-base-300 rounded-xl shadow-md mt-3">
                      <div className="flex-1 text-sm text-gray-200 ps-3">{dept.department}</div>
                      <div className="flex-shrink-0">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          title="Edit Department"
                          onClick={() => openModal(dept)}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 btn btn-sm btn-outline-danger"
                          title="Delete Department"
                          onClick={() => deleteDepartment(dept.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
