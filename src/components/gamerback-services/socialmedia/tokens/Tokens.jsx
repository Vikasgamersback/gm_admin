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

const Tokens = () => {
 
  const [profileDataTab, setProfileDataTab] = useState(0);

  const [tokensData] = useState(null);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("0-10");
 
  const [filterType, setFilterType] = useState("");
  const [, setFilterTokensData] = useState([]);

  const [iSFullscreenModalOpen, setISFullscreenModalOpen] = useState(false);
  const [, setOpenTokenModal] = useState(false);

  const [, setInvokeTokes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* const itemsPerPage = parseInt(selectedItemsPerPage.split("-")[1]); */

  // fitering data based on filtertype
  useEffect(() => {
    const filteredData = filterTokens(tokensData, filterType);
    setFilterTokensData(filteredData);
  }, [tokensData]);

  const filterTokens = (data, filterType) => {
    if (!filterType || filterType === "all") {
      return data; // if filtertype not selected it returns the actual data.
    }
    return data.filter((token) => token.status === filterType);
  };

  /* const onCloseAddTokenModel = () => {
    setOpenTokenModal(false);
  }; */

  return (
    <>
      <FixedSidebar />
      <div className="section overflow-y-auto">
        <div className="m-10 flex flex-col space-y-10">
          <div className=" flex flex-row items-center justify-between">
            <BreadCrumbs
              nav1={"Tokens"}
              // nav2={}
            />
          </div>
          <div>
            <h1 className=" dark:text-white text-3xl font-bold">Tokens</h1>
            <p className="dark:text-gray-400">
            Rise and shine! It&apos;s a brand new day full of possibilities.
            </p>
          </div>
          {/**Challenges Tab List */}
          <div className="flex flex-row items-center space-x-10 mt-5 ">
            <div className=" w-96 h-40 border-dashed border border-black dark:border-white rounded-lg px-10 py-10 space-y-1">
              <p className="text-[#242424] dark:text-white font-normal tracking-normal leading-normal text-sm">
                Total Tokens
              </p>
              <h2 className="text-[#242424] dark:text-white font-semibold tracking-normal leading-normal text-4xl">
                10000
              </h2>
            </div>
            <div className=" w-96 h-40 border-dashed border border-black dark:border-white rounded-lg  px-10 py-10 space-y-1">
              <p className="text-[#242424] dark:text-white font-normal tracking-normal leading-normal text-sm">
                Total Spent
              </p>
              <h2 className="text-[#242424] dark:text-white font-semibold tracking-normal leading-normal text-4xl">
                10000
              </h2>
            </div>
            <div className=" w-96 h-40 border-dashed border border-black dark:border-white rounded-lg  px-10 py-10 space-y-1">
              <p className="text-[#242424] dark:text-white font-normal tracking-normal leading-normal text-sm">
                Total Earned
              </p>
              <h2 className="text-[#242424] dark:text-white font-semibold tracking-normal leading-normal text-4xl">
                10000
              </h2>
            </div>
            <div className=" w-96 h-40 border-dashed border border-black dark:border-white rounded-lg  px-10 py-10 space-y-1">
              <p className="text-[#242424] dark:text-white font-normal tracking-normal leading-normal text-sm">
                Referral Tokens
              </p>
              <h2 className="text-[#242424] dark:text-white font-semibold tracking-normal leading-normal text-4xl">
                10000
              </h2>
            </div>
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
              Token Inventory
            </h5>
            <h5
              className={`${
                profileDataTab === 1
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(1)}
            >
              Token Transaction
            </h5>
            <h5
              className={`${
                profileDataTab === 2
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(2)}
            >
              Token earned
            </h5>
            <h5
              className={`${
                profileDataTab === 3
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(3)}
            >
              Token Purchases
            </h5>
            <h5
              className={`${
                profileDataTab === 4
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(4)}
            >
              Token from referral
            </h5>
            <h5
              className={`${
                profileDataTab === 5
                  ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                  : "pb-2 cursor-pointer dark:text-gray-400"
              }`}
              onClick={() => setProfileDataTab(5)}
            >
              Token refund
            </h5>
          </div>
          {/**Table */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[520px]">
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              {/**Left */}
              <div className="flex flex-row items-center space-x-5">
                <img src="/assets/png/icons-token.png" className="h-10 w-10" />
                <h5 className="font-semibold  dark:text-[#ffff]">
                  Token Transaction
                </h5>
                <p className="dark:text-gray-400">
                  ( Tokens Distributed: 20 Lakhs )
                </p>
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
                    onClick={() => setOpenTokenModal(true)}
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
                          Sl.No
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Transaction ID
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Username
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Earned medium
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Tnx date
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Tnx amt
                        </th>
                        <th scope="col" className="text-center px-2 py-3">
                          Action
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
                          tkn000021x22
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          akgsays
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          Referral
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          25th May 2024 10:23 AM
                        </td>
                        <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                          1000
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
            <div className="flex flex-col space-y-5 card card-shadow w-full h-full">
              <div className="flex flex-row items-center justify-between px-7 pt-5">
                {/**Left */}
                <div className="flex flex-row items-center space-x-5">
                  <img
                    src="/assets/png/icons-token.png"
                    className="h-10 w-10"
                  />
                  <h5 className="font-semibold  dark:text-[#ffff]">
                    Token Transaction
                  </h5>
                  <p className="dark:text-gray-400">
                    ( Tokens Distributed: 20 Lakhs )
                  </p>
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
                      onClick={() => setOpenTokenModal(true)}
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
                            Sl.No
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Transaction ID
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Username
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Earned medium
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Tnx date
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Tnx amt
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            Action
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
                            tkn000021x22
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            akgsays
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            Referral
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            25th May 2024 10:23 AM
                          </td>
                          <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                            1000
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
          setInvokeFunction={setInvokeTokes}
          selectedItemsPerPage={selectedItemsPerPage}
          setSelectedItemsPerPage={setSelectedItemsPerPage}
          data={tokensData}
        />
      )}
    </>
  );
};

export default Tokens;
