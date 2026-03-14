import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import formatDateToDayMonth from "../utils/formatDateToDayMonth";
import { useAppContext } from "../context/AppContext";

const PatientAppointments = () => {

  const {
    patient,
    appointments,
    fetchAppointments,
    markAppointmentPaid,
    cancelAppointment
  } = useAppContext();

  const [loadingIndex, setLoadingIndex] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(null);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* ---------- Handle Payment ---------- */

  const handlePayment = async (fees, index, appointmentId) => {
    setLoadingIndex(index);

    try {

      const options = {
        key: "rzp_test_QqorfzSJrg2ZfN",
        amount: fees * 100,
        currency: "INR",
        name: "Prescripto",
        description: "Doctor Appointment Fee",

        handler: async function () {

          const result = await markAppointmentPaid(appointmentId);

          if (!result.success) {
            toast.error("Payment update failed.");
            return;
          }

          toast.success("Payment successful!");

          await fetchAppointments();
        },

        prefill: {
          name: patient?.name,
          email: patient?.email,
          contact: patient?.phone,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      toast.error(error.message);
    }

    setLoadingIndex(null);
  };


  const handleAppointmentCancelation = async (index, appointmentId) => {

    setCancelLoading(index);

    try {

      const response = await cancelAppointment(appointmentId);

      if (response.success) {
        toast.success("Appointment canceled.");
        await fetchAppointments();
      } else {
        toast.error(response.message);
      }

    } catch (error) {
      toast.error(error.message);
    }

    setCancelLoading(null);
  };


  useEffect(() => {
    if (appointments?.length === 0) {
      fetchAppointments();
    }
  }, [appointments?.length, fetchAppointments]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <p className="flex flex-wrap items-center gap-2 pb-4 text-xl font-semibold text-gray-800 border-b border-indigo-200">
          My Appointments
          <span className="text-sm text-gray-500">
            ({appointments?.length} appointments found)
          </span>
        </p>

        {appointments?.length !== 0 ? (

          <div className="mt-6 space-y-5">

            {appointments?.map((item, index) => (

              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6
              grid grid-cols-1 sm:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_220px] gap-5
              ${item?.appointmentStatus === "CANCELED"
                    ? "border-l-4 border-red-500"
                    : item?.paymentStatus === "paid"
                      ? item?.appointmentStatus === "COMPLETED"
                        ? "border-l-4 border-blue-500"
                        : "border-l-4 border-green-500"
                      : "border-l-4 border-yellow-500"
                  }`}
              >

                {/* Doctor Image */}
                <div className="flex justify-center sm:justify-start">
                  <img
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg bg-indigo-100"
                    src={item?.image}
                    alt="Doctor"
                  />
                </div>

                {/* Doctor Info */}
                <div className="space-y-2 text-sm">

                  <p className="text-lg font-semibold text-gray-800">
                    {item?.doctorName}
                  </p>

                  <p className="text-indigo-600 font-medium">
                    {item?.speciality}
                  </p>

                  <div className="mt-2 p-3 bg-gray-100 rounded-md text-sm">
                    <span className="font-semibold text-gray-700">
                      Date & Time:
                    </span>{" "}
                    <span className="text-gray-800">
                      {formatDateToDayMonth(item?.appointmentDate)}, {item?.appointmentTime}
                    </span>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="flex flex-col justify-center gap-3">

                  {item?.paymentStatus === "paid" ? (

                    <>
                      {item?.appointmentStatus === "SCHEDULED" && (
                        <button className="flex items-center justify-center gap-2 text-sm font-semibold text-green-700 border border-green-300 py-2 px-4 rounded-lg cursor-default">
                          <CheckCircle size={18} />
                          Paid & Scheduled
                        </button>
                      )}

                      {item?.appointmentStatus === "CANCELED" && (
                        <button className="text-sm font-semibold text-red-700 border border-red-300 py-2 px-4 rounded-lg cursor-default">
                          Canceled
                        </button>
                      )}

                      {item?.appointmentStatus === "COMPLETED" && (
                        <button className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-700 border border-blue-300 py-2 px-4 rounded-lg cursor-default">
                          <CheckCircle size={18} />
                          Completed
                        </button>
                      )}
                    </>

                  ) : (

                    <>
                      {item?.appointmentStatus === "CANCELED" ? (

                        <button className="text-sm font-semibold text-red-700 border border-red-300 py-2 px-4 rounded-lg cursor-default">
                          Canceled
                        </button>

                      ) : (

                        <>
                          {/* Pay Button */}
                          <button
                            className="text-sm font-semibold py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            onClick={() =>
                              handlePayment(item?.fees, index, item?.appointmentId)
                            }
                          >
                            {loadingIndex === index ? (
                              <Loader2 size={16} className="animate-spin mx-auto" />
                            ) : (
                              "Pay Online"
                            )}
                          </button>

                          {/* Cancel Button */}
                          <button
                            className="text-sm font-medium text-red-600 border border-red-300 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition"
                            onClick={() =>
                              handleAppointmentCancelation(index, item?.appointmentId)
                            }
                          >
                            {cancelLoading === index ? (
                              <Loader2 size={16} className="animate-spin mx-auto" />
                            ) : (
                              "Cancel Appointment"
                            )}
                          </button>
                        </>
                      )}
                    </>

                  )}

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-600">
              No appointments found
            </h2>
            <p className="text-gray-500 mt-2">
              You haven't booked any appointments yet.
            </p>
          </div>

        )}

      </div>
    </div>
  );
};

export default PatientAppointments;
