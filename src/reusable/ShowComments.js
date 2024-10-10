import ConfirmBox from './ConfirmBox';
import { useState } from 'react';
import axios from 'axios';
import {toast, Toaster } from 'react-hot-toast';

const ShowComments = ({ comments, url , commentType }) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const token = sessionStorage.getItem("accessToken");


  const openModal = (id) => {
    setIsModalOpen(true);
    setCommentId(id);

  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.delete(`${url}/delete/comments/${commentType}/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` , ' Content-Type': '' },
      },

      );
      console.log(response.data);
      if(response.data.status === 1){
        toast.success("Comment deleted successfully!")
        closeModal();
      console.log('Comment deleted successfully:', response.data);
      }else{
        throw new Error(response.data.message)
      }
      
    } catch (error) {
      console.log('Error deleting comment:', error.message); 
    }
  }

  return (
    <div className="container relative"> 
    <Toaster />
      <ConfirmBox isOpen={isModalOpen} onConfirm={handleConfirm} onClose={closeModal} />
      
      {comments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table"> 
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Username</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {comments.map((comment, index) => (
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
                            src={url + '/' + comment.img}
                            alt="No Profile"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {comment.username}
                        </div>
                        <div className="text-sm opacity-50">
                          Subscriber
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {comment.comment || comment.s_comments}
                  </td>
                  <td>{comment.created_at}</td>
                  <th>
                    <button onClick={() => openModal(comment.id)}  className="btn btn-ghost btn-primary btn-xs">
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Username</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Action</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
          <p>No comments found.</p>
        </div>
      )}
    </div>
  );
};

export default ShowComments;
