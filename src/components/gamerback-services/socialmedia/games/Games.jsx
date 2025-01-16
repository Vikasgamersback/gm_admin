import  { useRef, useState } from "react";
import FixedSidebar from "../../../general-components/FixedSidebar";
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import ActionButton from "../../../general-components/ActionButton";
import constants from "../../../../json/constants.json";
import {
  MdOpenInFull,
  MdOutlineEditNote,
  MdOutlineFilterAlt,
} from "react-icons/md";
import { IoIosSearch, IoMdAddCircleOutline } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import AddInGameModel from "../../../Modals/AddInGameModel";

const Games = () => {
  const listInnerRef = useRef(null);
  const [openAddInGameModel, setOpenAddInGameModel] = useState(false);
  const [checked,setChecked] = useState(false)
  const [gameTabList,setGameTabList] = useState(0)
  const onCloseAddGameModal = () => {
    setOpenAddInGameModel(false);
  };
  return (
    <>
      <FixedSidebar />
      <div className="section">
        <div className="m-10 flex flex-col space-y-8">
          <BreadCrumbs nav1={"Games"} nav2={`${
							gameTabList === 0
								? "Live Games"
								: gameTabList === 1
									? "unpublished Games"
											: ""
						}`} />
          <div>
            <h1 className="text-[#242424] dark:text-white text-3xl font-bold leading-normal tracking-normal">
              Games
            </h1>
            <div className="text-lg text-[#949495]">
							Rise and shine! It's a brand new day full of
							possibilities.
						</div>
          </div>

          {/* Menu */}
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
							Live Games
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
							Unpublished Games
						</h5>
						
					</div>

          <div className="flex flex-col space-y-5 card card-shadow w-full h-[500px]">
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              <div className="flex flex-row items-center space-x-5">
                <img
                  src="/assets/png/icons-theme.png"
                  alt=""
                  className="w-10 h-10"
                />
                <h5 className=" font-semibold dark:text-white">Games</h5>
                <p className="dark:text-gray-400">(Total Games: {})</p>
              </div>
              { checked && 
                <div className="flex gap-x-3 flex-row">
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
              }
              <div className="flex flex-row items-center space-x-7">
                <div className="flex flex-row space-x-5 items-center">
                  <MdOutlineFilterAlt
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                  />
                  <BiRefresh
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                  />
                  <IoMdAddCircleOutline
                    size={30}
                    onClick={() => setOpenAddInGameModel(true)}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                  />
                </div>
                {/**search input */}
                <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full ">
                  <IoIosSearch
                    size={30}
                    className="dark:text-white"
                  />
                  <input
                    className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                    placeholder="Search..."
                  />
                </div>
                <MdOpenInFull
                  size={30}
                  className="dark:text-white cursor-pointer hover:dark:text-blue-400 hover:text-blue-400"
                />
              </div>
            </div>
            {/**
         {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Spinner />
              </div>
        */}
            <div className="h-full overflow-y-auto " ref={listInnerRef}>
              <table className="w-full text-sm text-left">
                <thead className=" sticky top-0 z-10 border-b dark:text-white bg-[#242424] text-white">
                  <tr>
                    <th scope="col" className="text-center px-6 py-3">
                      <input type="checkbox" 
                      onChange={() => setChecked(!checked)}/>
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      SL.No
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Game Name
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Developer Name
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Ratings
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Played
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Tags
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Activity
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" font-medium text-[#707070]">
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <input type="checkbox" 
                      onChange={() => setChecked(!checked)}/>
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      Sl.no
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      GameName
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      Developer name
                    </td>
                    <td className="text-center px-6 py-4  text-[#707070] dark:text-white">
                      Ratings
                    </td>

                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      Played
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      Tags
                    </td>

                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="bg-green-400 font-light  text-white px-1.5 py-1 rounded-lg">
                        Active
                      </div>
                    </td>
                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                      <div className="flex flex-row space-x-3 items-center justify-center">
                        <RxEyeOpen size={25} />
                        <MdOutlineEditNote
                          size={30}
                          className="hover:dark:text-green-400 hover:text-green-400 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddInGameModel open={openAddInGameModel} close={onCloseAddGameModal} />
    </>
  );
};

export default Games;
