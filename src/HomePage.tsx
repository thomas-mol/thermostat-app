import { useState } from "react";
import { authService } from "./authentication/AuthService";
import axios from "axios";

const HomePage = () => {
  const [code, setCode] = useState("");
  const redirectLink = "https://peppy-puppy-cc2824.netlify.app/auth";
  const authLink = `https://idp.onecta.daikineurope.com/v1/oidc/authorize?response_type=code&client_id=hWF-GBy-tZd5s7HegKivykyh&redirect_uri=${redirectLink}&scope=openid%20onecta:basic.integration`;

  const loginToExternalSite = () => {
    window.location.href = authLink;
  };

  const getCodeFromLocalStorage = () => {
    let code = authService.getCode();
    if (code) setCode(code);
  };

  const forgetCodeFromLocalStorage = () => {
    authService.logout();
  };

  const getGatewayDevices = () => {
    if (authService.getToken() != null) {
      axios
        .get("https://api.onecta.daikineurope.com/mock/v1/gateway-devices", {
          headers: {
            Authorization: authService.getToken(),
            "Accept-Encoding": "gzip",
            "X-Mocking-Example-Id": "air-to-air-dx23",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      console.log("Please login first.");
    }
  };

  return (
    <div className="main">
      <h2>Home Page</h2>
      <div className="btn-group">
        <button className="btn btn-secondary" onClick={getCodeFromLocalStorage}>
          Reveal code
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={forgetCodeFromLocalStorage}
        >
          Forget code
        </button>
      </div>

      {code && <div>Code = {code}</div>}

      <div className="btn-group">
        <button className="btn btn-primary" onClick={getGatewayDevices}>
          Use API
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={loginToExternalSite}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
