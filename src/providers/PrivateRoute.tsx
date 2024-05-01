"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
