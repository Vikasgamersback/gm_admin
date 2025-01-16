import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import helperUtils from "../../utils/helperUtils";
import constants from "../../json/constants.json";
import { useState } from "react";

const Home = () => {
  const [cookies, setCookie] = useCookies();
  const [dateTime, setDateTime] = useState("");
  const navigate = useNavigate();

  // Check user is login or not
  useEffect(() => {
    if (cookies[constants.ADMINDATA] === undefined) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [cookies, navigate]);

  // setting time of every one min
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(helperUtils.handlingTimeAndDate());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-20 h-[100vh] overflow-y-auto">
      <div className="m-10 flex flex-col space-y-8">
        {/* Card */}
        <div className="relative h-[170px] w-full card card-shadow p-10">
          {/* Calender */}
          <div className="absolute right-10 flex flex-row items-center  justify-end space-x-3">
            {/* Img */}
            <img className="h-7 w-7" src="/assets/png/calendar.png" />
            <h5 className="text-lg dark:text-[#ffffff]">{dateTime}</h5>
          </div>
          <div className="flex flex-row items-center space-x-8">
            <img src="/assets/png/icons-avatar.png" className="h-24 w-24" />
            <div className="flex flex-col space-y-1">
              <h3 className="text-3xl dark:text-[#ffffff] font-bold">
                {helperUtils.greetingHandler()}{" "}
                {cookies[constants.ADMINDATA]?.firstName}!
              </h3>
              <h6 className="text-[#707070] text-lg">
                Rise and shine! Its a brand new day full of possibilities.
              </h6>
            </div>
          </div>
        </div>
        {/* All services */}
        <div className="flex flex-col">
          <h5 className="font-semibold text-2xl dark:text-[#ffff]">
            All Services
          </h5>
          <p className="text-[#707070] font-medium">
            Efficiency and Control: Explore the Admin Panel.
          </p>
        </div>
        {/* Cards */}
        <div className="flex flex-row space-x-4">
          <div
            className="card flex flex-col space-y-4 items-center justify-center card-shadow w-[150px] h-[150px] cursor-pointer "
            onClick={() => {
              navigate(constants.PATH.NAVIGATESOCIALDASHBOARD);
              setCookie(
                constants.SERVICESCOOKIE,
                JSON.stringify(constants.SOCIALMEDIA),
                {
                  path: "/",
                  maxAge: 3000000,
                  sameSite: "strict",
                }
              );
            }}
          >
            <img src="/assets/png/logo-black.png" className="h-14 w-14" />
            <h5 className="font-semibold dark:text-[#ffff]">Social Media</h5>
          </div>
          <div
            className="card flex flex-col space-y-4 items-center justify-center card-shadow w-[150px] h-[150px] cursor-pointer "
            onClick={() => {
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
            }}
          >
            <img src="/assets/png/man.png" className="h-14 w-14" />
            <h5 className="font-semibold dark:text-[#ffff]">Employees</h5>
          </div>

          {/* landing page card */}
          <div
            className="card flex flex-col space-y-4 items-center justify-center card-shadow w-[150px] h-[150px] cursor-pointer "
            onClick={() => {
             // navigate(constants.PATH.NAVIGATELANDINGPAGEDASHBOARD);
              navigate(constants.PATH.NAVIGATEBLOGS);
              setCookie(
                constants.SERVICESCOOKIE,
                JSON.stringify(constants.LANDINGPAGE),
                {
                  path: "/",
                  maxAge: 3000000,
                  sameSite: "strict",
                }
              );
            }}
          >
           {/* // <Link to = "/components/gamerback-services/landing-page/LandingPageDashboard"> */}
            <img src="/assets/svg/landing-page.svg" className="h-14 w-14" />
            <h5 className="font-semibold dark:text-[#ffff]">Landing Page</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
