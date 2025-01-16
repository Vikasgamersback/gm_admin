import { useEffect, useRef, useState } from "react";
import FixedSidebar from "../../../general-components/FixedSidebar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";
import Spinner from "../../../general-components/Spinner";
import { RxEyeOpen } from "react-icons/rx";
import {
  MdCloseFullscreen,
  MdOpenInFull,
  MdOutlineEditNote,
  MdOutlineFilterAlt,
} from "react-icons/md";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import ActionButton from "../../../general-components/ActionButton";
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import constants from "../../../../json/constants.json";
import helperUtils from "../../../../utils/helperUtils";
import FilterModal from "../../../Modals/FilterModal";
import ConformationPopup from "../../../general-components/ConfirmationPopup";
import responseUtils from "../../../../utils/responseUtils";
import AddThemeModal from "../../../Modals/AddThemeModal";
import EditThemeModal from "../../../Modals/EditThemeModal";

const Themes = () => {
  const navigate = useNavigate();
  const listInnerRef = useRef(null);
  const [cookies] = useCookies();

  const [invokeThemes, setInvokeThemes] = useState(true);
  const [themesData, setThemesData] = useState(null);
  const [totalThemes, setTotalThemes] = useState(null);
  const [skip, setSkip] = useState(0);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("0-10");
  const [searchQuary, setsearchQuary] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredThemeData, setFilteredThemeData] = useState([]);

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

  const [isAddThemeModalOpen, setisAddThemeModalOpen] = useState(false);
  const [isThemeEditModalOpen, setIsThemeEditModalOpen] = useState(false);
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
        setInvokeThemes(true);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsDataFetching(true);
        const params = {};
        const response = await invokeApi(
          config.baseUrl + apiList.getThemesList,
          params,
          cookies
        );

        if (response.customcode === 200) {
          setThemesData((prevData) =>
            skip > 0 ? [...prevData, ...response.data] : response.data
          );
          setTotalThemes(response.total);

          if (response.data.length < itemsPerPage) {
            setMaxDistReached(true);
          } else {
            setMaxDistReached(false);
          }

          setIsLoading(false);
        } else if (response.customcode === 201) {
          navigate("/logout");
        } else {
          alert("Something went wrong while fetching themes.");
        }
      } catch (error) {
        console.error("Error fetching themes:", error);
        alert("Something went wrong while fetching themes.");
      } finally {
        setIsDataFetching(false);
        setIsFetchLoading(false);
      }
    };

    if (invokeThemes) {
      setInvokeThemes(false);
      fetchData();
    }
  }, [cookies, invokeThemes, navigate, skip, itemsPerPage]);

  const handleSearchQueary = (e) => {
    setsearchQuary(e.target.value);
    setIsLoading(true);
    setInvokeThemes(true);
  };

  //change the game status
  const changeStatusTheme = async () => {
    console.log(toggleId, "toggleID");
    let params = {
      id: toggleId,
      status: toggleStatus,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changeStatusTheme,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      setInvokeThemes(true);
      setActionStatus("");
      setToggleId(null);
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong while changing Theme status");
    }
  };

  const archiveTheme = async () => {
    let params = {
      id: toggleId,
    };
    console.log(toggleId);
    let response = await invokeApi(
      config.baseUrl + apiList.deleteTheme,
      params,
      cookies
    );
    responseUtils.showToster(response);
    if (response.customcode === 200) {
      setInvokeThemes(true);
      setToggleId(null);
      setActionStatus("");
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong while deleting Theme");
    }
  };

  const confirmStatusHandler = (confirmStatus) => {
    if (confirmStatus) {
      actionStatus === "toggleStatus" ? changeStatusTheme() : archiveTheme();
    }
    return null;
  };

  // fitering data based on filtertype
  useEffect(() => {
    const filteredData = filteredThemes(themesData, filterType);
    setFilteredThemeData(filteredData);
  }, [themesData]);

  const filteredThemes = (data, filterType) => {
    if (!filterType || filterType === "all") {
      return data; // if filtertype not selected it returns the actual data.
    }
    return data.filter((theme) => theme.status === filterType);
  };

  const onCloseAddThemeModal = () => {
    setisAddThemeModalOpen(false);
    setInvokeThemes(true);
  };
  const onCloseEditTheme = () => {
    setIsThemeEditModalOpen(false);
  };
  return (
    <>
      <FixedSidebar />
      <div className="section">
        <div className="m-10 flex flex-col space-y-8">
          <BreadCrumbs nav1="Themes" nav2="All Themes" />
          <div>
            <h1 className="text-[#242424] dark:text-white text-3xl font-bold leading-normal tracking-normal">
              Themes
            </h1>
          </div>
          {/**Game table starts */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[500px]">
            {/**table header */}
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              {/**left */}
              <div className="flex flex-row items-center space-x-5">
                <img
                  src="/assets/png/icons-theme.png"
                  alt=""
                  className="w-10 h-10"
                />
                <h5 className=" font-semibold dark:text-white">Themes</h5>
                <p className="dark:text-gray-400">
                  (Total Themes: {totalThemes})
                </p>
              </div>
              {/**Action Buttons */}
              {filteredThemeData?.some((el) => el.isChecked === true) > 0 && (
                <div className="flex gap-x-3 flex-row">
                  <div
                    onClick={() => {
                      let tempData = [...filteredThemeData];
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
                      let tempData = [...filteredThemeData];
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
                      let tempData = [...filteredThemeData];
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
                      setInvokeThemes(true);
                    }}
                  />
                  <IoMdAddCircleOutline
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => {
                      setisAddThemeModalOpen(true);
                    }}
                  />
                </div>
                {/**search input */}
                <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full ">
                  <IoSearchCircleOutline
                    size={30}
                    className="dark:text-white"
                  />
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
            {/**Loader */}
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {filteredThemeData?.length > 0 ? (
                  <div className="h-full overflow-y-auto " ref={listInnerRef}>
                    <table className="w-full text-sm text-left">
                      <thead className=" sticky top-0 z-10 border-b dark:text-white bg-[#242424] text-white">
                        <tr>
                          <th scope="col" className="text-center px-6 py-3">
                            <input
                              type="checkbox"
                              checked={filteredThemeData?.every(
                                (check) => check.isChecked
                              )}
                              onChange={() => {
                                let tempData = [...filteredThemeData];
                                let allChecked = tempData.every(
                                  (el) => el.isChecked
                                );
                                if (allChecked) {
                                  tempData.map((el) => (el.isChecked = false));
                                } else {
                                  tempData.map((el) => (el.isChecked = true));
                                }
                                setThemesData(tempData);
                              }}
                            />
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            SL.No
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Type
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Background
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Created At
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            status
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredThemeData?.map((el, index) => {
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
                                    let tempData = [...filteredThemeData];
                                    tempData[index].isChecked =
                                      !tempData[index].isChecked;
                                    setThemesData(tempData);
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
                                {el.type}
                              </td>
                              <td className="text-center px-6 py-4 flex items-center justify-center text-[#707070] dark:text-white">
                                <img
                                  src={el.url}
                                  className="w-24 h-14 rounded"
                                />
                              </td>

                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {helperUtils.getDateFormat(
                                  el.createdAt,
                                  "dd/mm/yyyy"
                                )}
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
                                <div className="flex flex-row space-x-3 items-center justify-center">
                                  <RxEyeOpen
                                    size={25}
                                    className="hover:dark:text-blue-400 hover:text-blue-400 cursor-pointer"
                                    onClick={() => {
                                      navigate(
                                        constants.PATH.NAVIGATETHEMEVIEW,
                                        {
                                          state: el._id,
                                        }
                                      );
                                    }}
                                  />
                                  <MdOutlineEditNote
                                    onClick={() => {
                                      setIsThemeEditModalOpen(true);
                                      setEditId(el._id);
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

      {iSFullscreenModalOpen && (
        <div className="fixed z-10 inset-0 bg-opacity-60 bg-black flex justify-center items-center">
          <div className="flex flex-col w-full h-full dark:border-white dark:bg-[#393939] bg-white text-black">
            {/**Game table starts */}
            <div className="flex flex-col space-y-5 card card-shadow w-full h-full">
              {/**table header */}
              <div className="flex flex-row items-center justify-between px-7 pt-5">
                {/**left */}
                <div className="flex flex-row items-center space-x-5">
                  <img
                    src="/assets/png/icons-theme.png"
                    alt=""
                    className="w-10 h-10"
                  />
                  <h5 className=" font-semibold dark:text-white">Themes</h5>
                  <p className="dark:text-gray-400">
                    (Total Themes: {totalThemes})
                  </p>
                </div>
                {/**Action Buttons */}
                {filteredThemeData?.some((el) => el.isChecked === true) > 0 && (
                  <div className="flex gap-x-3 flex-row">
                    <div
                      onClick={() => {
                        let tempData = [...filteredThemeData];
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
                        let tempData = [...filteredThemeData];
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
                        let tempData = [...filteredThemeData];
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
                        setInvokeThemes(true);
                      }}
                    />
                    <IoMdAddCircleOutline
                      size={30}
                      className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                      onClick={() => {
                        setisAddThemeModalOpen(true);
                      }}
                    />
                  </div>
                  {/**search input */}
                  <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full ">
                    <IoSearchCircleOutline
                      size={30}
                      className="dark:text-white"
                    />
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
                  {filteredThemeData?.length > 0 ? (
                    <div className="h-full overflow-y-auto " ref={listInnerRef}>
                      <table className="w-full text-sm text-left">
                        <thead className=" sticky top-0 z-10 border-b dark:text-white bg-[#242424] text-white">
                          <tr>
                            <th scope="col" className="text-center px-6 py-3">
                              <input
                                type="checkbox"
                                checked={filteredThemeData?.every(
                                  (check) => check.isChecked
                                )}
                                onChange={() => {
                                  let tempData = [...filteredThemeData];
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
                                  setThemesData(tempData);
                                }}
                              />
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              SL.No
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Type
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Background
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Created At
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              status
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredThemeData?.map((el, index) => {
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
                                      let tempData = [...filteredThemeData];
                                      tempData[index].isChecked =
                                        !tempData[index].isChecked;
                                      setThemesData(tempData);
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
                                  {el.type}
                                </td>
                                <td className="text-center px-6 py-4 flex items-center justify-center text-[#707070] dark:text-white">
                                  <img
                                    src={el.url}
                                    className="w-24 h-14 rounded"
                                  />
                                </td>

                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {helperUtils.getDateFormat(
                                    el.createdAt,
                                    "dd/mm/yyyy"
                                  )}
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
                                  <div className="flex flex-row space-x-3 items-center justify-center">
                                    <RxEyeOpen
                                      size={25}
                                      className="hover:dark:text-blue-400 hover:text-blue-400 cursor-pointer"
                                      onClick={() => {
                                        navigate(
                                          constants.PATH.NAVIGATETHEMEVIEW,
                                          {
                                            state: el._id,
                                          }
                                        );
                                      }}
                                    />
                                    <MdOutlineEditNote
                                      onClick={() => {
                                        setIsThemeEditModalOpen(true);
                                        setEditId(el._id);
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

      {openFilterModal && (
        <FilterModal
          setOpenFilterModal={setOpenFilterModal}
          filterType={filterType}
          setFilterType={setFilterType}
          setIsLoading={setIsLoading}
          setInvokeFunction={setInvokeThemes}
          selectedItemsPerPage={selectedItemsPerPage}
          setSelectedItemsPerPage={setSelectedItemsPerPage}
          data={themesData}
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
      <AddThemeModal open={isAddThemeModalOpen} close={onCloseAddThemeModal} />

      {isThemeEditModalOpen && (
        <EditThemeModal
          isThemeEditModalOpen={isThemeEditModalOpen}
          close={onCloseEditTheme}
          editId={editId}
        />
      )}
    </>
  );
};

export default Themes;
