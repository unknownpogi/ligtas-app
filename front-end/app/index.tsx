import { authStorage } from "@/utils/auth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await authStorage.getToken();
      setIsLoggedIn(!!token);
    };

    checkToken();
  }, []);

  if (isLoggedIn === null) return null;

  if (!isLoggedIn) {
    return <Redirect href="/(auth)" />;
  }

  return <Redirect href="/(tabs)" />;
}

// const { user, isAuthenticated, isLoading } = useAuth();

//   if (isLoading) return <Text>Loading...</Text>;

//   if (!isAuthenticated) {
//     return <Redirect href="/login" />;
//   }
