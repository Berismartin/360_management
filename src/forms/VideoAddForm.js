import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast, Toaster } from "react-hot-toast"; 
import axios from "axios";
import { waveform } from 'ldrs';
import Sidebar from "../components/SideBar";
import TopNav from "../components/TopNav";
import BreadCrumb from "../components/BreadCrumb";

const UploadVideo = () => {
    const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];
 
    const [file, setFile] = useState(null); 
    const [availableVideos, setavailableVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [video_title, setVideotitle] = useState('');
    const [segment, setSegment] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle]  = useState('');
    
    const handleChange = (file) => {    
        setFile(file); 
                 
    };

    waveform.register();

    const submitForm = (e) => {  
        e.preventDefault();  
        if (file) {
            setIsLoading(true);
            const data = new FormData(); 
               data.append('file', file);
               data.append('video', video_title);
               data.append('segment', segment); 
               data.append('title', title); 
               data.append('description', description); 
                
               axios.post('https://api.campus360recreations.com/upload/video', data)
               .then((response) => {
                if(response.data[0] != '{'){
                    throw new Error("something went wrong");
                }else{
                    console.log(response.data);
                    setDescription('');
                    setVideotitle('');
                    setSegment('');
                    setTitle('');
                    setFile(null);
                    toast.success("video Uploaded Successfully"); 
                    setIsLoading(false);
                }
               })
               .catch((error) => {
                    setIsLoading(false);
                 toast.error('Something went wrong!');
               });
           } else {
             toast.error('Please select a file!');
           }
    }

    const errorImageSize = () => {
        toast.error('Image size is too big!');
    }

    const fetchVideos = async () => {
        try{
            const response = await axios.get('https://api.campus360recreations.com/videos_upload/'); 
            setavailableVideos(response.data);
        } catch(error) {
            console.log('an error occured'+ error);

        }
    };

    //get the videos present
    useEffect(() =>{
       fetchVideos();
    }, []);
    const videos = ['360 News', '360 HotSeat', '360 Fashion Poll', '360 Opinion', '360 Sports', '360 Food 4 Thougt', '360 WID', '360 Recap', '360 Confessions'];
    return (  

        <div>
      <TopNav />
      <Toaster/>
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll"> 
          <BreadCrumb  page={['Site management', 'Upload Video']}/>
          <div className="upload bg-base-300 rounded-xl shadow-md py-5 mt-5"> 
            <div className="container px-2 md:px-4 mx-auto text-white my-12"> 
                <div className="text-center md:w-2/3 md:mx-auto">
                    <h1 className="text-2xl font-bold md:text-3xl">Upload Video</h1>
                    <form onSubmit={submitForm}>
                        <div className="mt-4">
                            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Title</label>
                            <input required value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" placeholder="Enter video title" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                        </div>
                        <div className="mt-4">
                            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Description</label>
                            <textarea type="text" value={description} required   onChange={(e) => setDescription(e.target.value)} name="description"  placeholder="Enter video description" className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" ></textarea>
                        </div>
                        <div className="mt-4">
                            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Select Video</label>
                            <select name="video"   onChange={(e) => setVideotitle(e.target.value)} className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" >
                                <option className="text-base-content">--select video---</option>
                                {availableVideos.map((video) => (
                                    <option className="text-base-content" value={video.video_name} key={video.id}>{video.video_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Select Category</label>
                            <select name="segment" value={segment}  onChange={(e) => setSegment(e.target.value)}  className="input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" >
                                <option className="text-base-content">--select category---</option>
                                {videos.map((video) => (
                                    <option className="text-base-content" value={video} key={video}>{video}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-4"> 
                            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Drop Thumbnail</label>
                             
                            <FileUploader  dropMessageStyle={{width: '100%'}} handleChange={handleChange} name="file" types={fileTypes} maxSize="2" onSizeError={errorImageSize}  />
                            {file && 
                                <img src={URL.createObjectURL(file)} className="mx-auto" alt="" style={{height: 'auto', width: '200px'}} />
                            }
                        </div> 
                        
                        <button type="submit" disabled={isLoading} className="button btn-primary w-1/2 mx-auto py-2 my-6 md:px-12 rounded-lg" >
                        {isLoading ?
                        <l-waveform
                        size="25"
                        stroke="3.5"
                        speed="1" 
                        color="white" 
                        ></l-waveform> : 'Upload Video' }
                        </button>
                         
                    </form>
                </div>
            </div> 
        </div>
        </div>
      </div>
    </div>
        
     );
}





// Default values shown
{/* <l-waveform
  size="35"
  stroke="3.5"
  speed="1" 
  color="black" 
></l-waveform> */}
 
export default UploadVideo;