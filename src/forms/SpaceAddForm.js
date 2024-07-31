import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast, Toaster } from "react-hot-toast"; 
import axios from "axios";
import { waveform } from 'ldrs';
import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";
import TopNav from "../components/TopNav";
import BreadCrumb from "../components/BreadCrumb";

const UploadSpace = () => {
    const fileTypes = ["JPG", "PNG", "GIF", "webp"]; 
    const fileTypesAudio = ["MP3", "MVK"]; 
    const [file, setFile] = useState(null);  
    const [audio, setAudio] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);


    const [space_title, setSpace] = useState(''); 
    const [description, setDescription] = useState('');
    
    const handleChange = (file) => {    
        setFile(file); 
                 
    };

    const handleAudio = (file) => { 
        setAudio(file);
    }
    waveform.register();
    const submitForm = (e) => {  
        e.preventDefault();  
        if (file) {
            setIsLoading(true);
            const data = new FormData(); 
               data.append('file', file);
               data.append('audio', audio);
               data.append('space', space_title); 
               data.append('description', description); 

               axios.post('https://api.campus360recreations.com/upload/space', data)
               .then((response) => {
                 setDescription('');
                 setSpace(''); 
                 setFile(null);
                 setAudio(null);
                 toast.success(response.data.message); 
                 setIsLoading(false);
               })
               .catch((error) => {
                //console.log(error);
                 toast.error(error.message);
                 setIsLoading(false);
               });
           } else {
             toast.error('Please select a file!');
           }
    }

    const errorImageSize = () => {
        toast.error('Image size is too big!');
    }

    

    //get the videos present
    useEffect(() =>{ 
    }, []);
    return ( 
        <div>
        <TopNav />
        <Toaster/>
        <div className="flex">
          <Sidebar />
          <div className="p-5 w-full max-h-[90vh] overflow-scroll"> 
            <BreadCrumb  page={['Site management', 'Upload space']}/>
            <div className="upload bg-base-300 rounded-xl shadow-md py-5 mt-5"> 
            <div className="container px-2 md:px-4 mx-auto text-white my-12"> 
            <div className="text-center md:w-2/3 md:mx-auto">
                <h1 className="text-2xl font-bold md:text-3xl">Upload Space</h1>
                <form onSubmit={submitForm}>
                    <div className="mt-4">
                        <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Title</label>
                        <input required value={space_title}  onChange={(e) => setSpace(e.target.value)}  name="title" type="text" placeholder="Enter video title" className="input text-base-content appearance-none  rounded w-full py-2 px-4   leading-tight focus:outline-none   focus:border-gray-500" />
                    </div>
                    <div className="mt-4">
                        <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Description</label>
                        <textarea type="text" value={description} required   onChange={(e) => setDescription(e.target.value)} name="description"  placeholder="Enter video description" className="input text-base-content appearance-none  rounded w-full py-2 px-4  leading-tight focus:outline-none   focus:border-gray-500" ></textarea>
                    </div>
                    <div className="mt-4">
                        <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Choose Audio</label>
                        <FileUploader dropMessageStyle={{width: '100%'}} handleChange={handleAudio}   types={fileTypesAudio} maxSize="150" onSizeError={errorImageSize}  />
                    </div> 
                    <div className="mt-4"> 
                        <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Drop Thumbnail</label>
                         
                        <FileUploader dropMessageStyle={{width: '100%'}} handleChange={handleChange} name="file" types={fileTypes} maxSize="2" onSizeError={errorImageSize}  />
                        {file && 
                            <img src={URL.createObjectURL(file)} className="mx-auto" alt="" style={{height: 'auto', width: '200px'}} />
                        }
                    </div> 
                    
                    <button type="submit" className="button w-1/2 mx-auto py-2 my-3 md:px-12 btn-primary rounded-lg" >
                    {isLoading ?
                        <l-waveform
                        size="25"
                        stroke="3.5"
                        speed="1" 
                        color="white" 
                        ></l-waveform> : 'Upload Space' }
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
 
export default UploadSpace;