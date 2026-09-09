// src/context/DeviceContext.tsx
import React, { createContext, useContext, useState } from "react";

interface DeviceContextType {
  hasDevice: boolean;
  setHasDevice: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
   profile: any;
  setProfile: (value: any) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasDevice, setHasDevice] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  return (
    <DeviceContext.Provider value={{ hasDevice, setHasDevice, loading, setLoading, profile, setProfile }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};
