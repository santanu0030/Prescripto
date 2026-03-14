import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Doctor from "../components/Doctor";
import { ListFilter } from "lucide-react";
import { doctors } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);

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
    if (decodedSpeciality === "All") return doctors;
    return doctors?.filter((doc) => doc.speciality === decodedSpeciality);
  }, [decodedSpeciality]);

  const handleFilter = (whichSpeciality) => {
    navigate(`/doctors/${encodeURIComponent(whichSpeciality)}`);
    window.scrollTo(0, 0);
    setShowFilter(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8">

      {/* Title */}
      <p className="text-gray-600 text-sm sm:text-base">
        Browse through the doctors specialist.
      </p>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8 mt-6">

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="flex items-center gap-2 py-2 px-4 border rounded-md text-sm lg:hidden w-fit"
        >
          <ListFilter size={18} />
          Filters
        </button>

        {/* Filter Sidebar */}
        <div
          className={`flex flex-col gap-3 text-sm text-gray-600
          ${showFilter ? "flex" : "hidden"}
          lg:flex lg:w-64`}
        >
          {specialistDoc.map((item) => (
            <button
              key={item}
              onClick={() => handleFilter(item)}
              className={`text-left px-4 py-2 border rounded-md transition-all
              ${decodedSpeciality === item
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

          {filterDoc?.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No doctors available for this speciality.
            </p>
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