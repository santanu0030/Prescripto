import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Doctor from "../components/Doctor";
import { ListFilter } from "lucide-react";
import { doctors } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);

  const specialistDoc = [
    "All",
    "General",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const decodedSpeciality = decodeURIComponent(speciality || "All");

  const filterDoc = useMemo(() => {
    if (decodedSpeciality === "All") {
      return doctors;
    }
    return doctors?.filter((doc) => doc.speciality === decodedSpeciality);
  }, [decodedSpeciality]);

  const handleFilter = (whichSpeciality) => {
    navigate(`/doctors/${encodeURIComponent(whichSpeciality)}`);
    window.scrollTo(0, 0);
  };

  return (<div className="px-4 sm:px-8">

    <p className="text-gray-600">
      Browse through the doctors specialist.
    </p>

    <div className="flex flex-col sm:flex-row items-start gap-6 mt-5">

      {/* Mobile Filter Button */}
      <button
        className={`flex items-center gap-2 py-2 px-4 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-blue-600 text-white" : ""}`}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        <ListFilter /> Filters
      </button>

      {/* Filter List */}
      {showFilter && (
        <div className="flex flex-col gap-3 text-sm text-gray-600">
          {specialistDoc.map((item) => (
            <p
              key={item}
              onClick={() => handleFilter(item)}
              className={`w-[90vw] sm:w-auto pl-4 py-2 pr-16 border border-gray-300 rounded cursor-pointer transition-all ${decodedSpeciality === item
                  ? "bg-blue-100 text-black"
                  : "hover:bg-gray-100"
                }`}
            >
              {item}
            </p>
          ))}
        </div>
      )}

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

        {filterDoc?.length === 0 ? (
          <h1 className="text-gray-600 text-center col-span-full">
            Not available for now.
          </h1>
        ) : (
          filterDoc.map((item) => (
            <Doctor
              key={item.email}
              doctorInfo={item}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
            />
          ))
        )}

      </div>
    </div>
  </div>

  );
};

export default Doctors;
