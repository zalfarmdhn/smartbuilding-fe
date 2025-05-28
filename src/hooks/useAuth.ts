import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { hasToken } from "../utils/tokenHandler";
import { useSettings } from "../states/settings";
import { removeAllData } from "../utils/backupData";

interface UseAuthReturn {
  isLoggedIn: boolean;
  isLoading: boolean;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const errorUserData = useSettings((state) => state.errorMe);
  
  // Mengecek apakah user punya token yang valid dan tidak ada error dari endpoint /me
  const isLoggedIn = hasToken() && !errorUserData;

  useEffect(() => {
    // Kalau user belum login, redirect ke halaman login
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setIsLoading(false);
  }, [isLoggedIn, navigate]);
  const logout = () => {
    // Hapus semua data yang tersimpan
    removeAllData();
    // Redirect ke halaman login
    navigate("/login");
  };

  return {
    isLoggedIn,
    isLoading,
    logout,
  };
}
