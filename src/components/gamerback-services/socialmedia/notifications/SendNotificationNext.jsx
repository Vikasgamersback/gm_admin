// @import dependencies
import { useState } from "react";


// @import files


// @import components
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import AddUserModal from "../../../Modals/AddUserModal";
import DeleteUserModal from "../../../Modals/DeleteUserModal";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import FixedSidebar from "../../../general-components/FixedSidebar";
const SendNotificationNext = () => {
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
     <FixedSidebar/>
      <div className="section overflow-y-auto">
        <div className="m-10 flex flex-col space-y-8">
          {/* Breadcrumbs */}
          <BreadCrumbs
            nav1="Notifications"
            nav2="Send Notifications"
          />

        
          <div className="flex flex-row gap-6 text-sm">
            {/* <button
              className={
                notificationButton === 0
                  ? "border bg-[#1492E6] text-white rounded-lg px-6 py-3 font-bold"
                  : "px-6 py-3 font-bold"
              }
              onClick={() => navigate(constants.NAVIGATENOTIFICATIONS)}
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
            className={
              location.pathname === "/notifications"
                ? "font-semibold flex gap-1"
                : "flex gap-1"
            }
          >
            Send Notification
          </div>
          <div
            className={"flex gap-1 cursor-pointer"}
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
            <div className="flex flex-row items-center justify-between px-7 py-5 border-b-2 m">
              {/* left */}
              <div className="flex flex-row items-center space-x-5 ">
                <img
                  src="/assets/png/sendnotification.svg"
                  className="h-10 w-10"
                />
                <h5 className="font-semibold">General Notifications</h5>
              </div>
            </div>
            <div className="overflow-y-auto h-[900px]">
              <label>
              

              <div className=" ml-10 pb-2" >Send To</div>
              <select className=" ml-10 pb-2 w-[1100px] bg-zinc-100 border rounded-lg border-slate-300">
                <option></option>
                <option>kkjhlkhk</option>
                <option>1dddliv</option>
              </select>
              <div className=" ml-10 pb-2 mt-5" >Filter By</div>
                <span className=" ml-10 text-sm font-medium text-slate-700">
                 Age 
                </span>
                <input
                  type="text"
                  name="subject"
                  className="mt-1 ml-10 py-1 bg-zinc-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[1100px] rounded-md sm:text-sm focus:ring-1"
                />
              

<span className=" ml-10 text-sm font-medium text-slate-700">
                  By City
                </span>
                <input
                  type="text"
                  name="subject"
                  className="mt-1 ml-10 py-1 bg-zinc-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[1100px] rounded-md sm:text-sm focus:ring-1"
                />

<span className=" ml-10 text-sm font-medium text-slate-700">
                  State
                </span>
                <input
                  type="text"
                  name="subject"
                  className="mt-1 ml-10 py-1 bg-zinc-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[1100px] rounded-md sm:text-sm focus:ring-1"
                />

                <span className=" ml-10 text-sm font-medium text-slate-700">
             Country
                </span>
                <div className="relative">
              
                <input
                  type="text" 
                  name="subject"
                  className="mt-1 ml-10 py-1 bg-zinc-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[1100px]  rounded-md sm:text-sm focus:ring-1"
                />
                
                  <span className=" ml-10 text-sm font-medium text-slate-700">
                 By User
                </span>
                <AiOutlineSearch className="absolute ml-12 mt-2.5 text-slate-500"/>
                </div>
                <input
                
                  type="text"
                  name="subject"
                  placeholder="         Search"
                  className="mt-1 ml-10 py-1 bg-zinc-100 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-[1100px] rounded-md sm:text-sm focus:ring-1"
                />

                <div className="ml-8 my-5 p-2">Selected Users</div>


                <div className="ml-10 w-[1100px] border rounded-lg bg-black">
                  <table className="border-collapse w-full   ">
                    <thead className=" text-white px-4 ">
                      <tr>
                        <td className="px-10 ">S.No</td>
                        <td className="px-10 ">Name</td>
                        <td className="px-10  ">Username</td>
                        <td className="px-10 ">Email ID</td>
                        <td className="px-10 ">Ph No</td>
                        <td className="px-10 ">Actions</td>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                    <td className="px-10 py-3">1</td>
                    <td className="px-10 py-3">Arvinth Kumar</td>
                    <td className="px-10 py-3">kjkhkjh</td>
                    <td className="px-10 py-3">kjkjh@gmail.com</td>
                    <td className="px-10 py-3">9098978787</td>
                    <td className="px-10 py-3 "><BsFillTrashFill/></td>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 ml-10 py-1 flex flex-row w-[1100px] justify-end">
                  <button onClick={()=>navigate("/notifications")} className="border py-1 px-12 bg-[#1492E6] rounded-lg text-white">
                    Prev
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

export default SendNotificationNext;
