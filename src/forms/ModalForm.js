const ModalForm = ({ isOpen, onClose, children , title }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0  flex items-center justify-center z-50 bg-white/2 backdrop-blur-md  "
      onClick={onclose}
    >
      <div className="relative  p-4 w-full max-w-2xl max-h-full">
        <div className="relative backdrop-blur-xl bg-base-300/70 rounded-lg shadow-xl ">
          <div className="flex items-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <div className="flex-grow me-3"> 
              <div className="relative">
                  <h1 className="font-bold text-lg">{title}</h1>
              </div>
            </div>

            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
                onClick={onClose}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
            <button
              onClick={onClose}
              className="py-2.5 btn-dark px-5 ms-3 text-sm font-medium text-white focus:outline-none btn-primary rounded-lg"
            >
              Close
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
