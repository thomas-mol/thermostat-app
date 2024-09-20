import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "./AuthService";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the authorization code from the URL
    const searchParams = new URLSearchParams(location.search);
    const authCode = searchParams.get("code");

    if (authCode) {
      // Use the auth code to request an access token from your backend
      exchangeAuthCodeForToken(authCode);
    }
  }, [location]);

  const exchangeAuthCodeForToken = async (authCode: string) => {
    try {
      // Save the authentication code in local storage
      authService.setCode(authCode);

      // Call your backend to exchange the auth code for an access token
      const authenticationSite =
        "https://idp.onecta.daikineurope.com/v1/oidc/token";
      const res = await axios.post(authenticationSite, null, {
        params: {
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          code: authCode,
          redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        },
      });

      if (res.status == 200) {
        authService.setToken(res.data.access_token);
        navigate("/");
      }
    } catch (err) {
      console.error("Error exchanging auth code:", err);
    }
  };

  return <div>Processing authentication...</div>;
};

export default Login;
