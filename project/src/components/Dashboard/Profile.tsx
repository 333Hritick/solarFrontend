import React, { useEffect, useState } from "react";
import { getAccessToken, refreshAccessToken, logout } from "../../services/authService";
import { getProfile } from "../../api";  // ✅ centralized API
import { User, Mail, Phone, MapPin, Briefcase, Cpu } from "lucide-react";

interface Device {
  id: number;
  name: string;
  serial_number: string;
  location: string;
  capacity_kw: number;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  accounttype: string;
  devices?: Device[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      let token = getAccessToken();
      if (!token) {
        logout();
        return;
      }

      try {
        let res = await getProfile(token);

        // If unauthorized, try refreshing
        if (res.status === 401) {
          token = await refreshAccessToken();
          if (!token) {
            logout();
            return;
          }
          res = await getProfile(token);
        }

        setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p className="text-gray-500 text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Info */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full p-5 shadow-md">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-500 capitalize">{profile.accounttype}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Mail className="w-5 h-5 text-blue-500 mr-3" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Phone className="w-5 h-5 text-green-500 mr-3" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 text-red-500 mr-3" />
              <span>{profile.address}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Briefcase className="w-5 h-5 text-purple-500 mr-3" />
              <span>{profile.accounttype}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Devices */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Registered Devices</h3>
          {profile.devices && profile.devices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {profile.devices.map((device) => (
                <div
                  key={device.id}
                  className="border rounded-lg p-5 shadow-sm hover:shadow-md transition bg-gradient-to-br from-gray-50 to-gray-100"
                >
                  <div className="flex items-center mb-3">
                    <Cpu className="w-6 h-6 text-indigo-600 mr-2" />
                    <span className="font-semibold text-gray-800">{device.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">Serial: {device.serial_number}</p>
                  <p className="text-sm text-gray-600">Location: {device.location}</p>
                  <p className="text-sm text-gray-600">Capacity: {device.capacity_kw} kW</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No devices registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
