const Doctor = ({ doctorInfo, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500"
    >
      <img className="bg-blue-50" src={doctorInfo?.image} alt="" />

      <div className="p-4">
        <div
          className={`flex items-center gap-2 text-sm ${doctorInfo?.available ? "text-green-500" : "text-gray-500"
            }`}
        >
          <p
            className={`w-2 h-2 rounded-full ${doctorInfo?.available ? "bg-green-500" : "bg-gray-500"
              }`}
          ></p>

          <p>{doctorInfo?.available ? "Available" : "Not Available"}</p>
        </div>

        <p className="text-gray-900 text-lg font-medium">{doctorInfo?.name}</p>
        <p className="text-gray-600 text-sm">{doctorInfo?.speciality}</p>
      </div>
    </div>
  );
};

export default Doctor;