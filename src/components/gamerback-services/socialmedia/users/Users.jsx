// @import dependencies
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

//React icons
import {
  MdCloseFullscreen,
  MdOpenInFull,
  MdOutlineEditNote,
  MdOutlineFilterAlt,
} from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RxEyeOpen } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";

// @import files
import constants from "../../../../json/constants.json";
import ConformationPopup from "../../../general-components/ConfirmationPopup";

// @import components
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import AddUserModal from "../../../Modals/AddUserModal";
import DeleteUserModal from "../../../Modals/DeleteUserModal";
import { useNavigate } from "react-router-dom";
import FixedSidebar from "../../../general-components/FixedSidebar";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";
import Spinner from "../../../general-components/Spinner";
import FilterModal from "../../../Modals/FilterModal";
import ActionButton from "../../../general-components/ActionButton";
import responseUtils from "../../../../utils/responseUtils";

const Users = () => {
  const navigate = useNavigate();
  const listInnerRef = useRef(null);

  const [cookies] = useCookies();
  const [usersTabList, setUsersTabList] = useState(0);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const [invokeUsers, setInvokeUsers] = useState(true);
  const [userData, setUserData] = useState(null);
  const [totalUser, setTotalUser] = useState(null);
  const [skip, setSkip] = useState(0);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("0-10");
  const [searchQuary, setsearchQuary] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredUserData, setFilteredUserData] = useState([]);

  const [toggleId, setToggleId] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(null);
    const [, setIsDataFetching] = useState(true);
  const [, setMaxDistReached] = useState(false);
  const [iSFullscreenModalOpen, setISFullscreenModalOpen] = useState(false);

  const [confirmPopup, setConfirmPopup] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsFetchLoading] = useState(true);

  //items for page
  const itemsPerPage = parseInt(selectedItemsPerPage.split("-")[1]);

  //get users
  useEffect(() => {
    const getUsers = async () => {
      setIsDataFetching(true);
      let params = {
        skip: skip,
        limit: itemsPerPage,
        search: searchQuary,
        filter: "",
        accountTypeFilter: "NORMAL",
        statusTypeFilter: "",
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getUserList,
        params,
        cookies
      );

      if (response.customcode === 200) {
        setUserData(response.data);
        setTotalUser(response.total);
        if (response.data.length < itemsPerPage) {
          setMaxDistReached(true);
        } else {
          setMaxDistReached(false);
        }
        if (skip > 0) {
          setUserData([...userData, ...response.data]);
          setIsDataFetching(false);
        } else {
          setUserData(response.data);
        }
        setTotalUser(response.total);
        setIsLoading(false);
        setIsFetchLoading(false);
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("something went wrong");
      }
    };
    if (invokeUsers) {
      setInvokeUsers(false);
      setIsFetchLoading(false);
      getUsers();
    }
  }, [cookies, invokeUsers, navigate, skip, itemsPerPage]);

  //changeStatusUser
  const changeStatusUser = async () => {
    console.log(toggleId, "toggleID");
    let params = {
      id: toggleId,
      status: toggleStatus,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changeStatusUser,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      setInvokeUsers(true);
      setActionStatus("");
      setToggleId(null);
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong while changing user status");
    }
  };

  // Archive User
  const archiveUser = async () => {
    let params = {
      id: toggleId,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.archiveUser,
      params,
      cookies
    );
    responseUtils.showToster(response);
    if (response.customcode === 200) {
      setInvokeUsers(true);
      setToggleId(null);
      setActionStatus("");
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong while deleting user");
    }
  };

  const confirmStatusHandler = (confirmStatus) => {
    if (confirmStatus) {
      actionStatus === "toggleStatus" ? changeStatusUser() : archiveUser();
    } else {
      return null;
    }
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };
  const closeDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
  };

  const handleSearchQueary = (e) => {
    setsearchQuary(e.target.value);
    setIsLoading(true);
    setInvokeUsers(true);
  };

  useEffect(() => {
    const filteredData = filteredUsers(userData, filterType);
    setFilteredUserData(filteredData);
  }, [userData]);

  const filteredUsers = (data, filterType) => {
    if (!filterType || filterType === "all") {
      return data;
    }
    return data.filter((user) => user.status === filterType);
  };

  return (
    <>
      <FixedSidebar />
      <div className="section">
        <div className="m-10 flex flex-col space-y-8">
          {/* Breadcrumbs */}
          <BreadCrumbs
            nav1="Users"
            nav2={`${
              usersTabList === 0
                ? "All Users"
                : usersTabList === 1
                ? "Verified Users"
                : usersTabList === 2
                ? "Banned Users"
                : usersTabList === 3
                ? "Suspended Users"
                : usersTabList === 4
                ? "Terminated Users"
                : ""
            }`}
          />

          {/* USers Tab List */}
          <div className="flex flex-row items-center space-x-20">
            <h5
              className={`${
                usersTabList === 0
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setUsersTabList(0);
                setInvokeUsers(true);
              }}
            >
              All Users
            </h5>
            <h5
              className={`${
                usersTabList === 1
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl  dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setUsersTabList(1);
                setInvokeUsers(true);
              }}
            >
              Verified Users
            </h5>
            <h5
              className={`${
                usersTabList === 2
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl  dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setUsersTabList(2);
                setInvokeUsers(true);
              }}
            >
              Banned Users
            </h5>
            <h5
              className={`${
                usersTabList === 3
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl  dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setUsersTabList(3);
                setInvokeUsers(true);
              }}
            >
              Suspended Users
            </h5>
            <h5
              className={`${
                usersTabList === 4
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl  dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setUsersTabList(4);
                setInvokeUsers(true);
              }}
            >
              Terminated Users
            </h5>
          </div>

          {/* User Table cards */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[500px]">
            {/* table header */}
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              {/* left */}
              <div className="flex flex-row items-center space-x-5">
                <img src="/assets/png/man.png" className="h-10 w-10" />
                <h5 className="font-semibold dark:text-[#ffff]">Users</h5>
                <p className="dark:text-gray-400">(Total Users: {totalUser})</p>
              </div>
              {/*Action buttons */}
              {filteredUserData?.some((el) => el.isChecked === true) > 0 && (
                <div className="flex gap-x-3">
                  <div
                    onClick={() => {
                      let tempData = [...filteredUserData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setActionStatus("toggleStatus");
                      setToggleStatus(constants.ACTIVESTATUS);
                      setConfirmPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.ACTIVE}
                      color={constants.GREEN}
                    />
                  </div>
                  <div
                    onClick={() => {
                      let tempData = [...filteredUserData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setActionStatus("toggleStatus");
                      setToggleStatus(constants.INACTIVESTATUS);
                      setConfirmPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.INACTIVE}
                      color={constants.BLUE}
                    />
                  </div>
                  <div
                    onClick={() => {
                      let tempData = [...filteredUserData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setActionStatus("toggleDelete");
                      setConfirmPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.DELETE}
                      color={constants.RED}
                    />
                  </div>
                </div>
              )}
              {/* Right */}
              <div className="flex flex-row items-center space-x-7">
                <div className="flex flex-row space-x-5 items-center">
                  <MdOutlineFilterAlt
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => setOpenFilterModal(true)}
                  />
                  <BiRefresh
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => {
                      setIsLoading(true);
                      setSkip(0);
                      setInvokeUsers(true);
                    }}
                  />

                  <IoMdAddCircleOutline
                    size={30}
                    onClick={() => setIsAddUserModalOpen(true)}
                    className=" cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                  />
                </div>
                {/* Search input */}
                <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full">
                  <IoSearchOutline size={30} className="dark:text-white" />
                  <input
                    className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                    placeholder="Search..."
                    value={searchQuary}
                    onChange={handleSearchQueary}
                  />
                </div>
                <MdOpenInFull
                  size={30}
                  className="dark:text-white cursor-pointer hover:dark:text-blue-400 hover:text-blue-400"
                  onClick={() => setISFullscreenModalOpen(true)}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {/* tables */}
                {filteredUserData?.length > 0 ? (
                  <div className="h-full overflow-y-auto" ref={listInnerRef}>
                    <table className="w-full text-sm text-left">
                      <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                        <tr>
                          <th scope="col" className="text-center px-6 py-3">
                            <input
                              type="checkbox"
                              checked={filteredUserData?.every(
                                (check) => check.isChecked
                              )}
                              onChange={() => {
                                let tempData = [...filteredUserData];
                                let allChecked = tempData.every(
                                  (el) => el.isChecked
                                );
                                if (allChecked) {
                                  tempData.map((el) => (el.isChecked = false));
                                } else {
                                  tempData.map((el) => (el.isChecked = true));
                                }
                                setUserData(tempData);
                              }}
                            />
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            No
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Username
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Verification
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Last Active
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUserData?.map((el, index) => {
                          return (
                            <tr
                              className="font-semibold text-[#707070]"
                              key={index}
                            >
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                <input
                                  type="checkbox"
                                  checked={el?.isChecked ? true : false}
                                  onChange={() => {
                                    let tempData = [...filteredUserData];
                                    tempData[index].isChecked =
                                      !tempData[index].isChecked;
                                    setUserData(tempData);
                                  }}
                                />
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {index + 1}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.name}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.userName}
                              </td>
                              <td className="flex items-center justify-center py-4 text-[#707070] dark:text-white">
                                <img
                                  src="/assets/png/verified-badge.png"
                                  className="h-5 w-5"
                                />
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.status === "ACTIVE" ? (
                                  <div className="bg-green-400 font-light  text-white px-1.5 py-1 rounded-lg">
                                    Active
                                  </div>
                                ) : (
                                  <div className="bg-red-400 font-light  text-white px-1.5 py-1 rounded-lg">
                                    InActive
                                  </div>
                                )}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                2 hours ago
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                <div className="flex flex-row space-x-3 items-center justify-center">
                                  <RxEyeOpen
                                    size={25}
                                    onClick={() =>
                                      // navigate(constants.PATH.NAVIGATEUSERSVIEW)
                                      navigate("/users/view", {
                                        state: el._id,
                                      })
                                    }
                                    className="hover:dark:text-blue-400 hover:text-blue-400 cursor-pointer"
                                  />
                                  <MdOutlineEditNote
                                    size={30}
                                    className="hover:dark:text-green-400 hover:text-green-400 cursor-pointer"
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="flex h-full w-full items-center justify-center font-semibold">
                    No data available
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {iSFullscreenModalOpen && (
        <div className="fixed z-10 inset-0 bg-opacity-60 bg-black flex justify-center items-center">
          <div className="flex flex-col w-full h-full dark:border-white dark:bg-[#393939] bg-white text-black">
            {/* table header */}
            <div className="flex flex-row items-center justify-between px-7 pt-5 py-4">
              {/* left */}
              <div className="flex flex-row items-center space-x-5">
                <img src="/assets/png/man.png" className="h-10 w-10" />
                <h5 className="font-semibold dark:text-[#ffff]">Users</h5>
                <p className="dark:text-gray-400">(Total Users: {totalUser})</p>
              </div>
              {/*Action buttons */}
              {filteredUserData?.some((el) => el.isChecked === true) > 0 && (
                <div className="flex gap-x-3">
                  <div
                    onClick={() => {
                      let tempData = [...filteredUserData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setActionStatus("toggleStatus");
                      setToggleStatus(constants.ACTIVESTATUS);
                      setConfirmPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.ACTIVE}
                      color={constants.GREEN}
                    />
                  </div>
                  <div
                    onClick={() => {
                      let tempData = [...filteredUserData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setActionStatus("toggleStatus");
                      setToggleStatus(constants.INACTIVESTATUS);
                      setConfirmPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.INACTIVE}
                      color={constants.BLUE}
                    />
                  </div>
                  <div
                    onClick={() => {
                      let tempData = [...filteredUserData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setActionStatus("toggleDelete");
                      setConfirmPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.DELETE}
                      color={constants.RED}
                    />
                  </div>
                </div>
              )}
              {/* Right */}
              <div className="flex flex-row items-center space-x-7">
                <div className="flex flex-row space-x-5 items-center">
                  <MdOutlineFilterAlt
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => setOpenFilterModal(true)}
                  />
                  <BiRefresh
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => {
                      setIsLoading(true);
                      setSkip(0);
                      setInvokeUsers(true);
                    }}
                  />

                  <IoMdAddCircleOutline
                    size={30}
                    onClick={() => setIsAddUserModalOpen(true)}
                    className=" cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                  />
                </div>
                {/* Search input */}
                <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full">
                  <IoSearchOutline size={30} className="dark:text-white" />
                  <input
                    className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                    placeholder="Search..."
                    value={searchQuary}
                    onChange={handleSearchQueary}
                  />
                </div>
                <MdCloseFullscreen
                  size={30}
                  className="dark:text-white cursor-pointer hover:dark:text-blue-400 hover:text-blue-400"
                  onClick={() => setISFullscreenModalOpen(false)}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {/* tables */}
                {filteredUserData?.length > 0 ? (
                  <div className="h-full overflow-y-auto" ref={listInnerRef}>
                    <table className="w-full text-sm text-left">
                      <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                        <tr>
                          <th scope="col" className="text-center px-6 py-3">
                            <input
                              type="checkbox"
                              checked={filteredUserData?.every(
                                (check) => check.isChecked
                              )}
                              onChange={() => {
                                let tempData = [...filteredUserData];
                                let allChecked = tempData.every(
                                  (el) => el.isChecked
                                );
                                if (allChecked) {
                                  tempData.map((el) => (el.isChecked = false));
                                } else {
                                  tempData.map((el) => (el.isChecked = true));
                                }
                                setUserData(tempData);
                              }}
                            />
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            No
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Username
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Verification
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Last Active
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUserData?.map((el, index) => {
                          return (
                            <tr
                              className="font-semibold text-[#707070]"
                              key={index}
                            >
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                <input
                                  type="checkbox"
                                  checked={el?.isChecked ? true : false}
                                  onChange={() => {
                                    let tempData = [...filteredUserData];
                                    tempData[index].isChecked =
                                      !tempData[index].isChecked;
                                    setUserData(tempData);
                                  }}
                                />
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {index + 1}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.name}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.userName}
                              </td>
                              <td className="flex items-center justify-center py-4 text-[#707070] dark:text-white">
                                <img
                                  src="/assets/png/verified-badge.png"
                                  className="h-5 w-5"
                                />
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.status === "ACTIVE" ? (
                                  <div className="bg-green-400 font-light  text-white px-1.5 py-1 rounded-lg">
                                    Active
                                  </div>
                                ) : (
                                  <div className="bg-red-400 font-light  text-white px-1.5 py-1 rounded-lg">
                                    InActive
                                  </div>
                                )}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                2 hours ago
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                <div className="flex flex-row space-x-3 items-center justify-center">
                                  <RxEyeOpen
                                    size={25}
                                    onClick={() =>
                                      // navigate(constants.PATH.NAVIGATEUSERSVIEW)
                                      navigate("/users/view", {
                                        state: el._id,
                                      })
                                    }
                                    className="hover:dark:text-blue-400 hover:text-blue-400 cursor-pointer"
                                  />
                                  <MdOutlineEditNote
                                    size={30}
                                    className="hover:dark:text-green-400 hover:text-green-400 cursor-pointer"
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="flex h-full w-full items-center justify-center font-semibold">
                    No data available
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <AddUserModal open={isAddUserModalOpen} close={closeAddUserModal} />
      <DeleteUserModal
        open={isDeleteUserModalOpen}
        close={closeDeleteUserModal}
      />
      {openFilterModal && (
        <FilterModal
          setOpenFilterModal={setOpenFilterModal}
          filterType={filterType}
          setFilterType={setFilterType}
          setIsLoading={setIsLoading}
          setInvokeFunction={setInvokeUsers}
          selectedItemsPerPage={selectedItemsPerPage}
          setSelectedItemsPerPage={setSelectedItemsPerPage}
          data={userData}
        />
      )}
      <ConformationPopup
        open={confirmPopup}
        close={() => setConfirmPopup(false)}
        text={
          actionStatus === "toggleStatus"
            ? constants.CHANGESTATUSPOPUPTEXT
            : constants.CHANGEDELETEPOPUPTEXT
        }
        heading={
          actionStatus === "toggleStatus"
            ? constants.STATUSCHANGE
            : constants.DELETESTATUS
        }
        submitHandler={confirmStatusHandler}
      />
    </>
  );
};

export default Users;
