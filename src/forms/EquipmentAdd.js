import Sidebar from "../components/SideBar";
import TopNav from "../components/TopNav";
import BreadCrumb from "../components/BreadCrumb";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import { waveform } from 'ldrs';

const EquipmentAdd = () => {
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [date, setDate] = useState('');
    const [condition, setCondition] = useState('');
    const [purpose, setPurpose] = useState('');
    const [serial, setSerial] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [cost, setCost] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const url = process.env.REACT_APP_API;
    const token = sessionStorage.getItem("accessToken");

    const fileTypes = ["JPG", "PNG", "GIF", "WEBP"]; 
    const [reciept, setFile] = useState(null);  

    const [photo, setPhoto] = useState(null);

  const handleChange = (reciept) => {
    setFile(reciept);
  };
  const handleChangePhoto = (photo) => {
    setPhoto(photo);
  };
  waveform.register();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    if(!name ||!model ||!date ||!condition ||!purpose ||!serial ||!manufacturer ||!cost ||!reciept ||!photo){
        toast.error('All fields are required!');
        setIsLoading(false);
        return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('model', model);
    formData.append('date', date);
    formData.append('condition', condition);
    formData.append('purpose', purpose);
    formData.append('serial', serial);
    formData.append('manufacturer', manufacturer);
    formData.append('cost', cost);
    formData.append('reciept', reciept);
    formData.append('photo', photo);

   
    try{
        const response = await axios.post(
            `${url}/systems/equipments/create`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(response.data);
          if (response.data.status === 1) {
            toast.success("Equipement created successfully"); 
          } else {
            throw new Error("Failed to create segment");
          }

    }catch(e){
        toast.error('Failed to add equipment!')
        return;
    }finally{
        setIsLoading(false);
        setName('');
        setCondition('');
        setModel('');
        setDate('');
        setPurpose('');
        setSerial('');
        setCost('');
        setManufacturer('');
        setFile(null);
        setPhoto(null);
    }

  }

    // const handleChange = (file) => {    
    //     setFile(file);  
    // }; 
    const errorImageSize = () => {
        toast.error('Image size is too big!');
    }


    return ( 
        <div>
      <TopNav />
      <Toaster /> 
      <div className="flex ">
        <Sidebar />
        <div className="p-5  w-full max-h-[90vh] overflow-scroll">
          <div className="xl:w-1/2 mx-auto">
          <BreadCrumb page={["System", "Register Eqiupment"]} />

          <div className="mt-5 bg-base-300 p-5 rounded-xl ">
                <h3 className="text-xl">Register New Equipment</h3>
                <form className="mt-5" onSubmit={handleSubmit}>
                <div className="mt-8"> 
                    <input required value={name} onChange={(e) => setName(e.target.value)} name="title" type="text" placeholder="Equipment Name" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                </div>
                <div className="mt-8"> 
                    <input required value={model} onChange={(e) => setModel(e.target.value)} name="title" type="text" placeholder="Equipment Model" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                </div>
                <div className="mt-8"> 
                    <input required value={date} onChange={(e) => setDate(e.target.value)} name="title" type="date" placeholder="Date of Purchase" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                </div>
                <div className="mt-8"> 
                    <input required value={condition} onChange={(e) => setCondition(e.target.value)} name="title" type="text" placeholder="Equipment Condition" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                </div>
                <div className="mt-8"> 
                    <input required value={purpose} onChange={(e) => setPurpose(e.target.value)} name="title" type="text" placeholder="Equipment Purpose" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                </div>
                <div className="mt-8"> 
                    <input required value={serial} onChange={(e) => setSerial(e.target.value)} name="title" type="text" placeholder="Serial Number" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                </div>
                <div className="mt-8"> 
                    <input required value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} name="title" type="text" placeholder="Equipment Manufacturer" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                </div>
                <div className="mt-8"> 
                    <input required value={cost} onChange={(e) => setCost(e.target.value)} name="title" type="number" placeholder="Equipment Cost" className=" input appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-base-content leading-tight focus:outline-none  focus:border-gray-500" />
                </div>
                <div className="mt-8">
                    <p className="lead">Upload Reciept</p>
                    <FileUploader  dropMessageStyle={{width: '100%'}} handleChange={handleChange} name="file" types={fileTypes} maxSize="2" onSizeError={errorImageSize}  />

                </div>
                <div className="mt-8">
                <p className="lead">Upload Photo</p>
                <FileUploader  dropMessageStyle={{width: '100%'}} handleChange={handleChangePhoto} name="file" types={fileTypes} maxSize="2" onSizeError={errorImageSize}  />

                </div>

                <div className="mt-8 flex">
                {reciept && 
                                <img src={URL.createObjectURL(reciept)} className="mx-auto" alt="" style={{height: 'auto', width: '200px'}} />
                            }
                {photo && 
                                <img src={URL.createObjectURL(photo)} className="mx-auto" alt="" style={{height: 'auto', width: '200px'}} />
                            }
                </div>
                <button type="submit" disabled={isLoading} className="button btn-primary w-full mx-auto py-2 my-6 md:px-12 rounded-lg" >
                        {isLoading ?
                        <l-waveform
                        size="25"
                        stroke="3.5"
                        speed="1" 
                        color="white" 
                        ></l-waveform> : 'Uplaod Equipment' }
                        </button>
                </form> 
                
            </div>
            </div>
          </div>
          </div>
          </div>
     );
}
 
export default EquipmentAdd;