import { useEffect, useRef, useState } from "react";
import FixedSidebar from "../../../general-components/FixedSidebar";
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import ActionButton from "../../../general-components/ActionButton";
import constants from "../../../../json/constants.json";
import responseUtils from "../../../../utils/responseUtils";

import {
  MdCloseFullscreen,
  MdOpenInFull,
  MdOutlineEditNote,
  MdOutlineFilterAlt,
} from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";
import Spinner from "../../../general-components/Spinner";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";
import AddJobModal from "../../../Modals/AddJobModal";
import utils from "../../../../utils/helperUtils";
import ConformationPopup from "../../../general-components/ConfirmationPopup";
import FilterModal from "../../../Modals/FilterModal";
import EditJobModal from "../../../Modals/EditJobModal";
import helperUtils from "/src/utils/helperUtils";

const Jobs = () => {
  const navigate = useNavigate();
  const listInnerRef = useRef(null);
  const [cookies] = useCookies();
  const [isLoading, setIsLoading] = useState(true);
  const [iSFullscreenModalOpen, setISFullscreenModalOpen] = useState(false);
  const [searchQuary, setsearchQuary] = useState("");
  const [invokeJobs, setInvokeJobs] = useState(true);
  const [JobsData, setJobsData] = useState(null);
  const [totalJobs, setTotalJobs] = useState(null);
  const [skip, setSkip] = useState(0);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("0-10");
  const [filterType, setFilterType] = useState("");
  const [filteredJobsData, setFilteredJobsData] = useState([]);

  const [toggleId, setToggleId] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(null);
  const [innerRef, setInnerRef] = useState(null);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [maxDistReached, setMaxDistReached] = useState(false);

  const [confirmPopup, setConfirmPopup] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const [isFetchLoading, setIsFetchLoading] = useState(true);

  const [isAddJobModalOpen, setisAddJobModalOpen] = useState(false);
  const [isJobEditModalOpen, setIsJobEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  //items for page
  const itemsPerPage = parseInt(selectedItemsPerPage.split("-")[1]);

  // Check bottom Scroll reached
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll = () => {
    if (innerRef) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if (isNearBottom && !isDataFetching && !maxDistReached) {
        setSkip(skip + 10);
        setInvokeJobs(true);
      }
    } else {
      console.error("on bottom scroll error");
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

  //change the Job status
  const changeStatusJob = async () => {
    let params = {
      id: toggleId,
      status: toggleStatus,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changeStatusJob,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      setInvokeJobs(true);
      setActionStatus("");
      setToggleId(null);
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong while changing Theme status");
    }
  };

  const archiveJob = async () => {
    let params = {
      id: toggleId,
    };
    console.log(toggleId);
    let response = await invokeApi(
      config.baseUrl + apiList.deleteJob,
      params,
      cookies
    );
    responseUtils.showToster(response);
    if (response.customcode === 200) {
      setInvokeJobs(true);
      setToggleId(null);
      setActionStatus("");
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong while deleting Job");
    }
  };

  const confirmStatusHandler = (confirmStatus) => {
    if (confirmStatus) {
      actionStatus === "toggleStatus" ? changeStatusJob() : archiveJob();
    }
    return null;
  };

  useEffect(() => {
    const getJobList = async () => {
      let params = {
        skip: skip,
        limit: itemsPerPage,
        search: searchQuary,
      };
      const response = await invokeApi(
        config.baseUrl + apiList.getJobList,
        params,
        cookies
      );
      console.log(response.data);
      if (response.customcode === 200) {
        setJobsData(response.data);
        setTotalJobs(response.total);
        if (response.data.length < itemsPerPage) {
          setMaxDistReached(true);
        } else {
          setMaxDistReached(false);
        }
        if (skip > 0) {
          setJobsData([...JobsData, ...response.data]);
          setIsFetchLoading(false);
        } else {
          setJobsData(response.data);
        }
        setTotalJobs(response.total);
        setIsLoading(false);
        setIsDataFetching(false);
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wrong while fetching getJobList");
      }
    };
    if (invokeJobs) {
      setInvokeJobs(false);
      setIsFetchLoading(false);
      getJobList();
    }
  }, [cookies, invokeJobs, navigate, skip, itemsPerPage]);

  const onCloseAddJobModal = () => {
    setisAddJobModalOpen(false);
  };
  const onCloseEditJobModal = () => {
    setIsJobEditModalOpen(false);
  };

  // fitering data based on filtertype
  useEffect(() => {
    const filteredData = filteredJobFunc(JobsData, filterType);
    setFilteredJobsData(filteredData);
  }, [JobsData]);

  const filteredJobFunc = (data, filterType) => {
    if (!filterType || filterType === "all") {
      return data;
    }
    return data.filter((job) => job.status === filterType);
  };

  const handleSearchQueary = (e) => {
    setsearchQuary(e.target.value);
    setIsLoading(true);
    setInvokeJobs(true);
  };

  return (
    <>
      <FixedSidebar />
      <div className="section">
        <div className="m-10 flex flex-col space-y-8">
          <BreadCrumbs nav1={"Jobs"} nav2={"All Jobs"} />
          <div>
            <h1 className="text-[#242424] dark:text-white text-3xl font-bold leading-normal tracking-normal">
              Jobs
            </h1>
          </div>
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[500px]">
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              <div className="flex flex-row items-center space-x-5">
                <img
                  src="/assets/png/icons-game.png"
                  alt=""
                  className="w-10 h-10"
                />
                <h5 className=" font-semibold dark:text-white">Job list</h5>
                <p className="dark:text-gray-400">(Total Jobs:{totalJobs})</p>
              </div>
              {filteredJobsData?.some((el) => el.isChecked === true) > 0 && (
                <div className="flex gap-x-3">
                  <div
                    onClick={() => {
                      let tempData = [...filteredJobsData];
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
                      let tempData = [...filteredJobsData];
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
                      let tempData = [...filteredJobsData];
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
              {/**Right */}
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
                      setInvokeJobs(true);
                    }}
                  />
                  <IoMdAddCircleOutline
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => setisAddJobModalOpen(true)}
                  />
                </div>
                <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full ">
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
                {filteredJobsData?.length > 0 ? (
                  <div className="h-full overflow-y-auto " ref={listInnerRef}>
                    <table className="w-full text-sm text-left">
                      <thead className=" sticky top-0 z-10 border-b dark:text-white bg-[#242424] text-white">
                        <tr>
                          <th scope="col" className="text-center px-6 py-3">
                            <input
                              type="checkbox"
                              checked={filteredJobsData?.every(
                                (check) => check.isChecked
                              )}
                              onChange={() => {
                                let tempData = [...filteredJobsData];
                                let allChecked = tempData.every(
                                  (el) => el.isChecked
                                );
                                if (allChecked) {
                                  tempData.map((el) => (el.isChecked = false));
                                } else {
                                  tempData.map((el) => (el.isChecked = true));
                                }
                                setJobsData(tempData);
                              }}
                            />
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            SL.No
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Title
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            JobType
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            CreatedAt
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredJobsData?.map((el, index) => {
                          return (
                            <tr
                              className=" font-medium text-[#707070]"
                              key={index}
                            >
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                <input
                                  type="checkbox"
                                  checked={el?.isChecked ? true : false}
                                  onChange={() => {
                                    let tempData = [...filteredJobsData];
                                    tempData[index].isChecked =
                                      !tempData[index].isChecked;
                                    setJobsData(tempData);
                                  }}
                                />
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {index + 1}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.title}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.jobType}
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
                                {utils.getDateFormat(
                                  el.createdAt,
                                  "dd/mm/yyyy"
                                )}
                              </td>
                              <td className="text-right px-6 py-4 text-[#707070] dark:text-white">
                                <div className="flex flex-row space-x-3 items-center justify-center">
                                  <RxEyeOpen
                                    size={25}
                                    className="hover:dark:text-blue-400 hover:text-blue-400 cursor-pointer"
                                    onClick={() => {
                                      navigate(
                                        constants.PATH.NAVIGATEJOBVIEW,
                                        {
                                          state: el._id,
                                        }
                                      );
                                    }}
                                  />
                                  <MdOutlineEditNote
                                    onClick={() => {
                                      setIsJobEditModalOpen(true);
                                      setEditId(el._id);
                                      console.log(editId);
                                    }}
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
            <div className="flex flex-col space-y-5 card card-shadow w-full h-full">
              {/**table header */}
              <div className="flex flex-row items-center justify-between px-7 pt-5">
                {/**left */}
                <div className="flex flex-row items-center space-x-5">
                  <img
                    src="/assets/png/icons-game.png"
                    alt=""
                    className="w-10 h-10"
                  />
                  <h5 className=" font-semibold dark:text-white">Job list</h5>
                  <p className="dark:text-gray-400">
                    (Total Jobs: {totalJobs})
                  </p>
                </div>
                {/**Action Buttons */}
                {filteredJobsData?.some((el) => el.isChecked === true) > 0 && (
                  <div className="flex gap-x-3">
                    <div
                      onClick={() => {
                        let tempData = [...filteredJobsData];
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
                        let tempData = [...filteredJobsData];
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
                  </div>
                )}
                {/**Right */}
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
                        setInvokeJobs(true);
                      }}
                    />
                  </div>
                  {/**search input */}
                  <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full ">
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
              {/**Loader */}
              {isLoading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  {filteredJobsData?.length > 0 ? (
                    <div className="h-full overflow-y-auto " ref={listInnerRef}>
                      <table className="w-full text-sm text-left">
                        <thead className=" sticky top-0 z-10 border-b dark:text-white bg-[#242424] text-white">
                          <tr>
                            <th scope="col" className="text-center px-6 py-3">
                              <input
                                type="checkbox"
                                checked={filteredJobsData?.every(
                                  (check) => check.isChecked
                                )}
                                onChange={() => {
                                  let tempData = [...filteredJobsData];
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
                                  setJobsData(tempData);
                                }}
                              />
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              SL.No
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Title
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              JobType
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Status
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              CreatedAt
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredJobsData?.map((el, index) => {
                            return (
                              <tr
                                className=" font-semibold text-[#707070]"
                                key={index}
                              >
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  <input
                                    type="checkbox"
                                    checked={el?.isChecked ? true : false}
                                    onChange={() => {
                                      let tempData = [...filteredJobsData];
                                      tempData[index].isChecked =
                                        !tempData[index].isChecked;
                                      setJobsData(tempData);
                                    }}
                                  />
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {index + 1}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {el.title}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {el.jobType}
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
                                  {helperUtils.getDateFormat(
                                    el.createdAt,
                                    "dd/mm/yyyy"
                                  )}
                                </td>

                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  <div className="flex flex-row space-x-3 items-center justify-center">
                                    <RxEyeOpen
                                      size={25}
                                      className="hover:dark:text-blue-400 hover:text-blue-400 cursor-pointer"
                                      onClick={() => {
                                        navigate(
                                          constants.PATH.NAVIGATEJOBVIEW,
                                          {
                                            state: el._id,
                                          }
                                        );
                                      }}
                                    />
                                    <MdOutlineEditNote
                                      onClick={() => {
                                        setIsJobEditModalOpen(true);
                                        setEditId(el._id);
                                        console.log(editId);
                                      }}
                                      size={30}
                                      className="hover:dark:text-green-400 hover:text-green-400 cursor-pointer"
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
              {/**table */}
            </div>
          </div>
        </div>
      )}

      {isAddJobModalOpen && (
        <AddJobModal open={isAddJobModalOpen} close={onCloseAddJobModal} />
      )}
      {isJobEditModalOpen && (
        <EditJobModal
          open={isJobEditModalOpen}
          close={onCloseEditJobModal}
          editId={editId}
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
      {openFilterModal && (
        <FilterModal
          setOpenFilterModal={setOpenFilterModal}
          filterType={filterType}
          setFilterType={setFilterType}
          setIsLoading={setIsLoading}
          setInvokeFunction={setInvokeJobs}
          selectedItemsPerPage={selectedItemsPerPage}
          setSelectedItemsPerPage={setSelectedItemsPerPage}
          data={JobsData}
        />
      )}
    </>
  );
};

export default Jobs;
