import Sidebar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import BreadCrumb from "../../components/BreadCrumb";
import { Toaster, toast } from "react-hot-toast";

const Doccuments = () => {
    return ( 
        <div>
        <TopNav />
        <Toaster />
        <div className="flex ">
          <Sidebar />
          <div className="p-5 w-full max-h-[90vh] overflow-scroll">
            <BreadCrumb page={["System", "Manage System Doccuments"]} />
  
            <div className="my-5">
              <div className="text-end">
                  {/* <button className="btn btn-primary">
                      Add a salary
                  </button> */}
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
                              First
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Last
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Handle
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              1
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                          </tr>
                          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              2
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              Thornton
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">@fat</td>
                          </tr>
                          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              3
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Larry</td>
                            <td className="whitespace-nowrap px-6 py-4">Wild</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              @twitter
                            </td>
                          </tr>
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
}
 
export default Doccuments;