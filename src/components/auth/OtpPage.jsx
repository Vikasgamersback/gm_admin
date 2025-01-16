// Import dependencies
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { BsMoonStars, BsSun } from "react-icons/bs";

// Import components
import Button from "../general-components/Button.jsx";

//import files
import constants from "../../json/constants.json";

function Otp() {
  const [cookies, setCookie] = useCookies();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // otp verification handler
  function otpHandler() {
    if (otp === localStorage.getItem("otp")) {
      toast.success("Verification successful");
      navigate("/resetpassword");
    } else {
      toast.error("Code incorrect");
    }
  }

  return (
    <div className="flex flex-row justify-items-center h-screen text-[#121212] dark:text-white dark:bg-[#242424]">
      <div className="w-5/12 p-10">
        <img src="assets/png/loginBanner.png" className="h-full" />
      </div>

      <div className="w-7/12 p-20 flex justify-center items-center">
        <div className="w-3/5 px-10 flex flex-col bg-white dark:bg-[#121212]  rounded-2xl h-[80%] login-banner-shadow">
          <div className="h-1/4 flex justify-center items-end">
            <img
              src={
                cookies[constants.MODECOOKIE] === "light"
                  ? "/assets/png/GamersBack_Logo_Black.png"
                  : "/assets/png/GamersBack_Logo.png"
              }
              className="w-72"
            />
          </div>
          <div className="h-2/4 flex flex-col justify-center space-y-10">
            <div className="text-xl  text-[#121212] dark:text-white text-center">
              Enter your OTP for verification
            </div>
            <div className="">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                containerStyle={{
                  gap: "12px",
                }}
                inputStyle={{
                  width: "45px",
                  height: "45px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="bg-transparent rounded border-[#2f2f2f] dark:border-white border-[2px]"
                  />
                )}
              />
            </div>
          </div>
          <div className="h-1/4">
            <div onClick={otpHandler} className="w-1/3 mx-auto">
              <Button text={"Verify OTP"} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="cursor-pointer m-6">
          {cookies[constants.MODECOOKIE] === "light" ? (
            <BsSun
              className="text-2xl dark:text-zinc-200"
              onClick={() =>
                setCookie(
                  constants.MODECOOKIE,
                  JSON.stringify(constants.DARK),
                  {
                    path: "/",
                    maxAge: 3000000,
                    sameSite: "strict",
                  }
                )
              }
            />
          ) : (
            <BsMoonStars
              className="text-2xl dark:text-zinc-200"
              onClick={() =>
                setCookie(
                  constants.MODECOOKIE,
                  JSON.stringify(constants.LIGHT),
                  {
                    path: "/",
                    maxAge: 3000000,
                    sameSite: "strict",
                  }
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Otp;
