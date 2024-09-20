import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LoginTest = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Login component is mounted");
    console.log("Location:", location);
  }, [location]);

  return <div>Processing authentication...</div>;
};

export default LoginTest;
