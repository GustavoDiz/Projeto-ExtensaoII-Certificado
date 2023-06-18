import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./auth";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !(router.pathname == "/signup")) {
      router.push("/login");
    }
  }, [user, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
