import { useCallback, useEffect, useState } from "react";
import localForage from "localforage";
import { AppContext } from "./AppContext";

const AppContextProvider = ({ children }) => {
  const [patient, setPatient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Load patient on refresh
  useEffect(() => {
    const loadPatient = async () => {
      try {
        const storedPatient = await localForage.getItem("patient");
        if (storedPatient) {
          setIsLoggedIn(true);
          setPatient(storedPatient);
        }
      } catch (error) {
        console.error("Error loading patient:", error);
      }
    };

    loadPatient();
  }, []);

  // Load appointments on refresh
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const storedAppointments = (await localForage.getItem("appointments")) || [];
        setAppointments(storedAppointments);
      } catch (error) {
        console.error("Error loading appointments:", error);
      }
    };

    loadAppointments();
  }, []);

  const registerPatient = async (userData) => {
    try {
      const newPatient = {
        ...userData,
        id: Date.now(),
      };

      await localForage.setItem("patient", newPatient);

      setPatient(newPatient);
      setIsLoggedIn(true);

      return { success: true, message: "Registration successfull." };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, message: "Error creating account." };
    }
  };

  const loginPatient = async (email, password) => {
    try {
      const storedPatient = await localForage.getItem("patient");

      if (!storedPatient) {
        return { success: false, message: "No account found" };
      }

      if (storedPatient.email === email && storedPatient.password === password) {
        setPatient(storedPatient);
        setIsLoggedIn(true);
        return { success: true };
      }

      return { success: false, message: "Invalid email or password" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  const logoutPatient = async () => {
    setPatient(null);
    setIsLoggedIn(false);

    try {
      await localForage.removeItem("patient");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getPatientImageUrl = () => {
    if (!patient || !patient.image) return "";

    const image = patient.image;

    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    if (typeof image === "string") {
      return image;
    }

    return "";
  };

  const bookAppointment = async (appointmentData) => {
    try {
      const storedAppointments = (await localForage.getItem("appointments")) || [];

      const newAppointment = {
        ...appointmentData,
        appointmentId: Date.now(),
        paymentStatus: "pending",
        appointmentStatus: "SCHEDULED",
      };

      const updatedAppointments = [...storedAppointments, newAppointment];

      await localForage.setItem("appointments", updatedAppointments);
      setAppointments(updatedAppointments);

      return { success: true, message: "Appointment booked successfully." };
    } catch (error) {
      console.error("Book appointment error:", error);
      return { success: false, message: "Failed to book appointment." };
    }
  };

  const fetchAppointments = useCallback(async () => {
    try {
      const storedAppointments = (await localForage.getItem("appointments")) || [];
      setAppointments(storedAppointments);
      return storedAppointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
  }, []);

  const markAppointmentPaid = async (appointmentId) => {
    try {
      const storedAppointments = (await localForage.getItem("appointments")) || [];

      const updatedAppointments = storedAppointments.map((item) =>
        item.appointmentId === appointmentId ? { ...item, paymentStatus: "paid" } : item
      );

      await localForage.setItem("appointments", updatedAppointments);
      setAppointments(updatedAppointments);

      return { success: true };
    } catch (error) {
      console.error("Mark paid error:", error);
      return { success: false };
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const storedAppointments = (await localForage.getItem("appointments")) || [];

      const updatedAppointments = storedAppointments.map((item) =>
        item.appointmentId === appointmentId
          ? { ...item, appointmentStatus: "CANCELED" }
          : item
      );

      await localForage.setItem("appointments", updatedAppointments);
      setAppointments(updatedAppointments);

      return { success: true };
    } catch (error) {
      console.error("Cancel appointment error:", error);
      return { success: false };
    }
  };

  const values = {
    patient,
    isLoggedIn,
    appointments,

    registerPatient,
    loginPatient,
    logoutPatient,

    getPatientImageUrl,

    bookAppointment,
    fetchAppointments,
    markAppointmentPaid,
    cancelAppointment,
  };

  return <AppContext.Provider value={values}>
    {children}
  </AppContext.Provider>;
};

export default AppContextProvider;
