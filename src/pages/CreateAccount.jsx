import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateAccount = () => {
  const navigate = useNavigate();
  const { registerPatient } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    age: "",
    bloodGroup: "",
    password: "",
    address: ""
  });


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      image
    };

    const res = await registerPatient(data);
    if (res.success) {
      navigate("/")
      toast.success(res.message);
    } else {
      toast.error(res.message)
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">

      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-md mt-4">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Patient Account
        </h2>

        {/* Profile Image Upload */}
        <div className="flex justify-center mb-8">
          <label className="cursor-pointer relative">

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-500 transition">

              {preview ? (
                <img
                  src={preview}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400 text-center">
                  Upload
                  <br />
                  Photo
                </span>
              )}

            </div>

          </label>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Rahul Das"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              placeholder="rahul@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="border rounded-lg px-3 py-2 w-full"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="75850 46672"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm text-gray-600">Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm text-gray-600">Age</label>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="text-sm text-gray-600">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
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
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateAccount;