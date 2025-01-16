import { useState, useEffect, useRef } from "react";
import FixedSidebar from "../../../general-components/FixedSidebar";
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import ActionButton from "../../../general-components/ActionButton";
import constants from "../../../../json/constants.json";
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
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";
import Spinner from "../../../general-components/Spinner";
import helperUtils from "../../../../utils/helperUtils";
import ConformationPopup from "../../../general-components/ConfirmationPopup";
import responseUtils from "../../../../utils/responseUtils";
import FilterModal from "../../../Modals/FilterModal";
import AddGameModal from "../../../Modals/AddGameModal";
import EditGameModal from "../../../Modals/EditGameModal";

const Gamepedias = () => {
  const navigate = useNavigate();
  const listInnerRef = useRef(null);

  const [cookies] = useCookies();

  const [invokeGames, setInvokeGames] = useState(true);
  const [gamesData, setGamesData] = useState(null);
  const [totalGames, setTotalGames] = useState(null);
  const [skip, setSkip] = useState(0);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("0-10");
  const [searchQuary, setsearchQuary] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredGameData, setFilteredGameData] = useState([]);

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

  const [isAddGameModalOpen, setisAddGameModalOpen] = useState(false);
  const [isGameEditModalOpen, setIsGameEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [gameTabList,setGameTabList] = useState(0)
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
        setInvokeGames(true);
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
    const getGamepediaList = async () => {
      setIsDataFetching(true);
      let params = {
        skip: skip,
        limit: itemsPerPage,
        search: searchQuary,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getGamepediaList,
        params,
        cookies
      );
      console.log(response.data)
      if (response.customcode === 200) {
        setGamesData(response.data);
        setTotalGames(response.total);
        if (response.data.length < itemsPerPage) {
          setMaxDistReached(true);
        } else {
          setMaxDistReached(false);
        }
        if (skip > 0) {
          setGamesData([...gamesData, ...response.data]);
          setIsFetchLoading(false);
        } else {
          setGamesData(response.data);
        }
        setTotalGames(response.total);
        setIsLoading(false);
        setIsDataFetching(false);
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wrong while fetching getGamepediaList");
      }
    };
    if (invokeGames) {
      setInvokeGames(false);
      setIsFetchLoading(false);
      getGamepediaList();
    }
  }, [cookies, invokeGames, navigate, skip, itemsPerPage]);

  const handleSearchQueary = (e) => {
    setsearchQuary(e.target.value);
    setIsLoading(true);
    setInvokeGames(true);
  };

  //change the game status
  const changeStatusGamepedia = async () => {
    console.log(toggleId, "toggleID");
    let params = {
      id: toggleId,
      status: toggleStatus,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changeStatusGamepedia,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      setInvokeGames(true);
      setActionStatus("");
      setToggleId(null);
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong while changing game status");
    }
  };

  const confirmStatusHandler = (confirmStatus) => {
    if (confirmStatus) {
      if (actionStatus === "toggleStatus") changeStatusGamepedia();
      setInvokeGames(true);
    }
    return null;
  };

  // fitering data based on filtertype
  useEffect(() => {
    const filteredData = filteredGames(gamesData, filterType);
    setFilteredGameData(filteredData);
  }, [gamesData]);

  const filteredGames = (data, filterType) => {
    if (!filterType || filterType === "all") {
      return data; // if filtertype not selected it returns the actual data.
    }
    return data.filter((game) => game.status === filterType);
  };

  const onCloseGameModal = () => {
    setisAddGameModalOpen(false);
    setInvokeGames(true);
  };
  const onCloseEditGame = () => {
    setIsGameEditModalOpen(false);
  };

  return (
    <>
      <FixedSidebar />
      <div className="section">
        <div className="flex flex-col m-10 space-y-8">
          <BreadCrumbs nav1="Gamepedia" nav2={`${
              gameTabList === 0
                ? "All Games"
                : gameTabList === 1
                ? "People"
                : gameTabList === 2
                ? "User"
                : ""
            }`} />
          <div>
            <h1 className="text-[#242424] dark:text-white text-3xl font-bold leading-normal tracking-normal">
              Gamepedia
            </h1>
          </div>
          {/* Gamepedia menu */}
          <div className="flex flex-row items-center space-x-20">
            <h5
              className={`${
                gameTabList === 0
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setGameTabList(0);
              }}
            >
              All Game
            </h5>
            <h5
              className={`${
                gameTabList === 1
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setGameTabList(1);
              }}
            >
              People
            </h5>
            <h5
              className={`${
                gameTabList === 2
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setGameTabList(2);
              }}
            >
              User
            </h5>
          </div>
          {/**Game table starts */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[500px]">
            {/**table header */}
            <div className="flex flex-row items-center justify-between pt-5 px-7">
              {/**left */}
              <div className="flex flex-row items-center space-x-5">
                <img
                  src="/assets/png/icons-game.png"
                  alt=""
                  className="w-10 h-10"
                />
                <h5 className="font-semibold dark:text-white">Game list</h5>
                <p className="dark:text-gray-400">
                  (Total Games: {totalGames})
                </p>
              </div>
              {/**Action Buttons */}
              {filteredGameData?.some((el) => el.isChecked === true) > 0 && (
                <div className="flex gap-x-3">
                  <div
                    onClick={() => {
                      let tempData = [...filteredGameData];
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
                      let tempData = [...filteredGameData];
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
                <div className="flex flex-row items-center space-x-5">
                  <MdOutlineFilterAlt
                    size={30}
                    className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => setOpenFilterModal(true)}
                  />
                  <BiRefresh
                    size={30}
                    className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => {
                      setIsLoading(true);
                      setInvokeGames(true);
                    }}
                  />
                  <IoMdAddCircleOutline
                    size={30}
                    className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => {
                      setisAddGameModalOpen(true);
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
                <MdOpenInFull
                  size={30}
                  className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                  onClick={() => setISFullscreenModalOpen(true)}
                />
              </div>
            </div>
            {/**Loader */}
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <Spinner />
              </div>
            ) : (
              <>
                {filteredGameData?.length > 0 ? (
                  <div className="h-full overflow-y-auto " ref={listInnerRef}>
                    <table className="w-full text-sm text-left">
                      <thead className=" sticky top-0 z-10 border-b dark:text-white bg-[#242424] text-white">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={filteredGameData?.every(
                                (check) => check.isChecked
                              )}
                              onChange={() => {
                                let tempData = [...filteredGameData];
                                let allChecked = tempData.every(
                                  (el) => el.isChecked
                                );
                                if (allChecked) {
                                  tempData.map((el) => (el.isChecked = false));
                                } else {
                                  tempData.map((el) => (el.isChecked = true));
                                }
                                setGamesData(tempData);
                              }}
                            />
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            SL.No
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            Game
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            publishers
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            developers
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            releseDate
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            status
                          </th>
                          <th scope="col" className="px-6 py-3 text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGameData?.map((el, index) => {
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
                                    let tempData = [...filteredGameData];
                                    tempData[index].isChecked =
                                      !tempData[index].isChecked;
                                    setGamesData(tempData);
                                  }}
                                />
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {index + 1}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.gameName}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.publishers}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.developers}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {helperUtils.getDateFormat(
                                  el.releseDate,
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
                                <div className="flex flex-row items-center justify-center space-x-3">
                                  <RxEyeOpen
                                    size={25}
                                    className="cursor-pointer hover:dark:text-blue-400 hover:text-blue-400"
                                    onClick={() => {
                                      navigate(
                                        constants.PATH.NAVIGATEGAMEPEDIAVIEW,
                                        {
                                          state: el._id,
                                        }
                                      );
                                    }}
                                  />
                                  <MdOutlineEditNote
                                    onClick={() => {
                                      setIsGameEditModalOpen(true);
                                      setEditId(el._id);
                                    }}
                                    size={30}
                                    className="cursor-pointer hover:dark:text-green-400 hover:text-green-400"
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {isFetchLoading ? (
                          <div className="flex items-center justify-center w-full h-full">
                            <Spinner />
                          </div>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="flex items-center justify-center w-full h-full font-semibold">
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
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60">
          <div className="flex flex-col w-full h-full dark:border-white dark:bg-[#393939] bg-white text-black">
            <div className="flex flex-col w-full h-full space-y-5 card card-shadow">
              {/**table header */}
              <div className="flex flex-row items-center justify-between pt-5 px-7">
                {/**left */}
                <div className="flex flex-row items-center space-x-5">
                  <img
                    src="/assets/png/icons-game.png"
                    alt=""
                    className="w-10 h-10"
                  />
                  <h5 className="font-semibold dark:text-white">Game list</h5>
                  <p className="dark:text-gray-400">
                    (Total Games: {totalGames})
                  </p>
                </div>
                {/**Action Buttons */}
                {filteredGameData?.some((el) => el.isChecked === true) > 0 && (
                  <div className="flex gap-x-3">
                    <div
                      onClick={() => {
                        let tempData = [...filteredGameData];
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
                        let tempData = [...filteredGameData];
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
                  <div className="flex flex-row items-center space-x-5">
                    <MdOutlineFilterAlt
                      size={30}
                      className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                      onClick={() => setOpenFilterModal(true)}
                    />
                    <BiRefresh
                      size={30}
                      className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                      onClick={() => {
                        setIsLoading(true);
                        setInvokeGames(true);
                      }}
                    />
                    <IoMdAddCircleOutline
                      size={30}
                      className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                      onClick={() => {
                        setisAddGameModalOpen(true);
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
                    className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => setISFullscreenModalOpen(false)}
                  />
                </div>
              </div>
              {/**Loader */}
              {isLoading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <Spinner />
                </div>
              ) : (
                <>
                  {filteredGameData?.length > 0 ? (
                    <div className="h-full overflow-y-auto " ref={listInnerRef}>
                      <table className="w-full text-sm text-left">
                        <thead className=" sticky top-0 z-10 border-b dark:text-white bg-[#242424] text-white">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={filteredGameData?.every(
                                  (check) => check.isChecked
                                )}
                                onChange={() => {
                                  let tempData = [...filteredGameData];
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
                                  setGamesData(tempData);
                                }}
                              />
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              SL.No
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Game
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              publishers
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              developers
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              releseDate
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredGameData?.map((el, index) => {
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
                                      let tempData = [...filteredGameData];
                                      tempData[index].isChecked =
                                        !tempData[index].isChecked;
                                      setGamesData(tempData);
                                    }}
                                  />
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {index + 1}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {el.gameName}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {el.publishers}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {el.developers}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {helperUtils.getDateFormat(
                                    el.releseDate,
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
                                  <div className="flex flex-row items-center justify-center space-x-3">
                                    <RxEyeOpen
                                      size={25}
                                      className="cursor-pointer hover:dark:text-blue-400 hover:text-blue-400"
                                      onClick={() => {
                                        navigate(
                                          constants.PATH.NAVIGATEGAMEPEDIAVIEW,
                                          {
                                            state: el._id,
                                          }
                                        );
                                      }}
                                    />
                                    <MdOutlineEditNote
                                      onClick={() => {
                                        setIsGameEditModalOpen(true);
                                        setEditId(el._id);
                                      }}
                                      size={30}
                                      className="cursor-pointer hover:dark:text-green-400 hover:text-green-400"
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                          {isFetchLoading ? (
                            <div className="flex items-center justify-center w-full h-full">
                              <Spinner />
                            </div>
                          ) : null}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="flex items-center justify-center w-full h-full font-semibold">
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

      <AddGameModal open={isAddGameModalOpen} close={onCloseGameModal} />
      {isGameEditModalOpen && (
        <EditGameModal
          isGameEditModalOpen={isGameEditModalOpen}
          close={onCloseEditGame}
          editId={editId}
        />
      )}

      {openFilterModal && (
        <FilterModal
          setOpenFilterModal={setOpenFilterModal}
          filterType={filterType}
          setFilterType={setFilterType}
          setIsLoading={setIsLoading}
          setInvokeFunction={setInvokeGames}
          selectedItemsPerPage={selectedItemsPerPage}
          setSelectedItemsPerPage={setSelectedItemsPerPage}
          data={gamesData}
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

export default Gamepedias;
