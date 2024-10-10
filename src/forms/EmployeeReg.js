import Sidebar from "../components/SideBar";
import TopNav from "../components/TopNav";
import BreadCrumb from "../components/BreadCrumb";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { waveform } from "ldrs";

const EmployeeReg = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setNationalID] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfHire, setDateOfHire] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_API;
  const token = sessionStorage.getItem("accessToken");

  const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];
  const fileTypesresume = ["PDF"];
  const [resume, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [departments, setdepartments] = useState([]);

  const handleChangeResume = (resume) => {
    setFile(resume);
  };
  const handleChangePhoto = (photo) => {
    setPhoto(photo);
  };
  waveform.register();

  const fetchData = async () => {
    // setisLoading(true);
    try {
      const response = await axios.get(`${url}/system/get_data/departments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else {
        setdepartments(response.data);
      }
      console.log(response.data);
    } catch (err) {
      //   toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !name ||
      !dob ||
      !email ||
      !gender ||
      !position ||
      !department ||
      !resume ||
      !photo
    ) {
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("department", department);
    formData.append("salary", salary);
    formData.append("dateOfHire", dateOfHire);
    formData.append("resume", resume);
    formData.append("photo", photo);

    console.log(email);

    try {
      const response = await axios.post(
        `${url}/systems/employees/register`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      if (response.data.status === 1) {
        toast.success("Employee registered successfully");
      } else {
        throw new Error("Failed to register employee");
      }
    } catch (e) {
      toast.error("Failed to add employee!");
      return;
    } finally {
      setIsLoading(false);
      setName("");
      setDob("");
      setGender("");
      setNationalID("");
      setPosition("");
      setDepartment("");
      setSalary("");
      setDateOfHire("");
      setFile(null);
      setPhoto(null);
    }
  };

  const errorImageSize = () => {
    toast.error("Image size is too big!");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <TopNav />
      <Toaster />
      <div className="flex ">
        <Sidebar />
        <div className="p-5  w-full max-h-[90vh] overflow-scroll">
          <div className="xl:w-1/2 mx-auto">
            <BreadCrumb page={["System", "Register Employee"]} />

            <div className="mt-5 bg-base-300 p-5 rounded-xl ">
              <h3 className="text-xl">Register New Employee</h3>
              <form className="mt-5" onSubmit={handleSubmit}>
                <div className="mt-8">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    type="text"
                    placeholder="Employee Name"
                    className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="mt-8">
                  <label>Date of Birth</label>
                  <input
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="mt-8">
                  <select
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="mt-8">
                  <input
                    required
                    value={email}
                    onChange={(e) => setNationalID(e.target.value)}
                    name="nationalID"
                    type="email"
                    placeholder="Enter Email"
                    className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="mt-8">
                  <input
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    name="position"
                    type="text"
                    placeholder="Position"
                    className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
                  />
                </div>
                <div className="mt-8">
                  <select
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    name="department"
                    className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500"
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {departments.length > 0 &&
                      departments.map((dep, key) => (
                        <option value={dep.id} key={key}>
                          {dep.department}
                        </option>
                      ))}
                  </select>
                </div>

                {/* <div className="mt-8"> 
                  <input required value={salary} onChange={(e) => setSalary(e.target.value)} name="salary" type="number" placeholder="Salary" className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500" />
                </div> */}
                {/* <div className="mt-8"> 
                  <input required value={dateOfHire} onChange={(e) => setDateOfHire(e.target.value)} name="dateOfHire" type="date" placeholder="Date of Hire" className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none focus:border-gray-500" />
                </div> */}
                <div className="mt-8">
                  <p className="lead">Upload Resume</p>
                  <FileUploader
                    dropMessageStyle={{ width: "100%" }}
                    handleChange={handleChangeResume}
                    name="file"
                    types={fileTypesresume}
                    maxSize="2"
                    onSizeError={errorImageSize}
                  />
                </div>
                <div className="mt-8">
                  <p className="lead">Upload Photo</p>
                  <FileUploader
                    dropMessageStyle={{ width: "100%" }}
                    handleChange={handleChangePhoto}
                    name="file"
                    types={fileTypes}
                    maxSize="2"
                    onSizeError={errorImageSize}
                  />
                </div>

                <div className="mt-8 flex">
                  {resume && (
                    <div className="mx-auto mt-4">
                      <p className="text-center">Resume Preview</p>
                      <iframe
                        src={URL.createObjectURL(resume)}
                        title="Resume Preview"
                        className="mx-auto"
                        style={{ height: "400px", width: "100%" }}
                      ></iframe>
                      <a
                        href={URL.createObjectURL(resume)}
                        download="resume.pdf"
                        className="mt-2 block text-center text-blue-500 underline"
                      >
                        Download Resume
                      </a>
                    </div>
                  )}

                  {photo && (
                    <img
                      src={URL.createObjectURL(photo)}
                      className="mx-auto"
                      alt="Photo Preview"
                      style={{ height: "auto", width: "200px" }}
                    />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="button btn-primary w-full mx-auto py-2 my-6 md:px-12 rounded-lg"
                >
                  {isLoading ? (
                    <l-waveform
                      size="25"
                      stroke="3.5"
                      speed="1"
                      color="white"
                    ></l-waveform>
                  ) : (
                    "Apply"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReg;
