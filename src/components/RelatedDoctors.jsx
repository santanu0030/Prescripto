import { useMemo } from "react";
import Doctor from "./Doctor";
import { useNavigate } from "react-router-dom";
import { doctors } from "../assets/assets";

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate();

  const relDocs = useMemo(() => {
    if (!doctors?.length || !speciality) return [];

    return doctors
      .filter((doc) => doc.speciality === speciality && doc._id !== docId)
      .slice(0, 4); // limit for UI
  }, [docId, speciality]);

  if (!relDocs.length) return null;

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 px-4 md:px-10">

      <h1 className="text-2xl md:text-3xl font-semibold text-center">
        Related Doctors
      </h1>

      <p className="max-w-xl text-center text-sm text-gray-500">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6">
        {relDocs.map(( item, i) => (
          <Doctor
            key={i}
            doctorInfo={item}
            onClick={() => {
              navigate(`/appointment/${item.email}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;