// @import dependencies
import { useState } from "react";
import { useCookies } from "react-cookie";

// @import files
import constants from "../../../../json/constants.json";

// @import components
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import AddUserModal from "../../../Modals/AddUserModal";
import DeleteUserModal from "../../../Modals/DeleteUserModal";
import { useNavigate } from "react-router-dom";
import FixedSidebar from "../../../general-components/FixedSidebar";
const NotificationTemplate = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const [notificationTabList, setNotificationTablist] = useState(0);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };
  const closeDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
  };
  return (
    <>
    <FixedSidebar/>
      <div className="section">
        <div className="m-10 flex flex-col space-y-8">
          {/* Breadcrumbs */}
          <BreadCrumbs
            nav1="Notification"
            nav2="Notification Template"
          />

          <div className="flex flex-row gap-6 text-sm">
            {/* <button
              className={
                notificationButton === 0
                  ? "border bg-[#1492E6] text-white rounded-lg px-6 py-3 font-bold"
                  : "px-6 py-3 font-bold"
              }
              onClick={() => navigate(constants.NAVIGATENOTIFICATIONSSEND)}
            >
              Send notification
            </button>
            <button
              className={
                notificationButton === 1
                  ? "border bg-[#1492E6] text-white rounded-lg px-6 py-3 font-bold"
                  : "px-6 py-3 font-bold"
              }
              onClick={() => setNotificationButton(1)}
            >
              Notification template
            </button> */}

           
         

            <div
            className={"flex gap-1 cursor-pointer pt-2"}
            onClick={() => {
              navigate("/notifications");
            }}
          >
            Send Notification
          </div>
          <div
            className={
              location.pathname === "/notifications/template"
                ? "font-semibold flex gap-1 text-white border p-2 rounded-lg bg-blue-400"
                : "flex gap-1"
            }
          >
           Notification Template
          </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-row gap-10 p-2 ">
            <p
              className={
                notificationTabList === 0
                  ? "border-b-4 border-blue-500 pb-2"
                  : ""
              }
              onClick={() => setNotificationTablist(0)}
            >
              General
            </p>
            <p
              className={
                notificationTabList === 1
                  ? "border-b-4 border-blue-500 pb-2"
                  : ""
              }
              onClick={() => setNotificationTablist(1)}
            >
              SMS
            </p>
            <p
              className={
                notificationTabList === 2
                  ? "border-b-4 border-blue-500 pb-2"
                  : ""
              }
              onClick={() => setNotificationTablist(2)}
            >
              Email
            </p>
            <p
              className={
                notificationTabList === 3
                  ? "border-b-4 border-blue-500 pb-2"
                  : ""
              }
              onClick={() => setNotificationTablist(3)}
            >
              Push Notification
            </p>
            <p
              className={
                notificationTabList === 4
                  ? "border-b-4 border-blue-500 pb-2"
                  : ""
              }
              onClick={() => setNotificationTablist(4)}
            >
              Whatsapp
            </p>
          </div>

          {/* User Table cards */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[500px]">
            {/* table header */}
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              {/* left */}
              <div className="flex flex-row items-center space-x-5">
                <img
                  src="/assets/png/sendnotification.svg"
                  className="h-10 w-10"
                />
                <h5 className="font-semibold">General Notifications</h5>
              </div>
              {/* Right */}
              <div className="flex flex-row items-center space-x-7">
                <div className="flex flex-row space-x-5 items-center">
                  <img src="/assets/png/filter.png" className="h-5 w-5" />

                  <img
                    src="/assets/png/add.png"
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => setIsAddUserModalOpen(true)}
                  />
                </div>
                {/* Search input */}
                <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full">
                  <img
                    className="h-5 w-5"
                    src={
                      cookies[constants.MODECOOKIE] === "light"
                        ? "/assets/png/search-light.png"
                        : "/assets/png/search-dark.png"
                    }
                  />
                  <input
                    className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                    placeholder="Search..."
                  />
                </div>
                <img
                  src="/assets/png/fullscreen-enter.png"
                  className="h-5 w-5"
                />
              </div>
            </div>
            {/* tables */}
            <table className="w-full text-sm text-left">
              <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff]  text-black]">
                <tr>
                  <th scope="col" className="text-center px-6 py-3">
                    <input type="checkbox" />
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    Template Name
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    Subject
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    Send Type
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    From Email
                  </th>

                  <th scope="col" className="text-center px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {gameSingleData?.awards.awards.map((el, index) => {
                return ( */}
                <tr className="font-semibold text-[#707070]">
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    <input type="checkbox" />
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    1.
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    Filter Users
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    Filter Users
                  </td>

                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    Automatic
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    hello@gamersback.com
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    <div className="flex flex-row space-x-4 items-center justify-center">
                      <img src="/assets/png/eye.png" className="h-5 w-5" />
                      <img src="/assets/png/view.png" className="h-5 w-5" />
                      <img src="/assets/png/delete.png" className="h-5 w-5" />
                    </div>
                  </td>
                </tr>
                {/* Second row */}
                <tr className="font-semibold text-[#707070]">
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    <input type="checkbox" />
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    2.
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    Filter Users
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    Filter Users
                  </td>

                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    Manual
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    hello@gamersback.com
                  </td>
                  <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                    <div className="flex flex-row space-x-4 items-center justify-center">
                      <img
                        src="/assets/png/eye.png"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => navigate(constants.NAVIGATEUSERSVIEW)}
                      />
                      <img src="/assets/png/view.png" className="h-5 w-5 " />
                      <img
                        src="/assets/png/delete.png"
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => setIsDeleteUserModalOpen(true)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

export default NotificationTemplate;
