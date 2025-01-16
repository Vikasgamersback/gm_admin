//import dependencies
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { useCookies } from "react-cookie";

// import components
import Button from "../general-components/Button";

// import files
// import { apiList, invokeApi } from "../../utils/apiServiceUtils";
// import { config } from "../../utils/configUtils";
// import responseUtils from "../../utils/responseUtils";
import constants from "../../json/constants.json";
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import responseUtils from "../../utils/responseUtils";
import { config } from "../../utils/configUtils";

function ResetPassword() {
  const [cookies, setCookie] = useCookies();
  // state variables
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //constants
  const navigate = useNavigate();
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  //axios (api integration)
  const resetPasswordHandler = async () => {
    if (password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        if (
          passwordPattern.test(password) &&
          passwordPattern.test(confirmPassword)
        ) {
          let params = {
            email: localStorage.getItem("email"),
            password: password,
            confirmPassword: confirmPassword,
          };
          let response = await invokeApi(
            config.baseUrl + apiList.changePassword,
            params,
            cookies
          );
          if (response.customcode === 200) {
            navigate("/login");
          }
          responseUtils.showToster(response);
        } else {
          setPasswordError("Please enter a valid password");
        }
      } else {
        setPasswordError("Password not matching");
      }
    } else {
      setPasswordError("Please enter password");
    }
  };

  // function handlePasswordChange(event) {
  //   const { value } = event.target;
  //   setPassword(value);
  //   setPasswordError("");
  // }

  // function handleConfirmPassword(event) {
  //   const { value } = event.target;
  //   if (value === password) {
  //     setConfirmPassword(value);
  //   } else {
  //     setPasswordError("Passwords do not match");
  //   }
  // }

  // function handleSubmit() {
  //   if (!passwordPattern.test(password)) {
  //     setPasswordError("Please enter a valid password.");
  //   }
  // }

  return (
    <div className="flex flex-row justify-items-center h-screen text-[#121212] dark:text-white dark:bg-[#242424]">
      <div className="w-5/12 p-10">
        <img src="assets/png/loginBanner.png" className="h-full" />
      </div>

      <div className="w-7/12 p-20 flex justify-center items-center">
        <div className="w-3/5 px-10 flex flex-col bg-white dark:bg-[#121212] rounded-2xl h-[80%] login-banner-shadow">
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
            <div className="text-xl text-[#121212] dark:text-white text-center">
              Reset Password
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between  border-black dark:border-white rounded-lg border-2">
                <div>
                  <input
                    className="bg-transparent appearance-none p-3 w-full text-[#121212] dark:text-white placeholder-black dark:placeholder-white leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </div>
                <div className="flex items-center me-3">
                  {showPassword ? (
                    <div>
                      <AiFillEyeInvisible
                        className="text-2xl"
                        onClick={() => setShowPassword(false)}
                      />
                    </div>
                  ) : (
                    <div>
                      <AiFillEye
                        className="text-2xl"
                        onClick={() => setShowPassword(true)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <input
                className="bg-transparent border-2 border-black dark:border-white p-3 rounded-lg appearance-none w-full text-[#121212] dark:text-white leading-tight placeholder-black dark:placeholder-white focus:outline-none focus:shadow-outline"
                id="cnfmPassword"
                type="text"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
              />
              {passwordError && (
                <span className="text-red-600 mt-1">{passwordError}</span>
              )}
            </div>
          </div>
          <div className="h-1/4">
            <div className="w-1/3 mx-auto" onClick={resetPasswordHandler}>
              <Button text={"Reset"} />
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

export default ResetPassword;
