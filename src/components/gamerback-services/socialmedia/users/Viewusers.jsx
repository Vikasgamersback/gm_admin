import { useState, useEffect, useRef } from "react";
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import { IoIosArrowForward } from "react-icons/io";
import AddUserModal from "../../../Modals/AddUserModal";
import DeleteUserModal from "../../../Modals/DeleteUserModal";
import FixedSidebar from "../../../general-components/FixedSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";

import ViewTabs from "../../../general-components/ViewTabs";
import helperUtils from "../../../../utils/helperUtils";

const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies();

  const [userDetails, setUserDetails] = useState(0);
  const [invokeUser, setInvokeUser] = useState(true);

  const listInnerRef = useRef(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [innerRef, setInnerRef] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [profileDataTab, setProfileDataTab] = useState(0);

  // Check left Scroll reached
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScrollLeft = () => {
    if (innerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = listInnerRef.current;
      const isNearLeft =
        Math.round(scrollLeft) + 1 + clientWidth >= scrollWidth;
      if (isNearLeft) {
        setShowLeftArrow(false);
      } else {
        setShowLeftArrow(true);
      }
      if (scrollLeft === 0) {
        setShowRightArrow(false);
      } else {
        setShowRightArrow(true);
      }
    } else {
      console.error("on bottom scroll error");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      let params = {
        _id: location?.state,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getUserDetail,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setUserDetails(response.data);
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeUser) {
      setInvokeUser(false);
      getUser();
    }
  }, [cookies, invokeUser, location?.state, navigate]);

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };
  const closeDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
  };

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  // onScroll left handler
  useEffect(() => {
    setInnerRef(listInnerRef.current);
    if (innerRef) {
      innerRef.addEventListener("scroll", onScrollLeft);
      // Clean-up
      return () => {
        innerRef.removeEventListener("scroll", onScrollLeft);
      };
    }
  }, [innerRef, onScrollLeft]);
  const dob = userDetails?.dob;
    const date = new Date(dob);
    const formattedDate = date.toLocaleDateString(); 
  return (
    <>
      <FixedSidebar />
      <div className="section overflow-y-auto">
        <div className="m-10 flex flex-col space-y-8">
          {/* Breadcrumbs */}
          <BreadCrumbs
            nav1="Users"
            nav2={
              profileDataTab === 0
                ? "Personal Information"
                : profileDataTab === 1
                ? "Account Login Info"
                /* : profileDataTab === 2 */
                /* ? "Activity" */
                /* : profileDataTab === 2
                ? "User Reports" */
                : profileDataTab === 4
                ? "Wallets Details"
               /*  : profileDataTab === 5
                ? "Chats" */
                /* : profileDataTab === 6
                ? "Posts" */
                : profileDataTab === 7
                ? "Games Played"
                /* : profileDataTab === 8
                ? "Device Info" */
                /* : profileDataTab === 9
                ? "Linked Games" */
                /* : profileDataTab === 10
                ? "Stats" */
                /* : profileDataTab === 11
                ? "Chats" */
               /*  : profileDataTab === 12
                ? "Interests" */
                /* : profileDataTab === 13
                ? "Tournament Details" */
                /* : profileDataTab === 14
                ? "Ad View Home" */
                /* : profileDataTab === 15
                ? "Avatar History" */
                : profileDataTab === 16
                ? "Verification"
                : ""
            }
          />

          {/* User Banner Card */}
          <div className="relative  w-full image-shade">
            {/* Dynamic */}
            <img src="/assets/png/background.png" />

            {/* Right bar */}
            <div className=" flex z-10 flex-row space-x-6  items-center justify-center bg-white absolute rounded-lg p-3 top-6 right-6">
              <img src="/assets/png/eye.png" className="h-5 w-5" />
              <img src="/assets/png/verified-badge.png" className="h-5 w-5" />
              <img src="/assets/png/edit.png" className="h-5 w-5" />
              <img src="/assets/png/delete.png" className="h-5 w-5" />
            </div>

            <div className="absolute z-10 flex  justify-around w-full items-center bottom-7 text-white">
              <div className="flex flex-row space-x-6  items-center">
                <img
                  src={userDetails?.profilePic}
                  className="w-20 rounded-lg"
                />

                <div className="flex flex-col items-center space-y-2">
                  <h5>{userDetails?.name}</h5> <h6>@{userDetails?.name}</h6>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <h5>Account Type</h5> <h6>{userDetails?.accountType}</h6>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h5>Followers</h5> <h6>{userDetails?.followers?.length}</h6>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h5>Following</h5> <h6>{userDetails?.followings?.length}</h6>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h5>Profile</h5>
                <div className="flex flex-row items-center space-x-5">
                  <img src="/assets/png/icons-posts.png" className="h-6 w-6" />
                  <img src="/assets/png/icons-spam.png" className="h-6 w-6" />
                  <img
                    src="/assets/png/icons-tutorial.png"
                    className="h-6 w-6"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Users Tab List */}
          <div className="relative flex  items-center">
            {showRightArrow && (
              <IoIosArrowForward
                size={40}
                className="absolute left-0 bottom-0 rotate-180 p-2 bg-[#F1F1F9] cursor-pointer"
                onClick={slideRight}
              />
            )}
            <div
              id="slider"
              ref={listInnerRef}
              className="flex space-x-9 px-5 w-full overflow-x-scroll scroll-smooth"
            >
              <h5
                className={`${
                  profileDataTab === 0
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(0)}
              >
                Personal&nbsp;Info
              </h5>
              <h5
                className={`${
                  profileDataTab === 1
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(1)}
              >
                Account&nbsp;Login&nbsp;Info
              </h5>
             {/*  <h5
                className={`${
                  profileDataTab === 2
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(2)}
              >
                Activity
              </h5> */}
              {/* <h5
                className={`${
                  profileDataTab === 3
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(3)}
              >
                User&nbsp;Report
              </h5> */}
              <h5
                className={`${
                  profileDataTab === 4
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(4)}
              >
                Wallet&nbsp;Details
              </h5>
              {/* <h5
                className={`${
                  profileDataTab === 5
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(5)}
              >
                Posts
              </h5> */}
              <h5
                className={`${
                  profileDataTab === 6
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(6)}
              >
                Games&nbsp;Played
              </h5>
              {/* <h5
                className={`${
                  profileDataTab === 7
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(7)}
              >
                Device&nbsp;Info
              </h5> */}
              {/* <h5
                className={`${
                  profileDataTab === 8
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(8)}
              >
                Linked&nbsp;Games
              </h5> */}
            {/*   <h5
                className={`${
                  profileDataTab === 9
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(9)}
              >
                Games&nbsp;Stats
              </h5> */}
              {/* <h5
                className={`${
                  profileDataTab === 10
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(10)}
              >
                Chat
              </h5> */}
              {/* <h5
                className={`${
                  profileDataTab === 11
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(11)}
              >
                Interests
              </h5> */}
              {/* <h5
                className={`${
                  profileDataTab === 12
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(12)}
              >
                Tournament&nbsp;Details
              </h5>
              <h5
                className={`${
                  profileDataTab === 13
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(13)}
              >
                Ad&nbsp;View&nbsp;Home
              </h5> */}
             {/*  <h5
                className={`${
                  profileDataTab === 14
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(14)}
              >
                Avatar&nbsp;History
              </h5> */}
              <h5
                className={`${
                  profileDataTab === 15
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(15)}
              >
                Verification
              </h5>
            </div>
            {showLeftArrow && (
              <IoIosArrowForward
                size={40}
                className="absolute right-0 bottom-0 p-2 bg-[#F1F1F9] cursor-pointer"
                onClick={slideLeft}
              />
            )}
          </div>
          {/* User Table cards */}
          {/**Personal Information 1 */}
          {profileDataTab === 0 && (
            <ViewTabs
              heading="Personal Information"
              text1="Full Name"
              textDetails1={userDetails?.name}
              text2="Username"
              textDetails2={userDetails?.userName}
              text3="Date of Birth"
              textDetails3={formattedDate}
              text4="Gender"
              textDetails4={userDetails?.gender}
            />
          )}
          {/**Account Login Info */}
          {profileDataTab === 1 && (
            <ViewTabs
              heading="Account Login Info"
              text1="Email"
              textDetails1={userDetails?.email}
              text2="Secondary Email"
              textDetails2={userDetails?.secondaryEmail}
              text3="Created At"
              textDetails3={helperUtils.getDateFormat(
                userDetails?.createdAt,
                "dd/mm/yyyy"
              )}
            />
          )}
          {/**Activity */}
          {/* {profileDataTab === 2 && (
            <ViewTabs
              heading="Activity"
              text1="Last Logout Time"
              textDetails1={helperUtils.getTimeFormat(
                userDetails?.lastLogoutTime,
                "hh:mm/:ss"
              )}
              text3="Last Edited Time"
              textDetails3={helperUtils.getTimeFormat(
                userDetails?.lastEditedTime,
                "hh:mm/:ss"
              )}
            />
          )} */}

          {/**Device Info */}
          {/* {profileDataTab === 7 && (
            <ViewTabs
              heading="Device Info"
              text1="Devide ID"
              textDetails1={userDetails?.deviceInfo?.map((device) => {
                return device._id;
              })}
              text2="Device Type"
              textDetails2={userDetails?.deviceInfo?.map((device) => {
                return device.deviceType;
              })}
              text3="IP Address"
              textDetails3={userDetails?.deviceInfo?.map((device) => {
                return device.ip;
              })}
              text4="Platform"
              textDetails4={userDetails?.deviceInfo?.map((device) => {
                return device.platform;
              })}
            />
          )} */}
        </div>
      </div>

      <AddUserModal open={isAddUserModalOpen} close={closeAddUserModal} />
      <DeleteUserModal
        open={isDeleteUserModalOpen}
        close={closeDeleteUserModal}
      />
    </>
  );
};

export default Users;
