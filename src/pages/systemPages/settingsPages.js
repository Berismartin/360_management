import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import BreadCrumb from "../../components/BreadCrumb";
import { Toaster, toast } from "react-hot-toast";
import ToggleButton from "../../components/ToggleButton"
const SettingsPage = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    changePassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveChanges = () => {
    // Mock save action, in a real scenario this would involve an API call
    toast.success("Settings saved successfully");
  };

  return (
    <div className="">
      <TopNav />
      <Toaster />
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["System", "Settings"]} />
          <div className="p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-2xl font-semibold text-gray-300 mb-5">
              Settings
            </h1>

            {/* Dark Mode Toggle */}
            <div className="mb-4">
              <label className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-300">
                  Dark Mode
                </span>
                <ToggleButton /> 
              </label>
            </div>

            {/* Notifications Toggle */}
            <div className="mb-4">
              <label className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-300">
                  Notifications
                </span>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleInputChange}
                  className="toggle toggle-primary"
                />
              </label>
            </div>

            {/* Change Password */}
            <div className="mb-4">
              <label className="text-lg font-medium text-gray-300">
                Change Password
              </label>
              <input
                type="password"
                name="changePassword"
                value={settings.changePassword}
                onChange={handleInputChange}
                className="input input-bordered w-full mt-2"
                placeholder="Enter new password"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveChanges}
              className="mt-4 btn btn-primary w-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
