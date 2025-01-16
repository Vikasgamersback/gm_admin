// @import dependencies
import { useState } from "react";

// @import files

// @import components
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import AddUserModal from "../../../Modals/AddUserModal";
import DeleteUserModal from "../../../Modals/DeleteUserModal";
import { useNavigate } from "react-router-dom";
import FixedSidebar from "../../../general-components/FixedSidebar";
const Notification = () => {
  const navigate = useNavigate();

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
      <FixedSidebar />
      <div className="section overflow-y-auto">
        <div className="m-10 flex flex-col space-y-8">
          {/* Breadcrumbs */}
          <BreadCrumbs nav1="Notification" nav2="Send Notification" />

          <div className="flex flex-row gap-6 text-sm">
            <div
              className={
                location.pathname === "/notifications"
                  ? "font-semibold flex gap-1  text-white border p-2 rounded-lg bg-blue-400"
                  : "flex gap-1 "
              }
            >
              Send Notification
            </div>
            <div
              className={"flex gap-1 cursor-pointer pt-2 dark:text-white"}
              onClick={() => {
                navigate("/notifications/template");
              }}
            >
              Notification template
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-row gap-10 p-2 ">
            <p
              className={
                notificationTabList === 0
                  ? "border-b-4 border-blue-500 pb-2 dark:text-white "
                  : "cursor-pointer  dark:text-gray-400"
              }
              onClick={() => setNotificationTablist(0)}
            >
              General
            </p>
            <p
              className={
                notificationTabList === 1
                  ? "border-b-4 border-blue-500 pb-2 dark:text-white "
                  : "cursor-pointer dark:text-gray-400"
              }
              onClick={() => setNotificationTablist(1)}
            >
              SMS
            </p>
            <p
              className={
                notificationTabList === 2
                  ? "border-b-4 border-blue-500 pb-2 dark:text-white "
                  : "cursor-pointer dark:text-gray-400"
              }
              onClick={() => setNotificationTablist(2)}
            >
              Email
            </p>
            <p
              className={
                notificationTabList === 3
                  ? "border-b-4 border-blue-500 pb-2 dark:text-white "
                  : "cursor-pointer dark:text-gray-400"
              }
              onClick={() => setNotificationTablist(3)}
            >
              Push Notification
            </p>
            <p
              className={
                notificationTabList === 4
                  ? "border-b-4 border-blue-500 pb-2 dark:text-white "
                  : " cursor-pointer dark:text-gray-400"
              }
              onClick={() => setNotificationTablist(4)}
            >
              Whatsapp
            </p>
          </div>

          {/* User Table cards */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[500px]">
            {/* table header */}
            <div className="flex flex-row items-center justify-between px-7 py-5 border-b-2 m">
              {/* left */}
              <div className="flex flex-row items-center space-x-5 ">
                <img
                  src="/assets/png/sendnotification.svg"
                  className="h-10 w-10"
                />
                <h5 className="font-semibold dark:text-white">General Notifications</h5>
              </div>
            </div>
            <div className="overflow-y-auto h-[900px]">
              <label>
                <span className=" ml-10 text-sm font-medium text-slate-700">
                  Subject
                </span>
                <input
                  type="text"
                  name="subject"
                  className="mt-1 ml-10 py-1 bg-zinc-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[1100px] rounded-md sm:text-sm focus:ring-1"
                />
                <span className=" ml-10 text-sm font-medium text-slate-700">
                  Sender Name
                </span>
                <input
                  type="text"
                  name="subject"
                  className="mt-1 ml-10 py-1 bg-zinc-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[1100px] rounded-md sm:text-sm focus:ring-1"
                />

                <span className=" ml-10 text-sm font-medium text-slate-700">
                  Email Content
                </span>
                <input
                  type="text"
                  name="subject"
                  className="mt-1 ml-10 py-1 bg-zinc-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[1100px] h-[250px] rounded-md sm:text-sm focus:ring-1"
                />

                <div className="mt-2 ml-10 py-1 flex flex-row w-[1100px] justify-end">
                  <button
                    onClick={() => navigate("/notifications/next")}
                    className="border py-1 px-12 bg-[#1492E6] rounded-lg text-white"
                  >
                    Next
                  </button>
                </div>
              </label>
            </div>
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

export default Notification;
