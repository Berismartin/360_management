import ToggleButton from './ToggleButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const TopNav = () => {
const navigate = useNavigate();
  const logout = () => { 
    sessionStorage.removeItem("accessToken");   
    
    navigate("/");  
  };


  return (
    <div>
      <div className="navbar shadow-md bg-base-300">
        <div className="flex-1">
        <div className="flex ms-4 items-center justify-between">
						<h2><span className="text-3xl">Campus</span> 360</h2>
						<button className="btn btn-ghost">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-800">
								<rect width="352" height="32" x="80" y="96"></rect>
								<rect width="352" height="32" x="80" y="240"></rect>
								<rect width="352" height="32" x="80" y="384"></rect>
							</svg>
						</button>
					</div>
        </div> 
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div>
            <button className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>

            </button>
            <ToggleButton /> 
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to='/settings'>Settings</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
