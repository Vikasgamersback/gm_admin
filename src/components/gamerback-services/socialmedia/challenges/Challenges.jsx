import { useState, useEffect } from "react";

import FixedSidebar from "../../../general-components/FixedSidebar";
import BreadCrumbs from "../../../general-components/Breadcrumbs";

import constants from "../../../../json/constants.json";

import { RxEyeOpen } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import ActionButton from "../../../general-components/ActionButton";
import {
  MdCloseFullscreen,
  MdOpenInFull,
  MdOutlineFilterAlt,
} from "react-icons/md";
import FilterModal from "../../../Modals/FilterModal.jsx";
import Spinner from "../../../general-components/Spinner.jsx";
import AddChallengeModal from "../../../Modals/AddChallengeModal.jsx";

const Challenges = () => {
    
  const [challengesTabList, setChallengesTabList] = useState(0);
  const [profileDataTab, setProfileDataTab] = useState(0);

  const [challengesData] = useState(null);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("0-10");
 
  const [filterType, setFilterType] = useState("");
  const [, setFilteredChallengesData] = useState([]);

  const [openAddChallengeModal, setOpenAddChallengeModal] = useState(false);
  const [iSFullscreenModalOpen, setISFullscreenModalOpen] = useState(false);
  const [, setInvokeChallenges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* const itemsPerPage = parseInt(selectedItemsPerPage.split("-")[1]); */

  // fitering data based on filtertype
  useEffect(() => {
    const filteredData = filteredChallenges(challengesData, filterType);
    setFilteredChallengesData(filteredData);
  }, [challengesData]);

  const filteredChallenges = (data, filterType) => {
    if (!filterType || filterType === "all") {
      return data; // if filtertype not selected it returns the actual data.
    }
    return data.filter((challenge) => challenge.status === filterType);
  };

  const onCloseAddChallengeModal = () => {
    setOpenAddChallengeModal(false);
  };

  return (
    <>
      <FixedSidebar />
      <div className="section overflow-y-auto">
        <div className="m-10 flex flex-col space-y-10">
          <div className=" flex flex-row items-center justify-between">
            <BreadCrumbs
              nav1={"Challenges"}
              // nav2={}
            />
          </div>
          <div>
            <h1 className=" dark:text-white text-3xl font-bold">Challenges</h1>
          </div>
          {/**Challenges Tab List */}
          <div className="flex flex-row items-center space-x-20 mt-5">
            <h5
              className={`${
                challengesTabList === 0
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl font-bold dark:px-3 dark:py-2 dark:bg-white dark:text-black "
                  : "text-[#949495] cursor-pointer font-semibold"
              }`}
              onClick={() => {
                setChallengesTabList(0);
              }}
            >
              Ongoing
            </h5>
            <h5
              className={`${
                challengesTabList === 1
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl font-bold dark:px-3 dark:py-2 dark:bg-white dark:text-black"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setChallengesTabList(1);
              }}
            >
              Upcoming
            </h5>
            <h5
              className={`${
                challengesTabList === 2
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl font-bold dark:px-3 dark:py-2 dark:bg-white dark:text-black"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setChallengesTabList(2);
              }}
            >
              Completed
            </h5>
          </div>
          {/**Tabs */}
          <div
            id="slider"
            className="flex space-x-9 px-5 w-full overflow-x-scroll scroll-smooth  mt-7"
          >
            <h5
              className={`${
                profileDataTab === 0
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(0)}
            >
              Daily Challenges
            </h5>
            <h5
              className={`${
                profileDataTab === 1
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(1)}
            >
              Weekly Challenges
            </h5>
            <h5
              className={`${
                profileDataTab === 2
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(2)}
            >
              Monthly Challenges
            </h5>
            <h5
              className={`${
                profileDataTab === 3
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(3)}
            >
              Sponsored
            </h5>
            <h5
              className={`${
                profileDataTab === 4
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(4)}
            >
              Platform
            </h5>
          </div>
          {/**Table */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[520px]">
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              {/**Left */}
              <div className="flex flex-row items-center space-x-5">
                <img
                  src="/assets/png/icons-challenge.png"
                  className="h-10 w-10"
                />
                <h5 className="font-semibold  dark:text-[#ffff]">Challenges</h5>
                <p className="dark:text-gray-400">Total Challenges</p>
              </div>
              {/*Action Buttons */}
              <div className="flex gap-x-3">
                <div>
                  <ActionButton
                    text={constants.ACTIVE}
                    color={constants.GREEN}
                  />
                </div>
                <div>
                  <ActionButton
                    text={constants.INACTIVE}
                    color={constants.BLUE}
                  />
                </div>
                <div>
                  <ActionButton text={constants.DELETE} color={constants.RED} />
                </div>
              </div>
              {/**Right */}
              <div className="flex flex-row items-center space-x-7">
                <div className="flex flex-row space-x-5 items-center">
                  <MdOutlineFilterAlt
                    size={30}
                    onClick={() => setOpenFilterModal(true)}
                    className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                  />
                  <BiRefresh
                    title="Refresh"
                    size={30}
                    className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                    onClick={() => {
                      setIsLoading(true);
                    }}
                  />
                  <IoMdAddCircleOutline
                    title="Add"
                    size={30}
                    className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                    onClick={() => setOpenAddChallengeModal(true)}
                  />
                </div>
                <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full">
                  <IoSearchOutline size={30} className="dark:text-white" />
                  <input
                    className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                    placeholder="Search..."
                  />
                </div>
                <MdOpenInFull
                  size={30}
                  className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
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
                {/**Tables */}
                <div className="h-full overflow-y-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                      <tr>
                        <th scope="col" className="text-center px-2 py-3">
                          <input type="checkbox" />
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          No
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Game
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Name
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Description
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Coins
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Progress
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Cliamed
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="font-semibold text-[#707070]">
                        <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                          <input type="checkbox" />
                        </td>
                        <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                          No
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          Gamename
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          Name
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          Description
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          Coins
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          Progress
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          Claimed
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          <RxEyeOpen
                            size={25}
                            className="text-black dark:text-white cursor-pointer"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {iSFullscreenModalOpen && (
        <div className="fixed z-10 inset-0 bg-opacity-60 bg-black flex justify-center items-center">
          <div className="flex flex-col w-full h-full dark:border-white dark:bg-[#393939] bg-white text-black">
            {/**Table */}
            <div className="flex flex-col space-y-5 card card-shadow w-full  h-full">
              <div className="flex flex-row items-center justify-between px-7 pt-5">
                {/**Left */}
                <div className="flex flex-row items-center space-x-5">
                  <img
                    src="/assets/png/icons-challenge.png"
                    className="h-10 w-10"
                  />
                  <h5 className="font-semibold  dark:text-[#ffff]">
                    Challenges
                  </h5>
                  <p className="dark:text-gray-400">Total Challenges</p>
                </div>
                {/*Action Buttons */}
                <div className="flex gap-x-3">
                  <div>
                    <ActionButton
                      text={constants.ACTIVE}
                      color={constants.GREEN}
                    />
                  </div>
                  <div>
                    <ActionButton
                      text={constants.INACTIVE}
                      color={constants.BLUE}
                    />
                  </div>
                  <div>
                    <ActionButton
                      text={constants.DELETE}
                      color={constants.RED}
                    />
                  </div>
                </div>
                {/**Right */}
                <div className="flex flex-row items-center space-x-7">
                  <div className="flex flex-row space-x-5 items-center">
                    <MdOutlineFilterAlt
                      size={30}
                      onClick={() => setOpenFilterModal(true)}
                      className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                    />
                    <BiRefresh
                      title="Refresh"
                      size={30}
                      className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                      onClick={() => {
                        setIsLoading(true);
                      }}
                    />
                    <IoMdAddCircleOutline
                      title="Add"
                      size={30}
                      className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
                      onClick={() => setOpenAddChallengeModal(true)}
                    />
                  </div>
                  <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full">
                    <IoSearchOutline size={30} className="dark:text-white" />
                    <input
                      className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                      placeholder="Search..."
                    />
                  </div>
                  <MdCloseFullscreen
                    size={30}
                    className="text-black dark:text-white cursor-pointer hover:dark:text-blue-600 hover:text-blue-600"
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
                  {/**Tables */}
                  <div className="h-full overflow-y-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                        <tr>
                          <th scope="col" className="text-center px-2 py-3">
                            <input type="checkbox" />
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            No
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Game
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Name
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Description
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Coins
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Progress
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Cliamed
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="font-semibold text-[#707070]">
                          <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                            <input type="checkbox" />
                          </td>
                          <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                            No
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            Gamename
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            Name
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            Description
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            Coins
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            Progress
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            Claimed
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            <RxEyeOpen
                              size={25}
                              className="text-black dark:text-white cursor-pointer"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
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
          setInvokeFunction={setInvokeChallenges}
          selectedItemsPerPage={selectedItemsPerPage}
          setSelectedItemsPerPage={setSelectedItemsPerPage}
          data={challengesData}
        />
      )}
      <AddChallengeModal
        open={openAddChallengeModal}
        close={onCloseAddChallengeModal}
      />
    </>
  );
};

export default Challenges;
