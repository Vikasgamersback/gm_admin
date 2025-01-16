// @import dependencies
import { MdCloseFullscreen, MdOutlineFilterAlt } from "react-icons/md";

import PropTypes from 'prop-types';

// @import Files

import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5";
import { BiRefresh, BiTrash } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";

const FullScreenModal = ({ open, close }) => {
  
  return (
    <>
      {open && (
        <div className="fixed z-10 inset-0 bg-opacity-60 bg-black flex justify-center items-center">
          <div className="flex flex-col w-full h-full dark:border-white bg-white text-black">
            {/* User Table cards */}
            <div className="flex flex-col space-y-5 card w-full h-full">
              {/* table header */}
              <div className="flex flex-row items-center justify-between px-7 pt-5">
                {/* left */}
                <div className="flex flex-row items-center space-x-5">
                  <img src="/assets/png/icons-spam.png" className="h-10 w-10" />
                  <h5 className="font-semibold dark:text-white">Reports</h5>
                  <p className=" dark:text-gray-400">(Total Reports: 20,000)</p>
                </div>
                {/* Right */}
                <div className="flex flex-row items-center space-x-7">
                  <div className="flex flex-row space-x-5 items-center">
                    <MdOutlineFilterAlt
                      size={30}
                      className=" dark:text-white cursor-pointer"
                    />
                    <BiRefresh
                      size={30}
                      className=" dark:text-white cursor-pointer"
                    />
                    <IoAddCircleOutline
                      size={30}
                      className=" dark:text-white cursor-pointer"
                    />
                  </div>
                  {/* Search input */}
                  <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full">
                    <IoSearchOutline size={30} className="dark:text-white" />
                    <input
                      className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                      placeholder="Search..."
                    />
                  </div>
                  <MdCloseFullscreen
                    className="text-black dark:text-white cursor-pointer"
                    size={30}
                    onClick={close}
                  />
                </div>
              </div>
              {/* tables */}
              <div className="h-full overflow-y-auto">
                <table className="w-full text-sm text-left">
                  <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                    <tr>
                      <th scope="col" className="text-center px-6 py-3">
                        <input type="checkbox" />
                      </th>
                      <th scope="col" className="text-center px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="text-center px-6 py-3 w-[25%]">
                        Post
                      </th>
                      <th scope="col" className="text-center px-6 py-3">
                        User
                      </th>
                      <th scope="col" className="text-center px-6 py-3">
                        No of reports
                      </th>
                      <th scope="col" className="text-center px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="text-center px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {gameSingleData?.awards.awards.map((el, index) => {
                return ( */}
                    <tr className="font-semibold text-[#707070]">
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <input type="checkbox" />
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        1.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[25%]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        ShivaSJ
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        50
                      </td>
                      <td className="flex items-center justify-center px-6 py-4 mt-5 text-[#707070] dark:text-white">
                        <div className="flex flex-row items-center space-x-2">
                          <img
                            src="/assets/png/status-green.png"
                            className="h-3 w-3"
                          />
                          <p>Pending</p>
                        </div>
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <div className="flex flex-row space-x-4 items-center justify-center">
                          <RxEyeOpen size={25} />
                          <img src="/assets/png/view.png" className="h-5 w-5" />
                          <BiTrash size={25} />
                        </div>
                      </td>
                    </tr>
                    {/* Second row */}
                    <tr className="font-semibold text-[#707070]">
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <input type="checkbox" />
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        1.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[25%]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        MaheshMW
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        20
                      </td>
                      <td className="flex items-center justify-center px-6 py-4 mt-5 text-[#707070] dark:text-white">
                        <div className="flex flex-row items-center space-x-2">
                          <img
                            src="/assets/png/status-green.png"
                            className="h-3 w-3"
                          />
                          <p>Pending</p>
                        </div>
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <div className="flex flex-row space-x-4 items-center justify-center">
                          <img src="/assets/png/eye.png" className="h-5 w-5" />
                          <img src="/assets/png/view.png" className="h-5 w-5" />
                          <img
                            src="/assets/png/delete.png"
                            className="h-5 w-5"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="font-semibold text-[#707070]">
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <input type="checkbox" />
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        1.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[25%]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        MaheshMW
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        20
                      </td>
                      <td className="flex items-center justify-center px-6 py-4 mt-5  text-[#707070] dark:text-white">
                        <div className="flex flex-row items-center space-x-2">
                          <img
                            src="/assets/png/status-green.png"
                            className="h-3 w-3"
                          />
                          <p>Pending</p>
                        </div>
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <div className="flex flex-row space-x-4 items-center justify-center">
                          <img src="/assets/png/eye.png" className="h-5 w-5" />
                          <img src="/assets/png/view.png" className="h-5 w-5" />
                          <img
                            src="/assets/png/delete.png"
                            className="h-5 w-5"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="font-semibold text-[#707070]">
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <input type="checkbox" />
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        1.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white w-[25%]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        MaheshMW
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        20
                      </td>
                      <td className="flex items-center justify-center px-6 py-4 mt-5 text-[#707070] dark:text-white">
                        <div className="flex flex-row items-center space-x-2">
                          <img
                            src="/assets/png/status-green.png"
                            className="h-3 w-3"
                          />
                          <p>Pending</p>
                        </div>
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <div className="flex flex-row space-x-4 items-center justify-center">
                          <img src="/assets/png/eye.png" className="h-5 w-5" />
                          <img src="/assets/png/view.png" className="h-5 w-5" />
                          <img
                            src="/assets/png/delete.png"
                            className="h-5 w-5"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="font-semibold text-[#707070]">
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <input type="checkbox" />
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        1.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] mt-5 dark:text-white w-[25%]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        MaheshMW
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        20
                      </td>
                      <td className="flex items-center justify-center px-6 py-4 mt-5 text-[#707070] dark:text-white">
                        <div className="flex flex-row items-center space-x-2">
                          <img
                            src="/assets/png/status-green.png"
                            className="h-3 w-3"
                          />
                          <p>Pending</p>
                        </div>
                      </td>
                      <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                        <div className="flex flex-row space-x-4 items-center justify-center">
                          <img src="/assets/png/eye.png" className="h-5 w-5" />
                          <img src="/assets/png/view.png" className="h-5 w-5" />
                          <img
                            src="/assets/png/delete.png"
                            className="h-5 w-5"
                          />
                        </div>
                      </td>
                    </tr>
                    {/* );
              })} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

FullScreenModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
};



export default FullScreenModal;
