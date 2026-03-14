import { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const buildUserDataFromPatient = (patient) => ({
  name: patient?.name || "",
  image: patient?.image || assets.profile_pic,
  email: patient?.email || "",
  phone: patient?.phone || "",
  gender: patient?.gender || "",
  dob: patient?.dob || "",
  age: patient?.age || "",
  bloodGroup: patient?.bloodGroup || "",
  emergencyContact: patient?.emergencyContact || "",
  address: patient?.address || "",
});

const PatientProfileForm = ({ patient }) => {
  const loading = { addOrUpdatePatientInfo: false };

  const [userData, setUserData] = useState(() => buildUserDataFromPatient(patient));
  const [isEdit, setIsEdit] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUserData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    toast.error("Coming Soon.")
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 text-sm space-y-8">

      {/* Profile Header */}
      <div className="flex items-center gap-6">

        <div>
          <img
            src={
              userData?.image instanceof File
                ? URL.createObjectURL(userData.image)
                : userData.image
            }
            className="w-32 h-32 rounded-full object-cover border"
            alt="profile"
          />

          {isEdit && (
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-2 text-xs"
            />
          )}
        </div>

        <div>
          {isEdit ? (
            <input
              className="text-2xl font-semibold border-b"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800">
              {userData.name}
            </h2>
          )}

          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>

      <hr className="text-gray-400" />

      {/* Contact Info */}
      <div>

        <h3 className="text-blue-800 font-semibold mb-4">
          Contact Information
        </h3>

        <div className="grid grid-cols-[1fr_3fr] gap-y-4">

          <label>Email</label>
          <p className="text-blue-500">{userData.email}</p>

          <label>Phone</label>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <label>Address</label>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
          ) : (
            <p>{userData.address}</p>
          )}

        </div>

      </div>

      <hr className="text-gray-400" />

      {/* Medical Info */}
      <div>

        <h3 className="font-semibold mb-4 text-blue-800">
          Basic Information
        </h3>

        <div className="grid grid-cols-[1fr_3fr] gap-y-4">

          <label>Gender</label>
          {isEdit ? (
            <select
              className="bg-gray-100 px-2 py-1 rounded w-40"
              value={userData.gender}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <label>Date of Birth</label>
          {isEdit ? (
            <input
              type="date"
              className="bg-gray-100 px-2 py-1 rounded"
              value={userData.dob}
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
            />
          ) : (
            <p>{userData.dob}</p>
          )}

          <label>Age</label>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 rounded w-20"
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
            />
          ) : (
            <p>{userData.age}</p>
          )}

          <label>Blood Group</label>
          {isEdit ? (
            <select
              className="bg-gray-100 px-2 py-1 rounded w-32"
              value={userData.bloodGroup}
              onChange={(e) =>
                setUserData({ ...userData, bloodGroup: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          ) : (
            <p>{userData.bloodGroup}</p>
          )}

        </div>

      </div>

      {/* Save Button */}
      <div className="text-right">

        <button
          onClick={handleSubmit}
          disabled={loading.addOrUpdatePatientInfo}
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          {loading.addOrUpdatePatientInfo
            ? "Saving..."
            : isEdit
              ? "Save Information"
              : "Edit Profile"}
        </button>

      </div>
    </div>
  );
};

const PatientProfile = () => {
  const { patient } = useAppContext();

  if (!patient) {
    return (
      <p className="text-center text-gray-600 mt-20">
        Please login to view your profile.
      </p>
    );
  }

  return <PatientProfileForm patient={patient} />;
};

export default PatientProfile;