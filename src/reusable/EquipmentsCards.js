import { Link } from "react-router-dom";

const EquipementCard = ({ equipments, url }) => {
  const handleDownloadReceipt = (recieptUrl) => {
    if (recieptUrl) {
      
    const link = document.createElement('a');
    link.href = recieptUrl; // Directly use the receipt URL
    link.download = 'receipt.pdf'; // Or the relevant file name
    document.body.appendChild(link); // Append link to the body (required for Firefox)
    link.click(); // Trigger the download
    document.body.removeChild(link); 
    } else {
      alert("No receipt available to download");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {equipments.map((equipment, index) => (
        <div
          key={index}
          className="card card-compact border bg-base-100 transition-all hover:shadow-xl hover:-translate-y-3 hover:shadow-[#893F9A] shadow-[#BF3B7D]"
        >
          <figure>
            <img src={url + "/" + equipment.photo} alt="equipment" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{equipment.name}</h2>
            <p>Model: {equipment.model}</p>
            <div className="card-actions items-center justify-between">
              <table className="w-full">
                <tr>
                  <td>Condition: </td>
                  <td>{equipment.e_condition}</td>
                </tr>
                <tr>
                  <td>Purpose: </td>
                  <td>{equipment.purpose}</td>
                </tr>
                <tr>
                  <td>Serial Number: </td>
                  <td>{equipment.serial}</td>
                </tr>
                <tr>
                  <td>Manufacturer: </td>
                  <td>{equipment.manufacturer}</td>
                  
                </tr>
              </table>
              <div className="flex justify-between w-full mt-8">
                <div className="relative group">
                  <button
                    onClick={() => handleDownloadReceipt(url + "/" + equipment.reciept)}
                    className="focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 transition-all hover:size-7 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </button>
                  {/* Tooltip */}
                  <span className="absolute w-max bg-gray-700 text-white text-xs rounded-md px-2 py-1 -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Download Receipt
                  </span>
                </div>

                <h3 className="text-lg text-end font-bold">
                  UGX {equipment.cost}
                </h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquipementCard;
