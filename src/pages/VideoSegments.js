import TopNav from "../components/TopNav";
import Sidebar from "../components/SideBar";
import BreadCrumb from "../components/BreadCrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import { FileUploader } from "react-drag-drop-files";
import { waveform } from 'ldrs';
import EditModal from "../components/modals/EditModal";
const VideoSegments = () => {
  const url = process.env.REACT_APP_API;
  const [segments, setSegments] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const [isloading, setisloading] = useState(false); 
  const [isLoading, setisLoading] = useState(false); 
  const [segment, setSegment] = useState(''); 
 
  const [showDetails, setshowDetails] = useState(false);
  const [seg_details, setSeg_details] = useState({});


  const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];
  const [file, setFile] = useState(null); 

  const handleChange = (file) => {    
    setFile(file);  
};

const errorImageSize = () => {
    toast.error('Image size is too big!');
}

waveform.register();

const [isModalOpen, setIsModalOpen] = useState(false);
 
const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

const fetchSegments = async () => {
    setisloading(true);
    try {
        const response = await axios.get(`${url}/system/get_data/segments`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    setSegments(response.data);
    console.log(response.data);
  } catch (err) {
    toast.error(err.message);
  } finally {
    setisloading(false);
  }
};

const createCategory = async() => {
    if (file) {
        
        if(segment.trim() === '') {
            toast.error('Segment Title is required');
        }else{
            const data = new FormData()
             data.append('file', file);
             data.append('segment', segment);  
            try {
                setisLoading(true);
                const response = await axios.post(`${url}/segments/create_segment`, data, {
                  headers: { Authorization: `Bearer ${token}` },
                }); 
               if(response.data.status === 1){ 
                toast.success("Segment created successfully"); 
               }else{
                    throw new Error('Failed to create segment')
               }
              } catch (err) {
                toast.error(err.message);
              } finally {
                setSegment('');
                setFile('');
                setisLoading(false);
                fetchSegments();
              }
        }
    }else{
        toast.error('No thumbnail selected!');
    }
}

const getDetails = (id) => {
    setSeg_details(segments.filter((segment) => segment.id === id)[0])
    setshowDetails(true)
}

const changeDetails = (segment) => {
  
}

  useEffect(() => {
    

    fetchSegments();
  }, []);
  return (
    <div>
      <Toaster />
      <TopNav />
      <div className="flex">
        <Sidebar />
        <div className="p-5 container max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["Manage Videos", "Category"]} />

          <div className="container  mt-5">
            <div className="p-5 flex justify-between">
              <h3 className="text-2xl">Video Segments</h3> 
            </div>
            <p  onClick={openModal} >Click me</p>
            <div className="grid gap-2 grid-cols-3 ">
              <div className="container col-span-2  p-2 rounded-xl  bg-base-300 shadow-xl">
                {isloading ? <Skeleton /> : 
                <div className="w-full">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <th>Thumbnail</th>
                      <th>Segment</th> 
                      <th>Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                  {segments.map((segment, index) => (
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
                                  src={url + '/' + segment.thumb_img}
                                  alt="Segment thumbnail"
                                />
                              </div>
                            </div> 
                          </div>
                        </td> 
                        <td>
                            <div>
                              <div className="font-bold">{segment.segment_title}</div>
                              <div className="text-sm opacity-50">China</div>
                            </div>
                        </td>
                        <th className="flex items-center justify-around">
                          <button className="btn btn-sm btn-primary" onClick={() => getDetails(segment.id)}> 
                            Edit
                          </button>
                          <button className="btn btn-sm btn-primary" >
                           Delete
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th></th>
                      <th>Thumbnail</th>
                      <th>Segment</th> 
                      <th>Tools</th>
                      <th></th>
                    </tr>
                  </tfoot>
                  </table>
                </div>
                }
              </div>
              <div className=" p-4 rounded-xl  bg-base-300 shadow-xl">
                <div className="form">
                {file && 
                    <img src={URL.createObjectURL(file)} className="mx-auto" alt="" style={{height: 'auto', width: '200px'}} />
                    }
                  <div className="mt-4">
                    <label className="text-gray-500 font-bold md:text-right mb-4 md:mb-0 pr-4">
                      Segment Title
                    </label>
                    <input
                      required
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                      name="title"
                      type="text"
                      placeholder="Enter Segment Title"
                      className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500"
                    />
                    <span className="text-xs">This will appear to the viewers</span>
                  </div>
                  <div className="mt-4 overflow-auto"> 
                            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Drop Thumbnail</label>
                             
                            <FileUploader handleChange={handleChange} className="w-1/2" name="file" types={fileTypes} maxSize="2" onSizeError={errorImageSize}  />
                            
                        </div> 
                  <div className="mt-4">
                  <button disabled={isLoading} onClick={createCategory} className="button btn-primary w-full mx-auto py-2 my-6 md:px-12 rounded-lg" >
                        {isLoading ?
                        <l-waveform
                        size="25"
                        stroke="3.5"
                        speed="1" 
                        color="white" 
                        ></l-waveform> : 'Create Segment' }
                        </button>
                  </div>
                </div>
              </div>
            </div>
            <EditModal />

            <div className="container mt-10">
                {
                    showDetails &&  (
                        <div className="bg-base-300 rounded-xl shadow-lg mt-5 p-5">
                            <div className="thumb">
                            <img  src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                  alt="Avatar Tailwind CSS Component"
                                  className="mx-auto w-1/4 h-auto"
                                />
                            </div>
                            <p className="mt-1">
                                {
                                    seg_details.segment_title
                                }
                            </p>
                        </div>
                    )
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSegments;
