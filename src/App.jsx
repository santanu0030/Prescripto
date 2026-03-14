import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Footer from "./components/Footer"
import { Toaster } from 'react-hot-toast';
import About from './pages/Aboutpage';
import Contact from './pages/Contactpage';
import Doctors from './pages/AllDoctors';
import Appointments from './pages/Appointment';
import CreateAccount from './pages/CreateAccount';
import PatientProfile from './pages/PatientProfile';
import Login from './pages/Loginpage';
import PatientAppointments from './pages/PatientAppointments';

function App() {

  return (
    <div>
      <Navbar />
      <div className="mx-4 sm:mx-[10%]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-appointments" element={<PatientAppointments />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/appointment/:docId" element={<Appointments />} />
        </Routes>
      </div>

      <Routes>
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App
