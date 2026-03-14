import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, doctors } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { getNext7DatesInKolkata, getAvailableHourlyTimeSlots } from "../utils/GenerateDateTimeSlots";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Appointments = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, bookAppointment } = useAppContext();

  const dates = useMemo(() => getNext7DatesInKolkata(), []);
  const [slotIndex, setSlotIndex] = useState({ daySlot: 0, timeSlot: -1 });

  const scrollContainerRef = useRef(null);

  const times = useMemo(() => {
    const selectedDate = dates?.[slotIndex.daySlot]?.date;
    if (!selectedDate) return [];
    return getAvailableHourlyTimeSlots(selectedDate);
  }, [dates, slotIndex.daySlot]);


  const docInfo = useMemo(() => {
    return doctors.find((doc) => doc?._id === docId);
  }, [docId]);


  const updateTimeSlots = (index) => {
    setSlotIndex({ daySlot: index, timeSlot: -1 });
  };


  const handleAppointBooking = async () => {
    if (!isLoggedIn) {
      toast.error("Please login or create an account.")
      return;
    }

    if (!dates?.length) {
      toast.error("No dates available.");
      return;
    }

    if (slotIndex.timeSlot === -1) {
      toast.error("Please select a time slot first.");
      return;
    }

    const selectedDate = dates[slotIndex.daySlot];
    const selectedTime = times[slotIndex.timeSlot];

    const appointmentData = {
      doctorId: docId,
      doctorName: docInfo.name,
      speciality: docInfo.speciality,
      image: docInfo.image,
      fees: docInfo.fees,
      appointmentDate: selectedDate.date,
      appointmentTime: selectedTime,
    };

    const res = await bookAppointment(appointmentData);

    if (res.success) {
      navigate("/my-appointments");
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  /* ---------- Horizontal Scroll ---------- */

  const handleWheelScroll = useCallback((event) => {
    event.preventDefault();

    scrollContainerRef.current?.scrollBy({
      left: event.deltaY,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheelScroll);

    return () => {
      container.removeEventListener("wheel", handleWheelScroll);
    };
  }, [handleWheelScroll]);


  if (!docInfo) {
    return (
      <p className="text-center text-gray-600 mt-20">
        Doctor not found.
      </p>
    );
  }

  return (
    <div className="px-4 md:px-10">

      {/* ---------- Doctor Details ---------- */}

      <div className="flex flex-col md:flex-row gap-6">

        <img
          className="bg-blue-600 w-full md:w-72 rounded-lg"
          src={docInfo?.image}
          alt={docInfo?.name}
        />

        <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white">

          <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo?.degree} - {docInfo?.speciality}
            </p>

            <span className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo?.experience}
            </span>
          </div>

          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
              About
              <img src={assets.info_icon} alt="" />
            </p>

            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              {docInfo?.about}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:
            <span className="text-gray-700 ml-1">
              ₹{docInfo?.fees}
            </span>
          </p>

          <div
            className={`mt-4 flex items-center gap-2 text-sm ${docInfo?.available ? "text-green-500" : "text-gray-500"
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${docInfo?.available ? "bg-green-500" : "bg-gray-500"
                }`}
            ></span>

            <p>
              {docInfo?.available ? "Available" : "Not available"}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Booking Section ---------- */}

      <div className="mt-10">

        <p className="font-medium text-gray-700">
          Booking slots
        </p>

        {/* Date Slots */}

        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4">

          {dates.map((item, index) => (
            <div
              key={item.date}
              onClick={() => updateTimeSlots(index)}
              className={`text-center py-5 w-16 rounded-full cursor-pointer ${slotIndex.daySlot === index
                ? "bg-blue-500 text-white"
                : "border border-gray-200"
                }`}
            >
              <p className="text-sm">{item.shortWeekDay}</p>
              <p className="text-lg font-medium">{item.day}</p>
            </div>
          ))}

        </div>

        {/* Time Slots */}

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 w-full overflow-x-auto mt-5 pb-2"
        >

          {times.length ? (
            times.map((item, index) => (
              <p
                key={item}
                onClick={() =>
                  setSlotIndex((prev) => ({
                    ...prev,
                    timeSlot: index,
                  }))
                }
                className={`text-sm px-5 py-2 rounded-full border cursor-pointer whitespace-nowrap ${slotIndex.timeSlot === index
                  ? "bg-blue-500 text-white"
                  : "border-gray-200"
                  }`}
              >
                {item}
              </p>
            ))
          ) : (
            <p className="text-sm text-red-500">
              No available slots for today.
            </p>
          )}

        </div>

        <button
          onClick={handleAppointBooking}
          disabled={!docInfo?.available}
          className={`mt-6 bg-blue-600 text-white text-sm px-14 py-4 rounded-full ${docInfo?.available ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
        >
          {docInfo?.available
            ? "Book Appointment"
            : "Doctor not available"}
        </button>

      </div>

      {/* ---------- Related Doctors ---------- */}

      <RelatedDoctors
        docId={docId}
        speciality={docInfo?.speciality}
      />

    </div>
  );
};

export default Appointments;