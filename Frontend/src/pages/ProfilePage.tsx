import { Camera, LogOut, Mail, MessageSquare, User } from 'lucide-react';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { user, signout, updateProfile } = useAuthStore();
  const [data, setData] = useState({
    fullname: user?.fullname,
    email: user?.email,
  });
  const [newImage, setNewImage] = useState<string | undefined>(user?.profilePicture);
  const imgRef = useRef<HTMLInputElement | null>(null);

  async function handleEditNewData() {
    await updateProfile(data.fullname, data.email, newImage);
    toast.success('Profile updated successfully');
  }

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
        <MessageSquare className="text-green-600 size-8" />
        <div className="flex space-x-3">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            onClick={() => navigate('/')}
          >
            Go Back
          </button>
          <button
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded-md transition"
            onClick={() => signout()}
            title="Logout"
          >
            <LogOut className="size-5" />
          </button>
        </div>
      </nav>

      {/* Profile Content */}
      <main className="flex flex-col justify-center items-center flex-1 px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
          <h1 className="text-3xl font-extrabold text-black">Welcome,</h1>
          <p className="text-lg font-semibold text-gray-700 capitalize">{user?.fullname}</p>
          <p className="text-gray-500 text-sm">Update your profile information</p>

          {/* Profile Image */}
          <div className="relative mt-6">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
              src={newImage}
              alt={data.fullname}
            />
            <div
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-200 transition"
              onClick={() => imgRef.current?.click()}
            >
              <Camera className="text-gray-600 size-6" />
            </div>
            <input type="file" accept="image/*" hidden ref={imgRef} onChange={handleImgChange} />
          </div>
          <small className="text-gray-500">Click the camera icon to update your photo</small>

          {/* Form */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-col items-center">
              <label className="flex items-center space-x-2 text-gray-700">
                <User className="size-5" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                className="mt-2 px-4 py-2 w-full border rounded-md focus:ring focus:ring-green-300 text-black"
                value={data.fullname}
                onChange={(e) => setData({ ...data, fullname: e.target.value })}
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="flex items-center space-x-2 text-gray-700">
                <Mail className="size-5" />
                <span>Email</span>
              </label>
              <input
                type="email"
                className="mt-2 px-4 py-2 w-full border rounded-md focus:ring focus:ring-green-300 text-black"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <button
              onClick={handleEditNewData}
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
