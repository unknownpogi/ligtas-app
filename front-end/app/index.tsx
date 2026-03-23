import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if (!isLoggedIn) {
    return <Redirect href="/(auth)" />;
  }
  return <Redirect href={"/(tabs)"} />;
}
