// import dependencies
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

// import components
import Button from "../general-components/Button";

// import files
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils";
import constants from "../../json/constants.json";


function Login() {
  const [cookies, setCookie] = useCookies();

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  // const usernamePattern = /^[a-zA-Z0-9_-]{6,16}$/;
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // state variables
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  //constants
  const navigate = useNavigate();

  //axios (api integration)
  const userLoginHandler = async () => {
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }
    if (!passwordPattern.test(password)) {
      setPasswordError("Please enter a valid password.");
      return;
    }
    if (emailPattern.test(email) && passwordPattern.test(password)) {
      let params = {
        email: email,
        password: password,
      };
      const response = await invokeApi(
        config.baseUrl + apiList.adminLogin,
        params,
        cookies
      );
      responseUtils.showToster(response);

      if (response.customcode === 200) {
        setCookie(constants.ADMINDATA, JSON.stringify(response.data), {
          path: "/",
          maxAge: 3000000,
          sameSite: "strict",
        });
        if (response.data.adminType === constants.HRADMINS) {
          // navigate(constants.PATH.NAVIGATEEMPLOYEEDASHBOARD);
          navigate(constants.PATH.NAVIGATEEMPLOYEELIST);
          setCookie(
            constants.SERVICESCOOKIE,
            JSON.stringify(constants.EMPLOYEES),
            {
              path: "/",
              maxAge: 3000000,
              sameSite: "strict",
            }
          );
        } else if (
          response.data.adminType === constants.SUPERADMINS ||
          response.data.adminType === constants.SUBADMINS
        ) {
          navigate("/");
        }
      }
    } else {
      toast.error(
        "Your credentials are incorrect, try again with vaild credentials"
      );
    }
  };

  function handleEmailChange(event) {
    const { value } = event.target;
    setEmail(value);
    setEmailError("");
  }
  function handlePasswordChange(event) {
    const { value } = event.target;
    setPassword(value);
    setPasswordError("");
  }

  return (
    <div className="flex flex-row  justify-items-center h-screen text-[#4f4f4f] dark:text-white dark:bg-[#242424]">
      <div className="w-5/12 p-10">
        <img src="assets/png/loginBanner.png" className="h-full object-contain" />
      </div>

      <div className="w-7/12 p-20 flex justify-center items-center">
        <div className="w-3/5 px-10 py-5 flex flex-col  bg-white dark:bg-[#121212] rounded-2xl h-[80%] login-banner-shadow">
          <div className="h-1/4 flex flex-col justify-center space-y-3 items-center">
            <img
              src={
                cookies[constants.MODECOOKIE] === constants.LIGHT
                  ? "/assets/png/GamersBack_Logo_Black.png"
                  : "/assets/png/GamersBack_Logo.png"
              }
              className="w-40"
            />
            <div className="text-2xl font-semibold  dark:text-white text-center">
              Login to admin panel
            </div>
          </div>
          <div className="h-2/4 flex flex-col justify-center space-y-5">
            <div>
              <input
                className="bg-transparent border-2 border-black dark:border-white p-3 rounded-lg appearance-none w-full text-[#121212] dark:text-white leading-tight placeholder-black dark:placeholder-white focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                maxLength={254}
              />
              {emailError && <p className="text-red-600">{emailError}</p>}
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between dark:border-white">
                <div className="w-5/6">
                  <input
                    className="bg-transparent appearance-none p-3 w-full rounded-l-lg border-t-2 border-b-2 border-l-2 border-black dark:border-white text-[#121212] dark:text-white placeholder-black dark:placeholder-white leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    maxLength={16}
                  />
                </div>
                <div className="flex items-center w-1/6 justify-center cursor-pointer rounded-r-lg border-t-2 border-b-2 border-r-2 border-black dark:border-white dark:bg-white">
                  {showPassword ? (
                    <div>
                      <AiFillEyeInvisible
                        className="text-2xl dark:text-black"
                        onClick={() => setShowPassword(false)}
                      />
                    </div>
                  ) : (
                    <div>
                      <AiFillEye
                        className="text-2xl dark:text-black"
                        onClick={() => setShowPassword(true)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                {passwordError && (
                  <span className="text-red-600">{passwordError}</span>
                )}
              </div>
            </div>

            <div
              className="flex flex-row justify-end hover:underline cursor-pointer"
              onClick={() => {
                navigate("/forgotpassword");
              }}
            >
              Forgot Password?
            </div>
          </div>
          <div className="h-1/4 flex items-center">
            <div
              className="w-1/3 mx-auto cursor-pointer"
              onClick={() => {
                userLoginHandler();
              }}
            >
              <Button text={"Submit"} />
            </div>
          </div>
        </div>
      </div>

      <div className="cursor-pointer m-6">
        {cookies[constants.MODECOOKIE] === constants.LIGHT ? (
          <BsSun
            className="text-2xl dark:text-zinc-200"
            onClick={() =>
              setCookie(constants.MODECOOKIE, JSON.stringify(constants.DARK), {
                path: "/",
                maxAge: 3000000,
                sameSite: "strict",
              })
            }
          />
        ) : (
          <BsMoonStars
            className="text-2xl dark:text-zinc-200"
            onClick={() =>
              setCookie(constants.MODECOOKIE, JSON.stringify(constants.LIGHT), {
                path: "/",
                maxAge: 3000000,
                sameSite: "strict",
              })
            }
          />
        )}
      </div>
    </div>
  );
}

export default Login;
