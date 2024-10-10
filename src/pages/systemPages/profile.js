import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import BreadCrumb from "../../components/BreadCrumb";
import { Toaster, toast } from "react-hot-toast";
import { waveform } from "ldrs";
import axios from "axios";

const ProfilePage = () => {
  const url = process.env.REACT_APP_API;
  const token = sessionStorage.getItem("accessToken");
  const [profile, setProfile] = useState({});
  const [isLoading, setisLoading] = useState(false);

  waveform.register();

  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const fetchData = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(`${url}/system/fetch_user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    //   console.log(response.data);
      if (response.data.status === 0) {
        toast.error(response.data.message);
      } else {
              console.log(response.data); 
        setProfile(response.data);
      }
      // console.log(response.data);
    } catch (err) {
      //   toast.error(err.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <div>
        <TopNav />
        <Toaster />
        <div className="flex ">
          <Sidebar />
          <div className="p-5 w-full max-h-[90vh] overflow-scroll">
            <BreadCrumb page={["System", "Manage Departments"]} />

            <div className=" p-6 rounded-lg shadow-lg w-full max-w-md">
              {isLoading ? (
                <div>
                  <l-waveform
                    size="25"
                    stroke="3.5"
                    speed="1"
                    color="white"
                  ></l-waveform>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col items-center">
                    {/* Profile Picture */}
                    <img
                      src={profile.img}
                      alt="Profile"
                      className="w-24 h-24 rounded-full shadow-lg mb-4"
                    />

                    {/* Name and Email */}
                    <h1 className="text-2xl font-semibold text-gray-300 mb-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profile.username}
                          onChange={handleInputChange}
                          className="input input-bordered w-full"
                        />
                      ) : (
                        profile.username
                      )}
                    </h1>
                    <p className="text-gray-300 mb-4">
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          className="input input-bordered w-full"
                        />
                      ) : (
                        profile.email
                      )}
                    </p>

                    {/* Bio Section */}
                    <div className="w-full">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Role:
                      </h2>
                      {isEditing ? (
                        <textarea
                          name="role"
                          value={profile.role}
                          onChange={handleInputChange}
                          className="textarea textarea-bordered w-full"
                        />
                      ) : (
                        <p className="text-gray-300">{profile.role}</p>
                      )}
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={handleEditToggle}
                      className="mt-6 btn btn-primary w-full"
                    >
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
