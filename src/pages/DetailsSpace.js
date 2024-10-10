import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { waveform } from "ldrs";
import Sidebar from "../components/SideBar";
import TopNav from "../components/TopNav";
import BreadCrumb from "../components/BreadCrumb";
import { useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import ShowComments from "../reusable/ShowComments";
import { FileUploader } from "react-drag-drop-files";


const DetailsSpace = () => {
  const [isloading, setisLoading] = useState(false);
  const [isloadingComments, setisLoadingComments] = useState(false);
  const url = process.env.REACT_APP_API;
  const [space, setSpaces] = useState({});
  const [comments, setComments] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const { id } = useParams();



  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];
  const [file, setFile] = useState(null);


  waveform.register();

  const errorImageSize = () => {
    toast.error("Image size is too big!");
  };


  const handleChangePhoto = (photo) => {
    setFile(photo);
  };

  const handleUpdate = async () => {
    setisLoading(true);
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("thumbnail", file);
    form.append("audio_id", id);

      try {
        const response = await axios.put(
          `${url}/website/update/space`,
          form, 
          {
            headers: { Authorization: `Bearer ${token}` , ' Content-Type': '' },
          }
        );

        // console.log(response.data);

        if (response.data.status === 1) {
          toast.success("Space updated successfully");
        } else {
          throw new Error("Failed to update");
        }
      } catch (e) {
        toast.error("Failed to update video!");
        return;
      }
      finally {
        setisLoading(false);
      }
  }


  const fetchcomments = async () => {
    setisLoadingComments(true);
    try {
      const response = await axios.get(
        `${url}/site_management/space/get_comments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(response.data);
      // console.log(response.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setisLoadingComments(false);
    }
  };
  //get the spaces present
  useEffect(() => {
    const fetchspace = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(
          `${url}/site_management/space/details/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSpaces(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        // console.log(response.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setisLoading(false);
      }
    };
    fetchspace();
  }, []);
  return (
    <div>
      <TopNav />
      <Toaster />
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-full max-h-[90vh] overflow-scroll">
          <BreadCrumb page={["Site management", "space Details"]} />
          <div className="mt-5">
            <div className="container flex justify-between items-center">
              <h2 className="bold">space Details</h2>
              <div>
              <button
                    onClick={handleUpdate}
                    disabled={isloading}
                    className="button btn-primary w-full mx-auto py-2 my-6 md:px-12 rounded-lg"
                  >
                    {isloading ? (
                      <l-waveform
                        size="25"
                        stroke="3.5"
                        speed="1"
                        color="white"
                      ></l-waveform>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
              </div>
            </div>

            {isloading ? (
              <Skeleton />
            ) : (
              <div className="container mt-5 grid grid-cols-3">
                <div className="container  col-span-2 ">
                  <div className="w-full">
                    <div className="relative w-full min-w-[200px] h-15">
                      <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
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
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                          />
                        </svg>
                      </div>
                      <input
                        className="peer w-full h-full bg-transparent text-base-content font-sans font-normal outline outline-0 focus:outline-0  transition-all placeholder-shown:border placeholder-shown:border-base-content placeholder-shown:border-t-base-content border focus:border-t-transparent text-sm py-2.5 rounded-[7px] !pr-9  input"
                        placeholder="Space Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content-[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-base-content peer-focus:text-base-content before:border-base-contentpeer-focus:after:!border-gray-900">
                        space Title
                      </label>
                    </div>
                  </div>

                  <div className="mt-9  ">
                    <div className="relative w-full min-w-[200px] h-40">
                      <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
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
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                          />
                        </svg>
                      </div>
                      <textarea
                        className="peer w-full h-full bg-transparent text-base-content font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-base-content placeholder-shown:border-t-base-content border   border-t-transparent focus:border-t-transparent text-sm py-2.5 rounded-[7px] !pr-9  input"
                        placeholder="Type Space description  "
                        value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content-[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-base-content peer-focus:text-base-content before:border-base-content peer-focus:before:!border-gray-900 after:border-base-content peer-focus:after:!border-gray-900">
                        Description
                      </label>
                    </div>
                  </div>

                  
                  <div className="mt-61">
                      <FileUploader
                        handleChange={handleChangePhoto}
                        name="file"
                        types={fileTypes}
                        maxSize="2"
                        onSizeError={errorImageSize}
                      />
                    </div>

                  <div className="container mt-5">
                    <p>Thumbnails</p>
                    <div className="flex gap-2">
                      <figure>
                        <img
                          src={url + "/" + space.thumbnail}
                          alt="space thumb"
                          className="max-h-[200px] w-auto"
                        />
                      </figure>
                      <figure>
                        <img
                          src={url + "/" + space.thumbnail}
                          alt="space thumb"
                          className="max-h-[200px] w-auto"
                        />
                      </figure>
                      <figure>
                        <img
                          src={url + "/" + space.thumbnail}
                          alt="space thumb"
                          className="max-h-[200px] w-auto"
                        />
                      </figure>
                    </div>
                  </div>

                  <div className="container mt-10 flex items-end">
                    <button
                      onClick={fetchcomments}
                      className="btn btn-primary btn-sm ml-auto"
                      disabled={isloadingComments}
                    >
                      {isloadingComments ? (
                        <l-waveform
                          size="25"
                          stroke="3.5"
                          speed="1"
                          color="white"
                        ></l-waveform>
                      ) : (
                        <div className="flex items-center">
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
                              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                            />
                          </svg>
                          Load space Comments
                        </div>
                      )}
                    </button>
                  </div>

                  {/* commnets */}

                  {isloadingComments ? (
                    <Skeleton />
                  ) : (
                    <ShowComments comments={comments} url = {url}  commentType="spaces" />
                  )}
                </div>

                {/* right side */}
                <div className="w-full  col-span-1  px-6">
                  <div className="card card-compact bg-base-100 ">
                    <figure>
                      <img src={url + "/" + space.thumbnail} alt="space thumb" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{space.title}</h2>
                      <p>{space.description}</p>
                      <div className="card-actions items-center justify-between  ">
                        <div className="flex justify-center  items-center">
                          <div>
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
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>

                            <span>{space.views}</span>
                          </div>
                          <div className="ms-3">
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
                                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                              />
                            </svg>

                            <span>{space.likes}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="inline-block me-3">Uploaded At</p>
                        <p className="inline-block">{space.created_at}</p>
                      </div>

                      <button
                    onClick={handleUpdate}
                    disabled={isloading}
                    className="button btn-primary w-full mx-auto py-2 my-6 md:px-12 rounded-lg"
                  >
                    {isloading ? (
                      <l-waveform
                        size="25"
                        stroke="3.5"
                        speed="1"
                        color="white"
                      ></l-waveform>
                    ) : (
                      "Delete Space"
                    )}
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Default values shown
{
  /* <l-waveform
  size="35"
  stroke="3.5"
  speed="1" 
  color="black" 
></l-waveform> */
}

export default DetailsSpace;
