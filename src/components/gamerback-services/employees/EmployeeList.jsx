import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import FixedSidebar from "../../general-components/FixedSidebar";
import AddEmployeesModal from "../../Modals/AddEmployeesModal";
import BreadCrumbs from "../../general-components/Breadcrumbs";

import constants from "../../../json/constants.json";
import { apiList, invokeApi } from "../../../utils/apiServiceUtils";
import responseUtils from "../../../utils/responseUtils";
import utils from "../../../utils/helperUtils";
import { config } from "../../../utils/configUtils";
import {
  MdCloseFullscreen,
  MdOpenInFull,
  MdOutlineEditNote,
  MdOutlineFilterAlt,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import ActionButton from "../../general-components/ActionButton";
import ConformationPopup from "../../general-components/ConfirmationPopup";
import Spinner from "../../general-components/Spinner";
import { RxEyeOpen } from "react-icons/rx";
import EditEmployeesModal from "../../Modals/EditEmployeesModal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import FilterModal from "../../Modals/FilterModal";

const EmployeeList = () => {
  const navigate = useNavigate();
  const listInnerRef = useRef(null);

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isEmployeeEditModalOpen, setIsEmployeeEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [employeeTabList, setEmployeeTabList] = useState(0);
  const [invokeEmployees, setInvokeEmployees] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [totalEmp, setTotalEmp] = useState(null);
  const [skip, setSkip] = useState(0);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("0-10");
  const [searchQuary, setsearchQuary] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredEmployeeData, setFilteredEmployeeData] = useState([]);

  // const [filter, setFilter] = useState("");
  const [toggleId, setToggleId] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(null);
  const [innerRef, setInnerRef] = useState(null);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [maxDistReached, setMaxDistReached] = useState(false);
  const [iSFullscreenModalOpen, setISFullscreenModalOpen] = useState(false);

  const [confirmPopup, setConfirmPopup] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchLoading, setIsFetchLoading] = useState(true);

  const [cookies] = useCookies();

  //items for page
  const itemsPerPage = parseInt(selectedItemsPerPage.split("-")[1]);

  const onCloseEmpModal = () => {
    setIsEmployeeModalOpen(false);
    setInvokeEmployees(true);
  };
  const onCloseEmpEditModal = () => {
    setIsEmployeeEditModalOpen(false);
    setInvokeEmployees(true);
  };

  // Check bottom Scroll reached
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll = () => {
    if (innerRef) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if (isNearBottom && !isDataFetching && !maxDistReached) {
        setSkip(skip + 10);
        setInvokeEmployees(true);
      }
    } else {
      console.error("on bottom scroll error");
    }
  };

  // changeStatusAdmin
  const changeStatusAdmin = async () => {
    let params = {
      id: toggleId,
      status: toggleStatus,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changeStatusAdmin,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      setInvokeEmployees(true);
      setActionStatus("");
      setToggleId(null);
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong");
    }
  };

  // ArchiveAdmin
  const archiveAdmin = async () => {
    let params = {
      id: toggleId,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.archiveAdmin,
      params,
      cookies
    );
    responseUtils.showToster(response);
    if (response.customcode === 200) {
      setInvokeEmployees(true);
      setToggleId(null);
      setActionStatus("");
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong");
    }
  };

  // popup confirm status handler
  const confirmStatusHandler = (confirmStatus) => {
    if (confirmStatus) {
      actionStatus === "toggleStatus" ? changeStatusAdmin() : archiveAdmin();
    } else {
      return null;
    }
  };

  // onScroll effect handler
  useEffect(() => {
    setInnerRef(listInnerRef.current);
    if (innerRef) {
      innerRef.addEventListener("scroll", onScroll);
      // Clean-up
      return () => {
        innerRef.removeEventListener("scroll", onScroll);
      };
    }
  }, [innerRef, onScroll]);

  // get employee data
  useEffect(() => {
    const getEmployees = async () => {
      setIsDataFetching(true);
      let params = {
        skip: skip,
        limit: itemsPerPage,
        search: searchQuary,
        typefilter:
          employeeTabList === 0
            ? "SUBADMINS"
            : employeeTabList === 1
            ? "HRADMINS"
            : employeeTabList === 2
            ? "EMPLOYEES"
            : "",
      };

      let response = await invokeApi(
        config.baseUrl + apiList.getAdminsList,
        params,
        cookies
      );

      if (response.customcode === 200) {
        setEmployeeData(response.data);
        setTotalEmp(response.total);
        if (response.data.length < itemsPerPage) {
          setMaxDistReached(true);
        } else {
          setMaxDistReached(false);
        }
        if (skip > 0) {
          setEmployeeData([...employeeData, ...response.data]);
          setIsFetchLoading(false);
        } else {
          setEmployeeData(response.data);
        }
        setTotalEmp(response.total);
        setIsLoading(false);
        setIsDataFetching(false);
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeEmployees) {
      setInvokeEmployees(false);
      setIsFetchLoading(false);
      getEmployees();
    }
  }, [cookies, employeeTabList, invokeEmployees, navigate, skip, itemsPerPage]);

  const handleSearchQueary = (e) => {
    setsearchQuary(e.target.value);
    setIsLoading(true);
    setInvokeEmployees(true);
  };

  // fitering data based on filtertype
  useEffect(() => {
    const filteredData = filteredEmployees(employeeData, filterType);
    setFilteredEmployeeData(filteredData);
  }, [employeeData]);

  const filteredEmployees = (data, filterType) => {
    if (!filterType || filterType === "all") {
      return data; // if filtertype not selected it returns the actual data.
    }
    return data.filter((employee) => employee.status === filterType);
  };
  return (
    <>
      {/* <FixedSidebar /> */}
      <div className="sectiona overflow-y-auto">
        <div className="m-10 flex flex-col space-y-4">
          <div className="flex flex-row items-center justify-between">
            {/* Breadcrumbs */}
            <BreadCrumbs
              nav1="Employee"
              nav2={
                employeeTabList === 0
                  ? "Sub-admin List"
                  : employeeTabList === 1
                  ? "HR-admin List"
                  : "Employee List"
              }
            />
          </div>

          {/* USers Tab List */}
          <div className="flex flex-row items-center space-x-20">
            <h5
              className={`${
                employeeTabList === 0
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl font-bold dark:px-3 dark:py-2 dark:bg-white dark:text-black "
                  : "text-[#949495] cursor-pointer font-semibold"
              }`}
              onClick={() => {
                setEmployeeTabList(0);
                setInvokeEmployees(true);
              }}
            >
              Sub Admin
            </h5>
            <h5
              className={`${
                employeeTabList === 1
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl font-bold dark:px-3 dark:py-2 dark:bg-white dark:text-black"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setEmployeeTabList(1);
                setInvokeEmployees(true);
              }}
            >
              Hr Admin
            </h5>
            <h5
              className={`${
                employeeTabList === 2
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl font-bold dark:px-3 dark:py-2 dark:bg-white dark:text-black"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setEmployeeTabList(2);
                setInvokeEmployees(true);
              }}
            >
              Employee
            </h5>
          </div>

          {/* User Table cards */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[520px]">
            {/* table header */}
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              {/* left */}
              <div className="flex flex-row items-center space-x-5">
                <img src="/assets/png/icons-spam.png" className="h-10 w-10" />
                <h5 className="font-semibold  dark:text-[#ffff]">
                  Employee list
                </h5>
                <p className="dark:text-gray-400">(Total: {totalEmp})</p>
              </div>
              {/* Active buttons */}
              {filteredEmployeeData?.some((el) => el.isChecked === true) >
                0 && (
                <div className="flex gap-x-3">
                  <div
                    onClick={() => {
                      let tempData = [...filteredEmployeeData];
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
                      let tempData = [...filteredEmployeeData];
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
                      let tempData = [...filteredEmployeeData];
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
                    title="Filter"
                    size={30}
                    className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                    onClick={() => {
                      setOpenFilterModal((prev) => !prev);
                      // setIsLoading(true);
                      // setInvokeEmployees(true);
                    }}
                  />

                  <BiRefresh
                    title="Refresh"
                    size={30}
                    className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                    onClick={() => {
                      setIsLoading(true);
                      setSkip(0);
                      setInvokeEmployees(true);
                    }}
                  />
                  <IoMdAddCircleOutline
                    title="Add"
                    size={30}
                    className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                    onClick={() => setIsEmployeeModalOpen(true)}
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
                  className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                  onClick={() => setISFullscreenModalOpen(true)}
                />
              </div>
            </div>
            {/* tables */}
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {filteredEmployeeData?.length > 0 ? (
                  <div className="h-full overflow-y-auto" ref={listInnerRef}>
                    <table className="w-full text-sm text-left">
                      <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                        <tr>
                          <th scope="col" className="text-center px-4 py-3">
                            <input
                              type="checkbox"
                              checked={filteredEmployeeData?.every(
                                (check) => check.isChecked
                              )}
                              onChange={() => {
                                let tempData = [...filteredEmployeeData];
                                let allChecked = tempData.every(
                                  (el) => el.isChecked
                                );
                                if (allChecked) {
                                  tempData.map((el) => (el.isChecked = false));
                                } else {
                                  tempData.map((el) => (el.isChecked = true));
                                }
                                setEmployeeData(tempData);
                              }}
                            />
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            No
                          </th>
                          <th scope="col" className="text-center px-3 py-3">
                            Name
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Phone
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Email
                          </th>
                          <th scope="col" className="text-center px-3 py-3">
                            Employee&nbsp;ID
                          </th>
                          <th scope="col" className="text-center px-3 py-3">
                            Type
                          </th>
                          <th scope="col" className="text-center px-3 py-3">
                            DOJ
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Status
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmployeeData?.map((el, index) => {
                          return (
                            <tr
                              key={index}
                              className="font-semibold text-[#707070]"
                            >
                              <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                                <input
                                  type="checkbox"
                                  checked={el?.isChecked ? true : false}
                                  onChange={() => {
                                    let tempData = [...filteredEmployeeData];
                                    tempData[index].isChecked =
                                      !tempData[index].isChecked;
                                    setEmployeeData(tempData);
                                  }}
                                />
                              </td>
                              <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                                {index + 1}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {el.firstName}&nbsp;{el.lastName}
                                <br />
                                <p className="text-gray-400">({el.nickName})</p>
                              </td>
                              <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                                {el.phone.code}&nbsp;{el.phone.number}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {el.email}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {el.employeeId}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {el.employeeType}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {utils.getDateFormat(
                                  el.dateOfJoining,
                                  "dd/mm/yyyy"
                                )}
                              </td>
                              <td className="text-center px-4 py-4 text-[#707070] dark:text-white cursor-default">
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
                                <div className="flex flex-row space-x-3 items-center">
                                  <RxEyeOpen
                                    size={25}
                                    className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                                    onClick={() =>
                                      navigate("/employee-view", {
                                        state: el._id,
                                      })
                                    }
                                  />
                                  <MdOutlineEditNote
                                    size={25}
                                    className="text-black dark:text-white cursor-pointer hover:dark:text-green-600 hover:text-green-600"
                                    onClick={() => {
                                      setIsEmployeeEditModalOpen(true);
                                      setEditId(el._id);
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {isFetchLoading ? (
                          <div className="h-full w-full flex items-center justify-center">
                            <Spinner />
                          </div>
                        ) : null}
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
      <AddEmployeesModal open={isEmployeeModalOpen} close={onCloseEmpModal} />
      {isEmployeeEditModalOpen && (
        <EditEmployeesModal
          isEmployeeEditModalOpen={isEmployeeEditModalOpen}
          close={onCloseEmpEditModal}
          editId={editId}
        />
      )}

      {/* Full screen modal open */}
      {iSFullscreenModalOpen && (
        <div className="fixed z-10 inset-0 bg-opacity-60 bg-black flex justify-center items-center">
          <div className="flex flex-col w-full h-full dark:border-white dark:bg-[#393939] bg-white text-black">
            {/* User Table cards */}
            <div className="flex flex-col space-y-5 card w-full h-full">
              {/* table header */}
              <div className="flex flex-row items-center justify-between px-7 pt-5">
                {/* left */}
                <div className="flex flex-row items-center space-x-5">
                  <img src="/assets/png/icons-spam.png" className="h-10 w-10" />
                  <h5 className="font-semibold dark:text-white">
                    Employee list
                  </h5>
                  <p className="dark:text-gray-400">(Total: {totalEmp})</p>
                </div>
                {/* Active buttons */}
                {filteredEmployeeData?.some((el) => el.isChecked === true) >
                  0 && (
                  <div className="flex gap-x-3">
                    <div
                      onClick={() => {
                        let tempData = [...filteredEmployeeData];
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
                        let tempData = [...filteredEmployeeData];
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
                        let tempData = [...filteredEmployeeData];
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
                      className="text-black dark:text-white cursor-pointer"
                      onClick={() => {
                        // setIsLoading(true);
                        setOpenFilterModal(true);
                        // setInvokeEmployees(true);
                      }}
                    />
                    <BiRefresh
                      size={30}
                      className="text-black dark:text-white cursor-pointer"
                      onClick={() => {
                        setIsLoading(true);
                        setInvokeEmployees(true);
                      }}
                    />
                    <IoMdAddCircleOutline
                      size={30}
                      className="text-black dark:text-white cursor-pointer"
                      onClick={() => setIsEmployeeModalOpen(true)}
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
                  {/* <img
                  src="/assets/png/fullscreen-enter.png"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setISFullscreenModalOpen(true)}
                /> */}
                  <MdCloseFullscreen
                    size={30}
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() => setISFullscreenModalOpen(false)}
                  />
                </div>
              </div>
              {/* tables */}
              {isLoading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  {filteredEmployeeData?.length > 0 ? (
                    <div className="h-full overflow-y-auto" ref={listInnerRef}>
                      <table className="w-full text-sm text-left">
                        <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                          <tr>
                            <th scope="col" className="text-center px-4 py-3">
                              <input
                                type="checkbox"
                                checked={filteredEmployeeData?.every(
                                  (check) => check.isChecked
                                )}
                                onChange={() => {
                                  let tempData = [...filteredEmployeeData];
                                  let allChecked = tempData.every(
                                    (el) => el.isChecked
                                  );
                                  if (allChecked) {
                                    tempData.map(
                                      (el) => (el.isChecked = false)
                                    );
                                  } else {
                                    tempData.map((el) => (el.isChecked = true));
                                  }
                                  setEmployeeData(tempData);
                                }}
                              />
                            </th>
                            <th scope="col" className="text-center px-2 py-3">
                              No
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                              Name
                            </th>
                            <th scope="col" className="text-center px-4 py-3">
                              Phone
                            </th>
                            <th scope="col" className="text-center px-4 py-3">
                              Email
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                              Employee&nbsp;ID
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                              Type
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                              DOJ
                            </th>
                            <th scope="col" className="text-center px-4 py-3">
                              Status
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredEmployeeData?.map((el, index) => {
                            return (
                              <tr
                                key={index}
                                className="font-semibold text-[#707070]"
                              >
                                <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                                  <input
                                    type="checkbox"
                                    checked={el?.isChecked ? true : false}
                                    onChange={() => {
                                      let tempData = [...filteredEmployeeData];
                                      tempData[index].isChecked =
                                        !tempData[index].isChecked;
                                      setEmployeeData(tempData);
                                    }}
                                  />
                                </td>
                                <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                                  {index + 1}
                                </td>
                                <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                  {el.firstName}&nbsp;{el.lastName}
                                  <br />
                                  <p className="text-gray-400">
                                    ({el.nickName})
                                  </p>
                                </td>
                                <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                                  {el.phone.code}&nbsp;{el.phone.number}
                                </td>
                                <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                  {el.email}
                                </td>
                                <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                  {el.employeeId}
                                </td>
                                <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                  {el.employeeType}
                                </td>
                                <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                  {utils.getDateFormat(
                                    el.dateOfJoining,
                                    "dd/mm/yyyy"
                                  )}
                                </td>
                                <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
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
                                  <div className="flex flex-row space-x-3 items-center">
                                    <RxEyeOpen
                                      size={25}
                                      className="text-black dark:text-white cursor-pointer"
                                      onClick={() =>
                                        navigate("/employee-view", {
                                          state: el._id,
                                        })
                                      }
                                    />
                                    <MdOutlineEditNote
                                      size={25}
                                      className="text-black dark:text-white cursor-pointer"
                                      onClick={() => {
                                        setIsEmployeeEditModalOpen(true);
                                        setEditId(el._id);
                                      }}
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
      {openFilterModal && (
        <FilterModal
          setOpenFilterModal={setOpenFilterModal}
          filterType={filterType}
          setFilterType={setFilterType}
          setIsLoading={setIsLoading}
          setInvokeFunction={setInvokeEmployees}
          selectedItemsPerPage={selectedItemsPerPage}
          setSelectedItemsPerPage={setSelectedItemsPerPage}
          data={employeeData}
        />
      )}
    </>
  );
};

export default EmployeeList;
