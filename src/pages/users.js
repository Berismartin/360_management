import TopNav from "../components/TopNav";
import Sidebar from "../components/SideBar";
import BreadCrumb from "../components/BreadCrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Skeleton from "../components/Skeleton";
const Users = () => {
  const url = process.env.REACT_APP_API;
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const [isloading, setisLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(`${url}/users/allusers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setisLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <Toaster />
      <TopNav />
      <div className="flex">
        <Sidebar />
        <div className="p-5 container max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["Users", "Users List"]} />

          <div className="container  p-2 rounded-xl  bg-base-300 shadow-xl mt-5">
            <div className="border-b-2 border-grey-200 p-5 flex justify-between">
              <h3 className="text-2xl">Active Users</h3>
              <button className="btn btn-primary">Add User</button>
            </div>
            {isloading ? (
              <Skeleton />
            ) : (
              <div className="w-full">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <th>Profile</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Verified</th>
                      <th>Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{user.username}</div>
                              <div className="text-sm opacity-50">China</div>
                            </div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <th>
                          {user.verified === 1 ? (
                            <button className="btn bg-green-600 btn-xs text-white">
                              Verified
                            </button>
                          ) : (
                            <button className="btn bg-red-600 text-white btn-xs">
                              Not Verified
                            </button>
                          )}
                        </th>
                        <th>
                          <button className="btn btn-sm btn-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                            Customize
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th></th>
                      <th>Profile</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Verified</th>
                      <th>Tools</th>
                      <th></th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
