import { IoMdAddCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";
import PropTypes from 'prop-types';

const AddChallengeModal = ({ open, close }) => {
  return (
    <>
      {open && (
        <div className="fixed z-50 inset-0 bg-opacity-60 bg-black  flex justify-center items-center">
          <div className="flex flex-col w-[90%]  dark:border-white">
            <div className="flex flex-row w-full items-center  justify-between px-6 py-4 bg-white dark:bg-[#393939]  rounded-tr-2xl  rounded-tl-2xl">
              <div className="flex flex-row items-center space-x-6">
                <IoMdAddCircle
                  size={30}
                  className="text-black dark:text-white"
                />
                <h5 className="text-black font-semibold dark:text-white">
                  Add Challenge
                </h5>
              </div>
              <MdClose
                className="cursor-pointer text-black dark:text-white"
                size={25}
                onClick={() => {
                  close();
                }}
              />
            </div>
            {/**Fields */}
            <section className="bg-white dark:bg-[#393939] rounded-md ">
              <div className="flex flex-col px-3 py-3 space-y-3 space-x-5">
                <div className="flex items-center ">
                  <label className="w-44 dark:text-white">Game</label>
                  <input
                    type="text"
                    name="game"
                    className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                    placeholder={""}
                  />
                </div>
                <div className="flex items-center ">
                  <label className="w-44 dark:text-white">
                    Name of the Challenge
                  </label>
                  <input
                    type="text"
                    name="no of challenge"
                    className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                    placeholder={""}
                  />
                </div>
                <div className="flex items-center ">
                  <label className="w-44 dark:text-white">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                    placeholder={""}
                  />
                </div>
                <div className="flex items-center ">
                  <label className="w-44 dark:text-white">Progress count</label>
                  <input
                    type="text"
                    name="progress"
                    className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                    placeholder={""}
                  />
                </div>
                <div className="flex items-center ">
                  <label className="w-44 dark:text-white">Coins</label>
                  <input
                    type="text"
                    name="coins"
                    className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                    placeholder={""}
                  />
                </div>
                <div className="flex items-center ">
                  <label className="w-44 dark:text-white">Type</label>
                  <input
                    type="text"
                    name="type"
                    className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                    placeholder={""}
                  />
                </div>
                <div className="flex items-center ">
                  <label className="w-44 dark:text-white">Date</label>
                  <input
                    type="text"
                    name="date"
                    className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                    placeholder={""}
                  />
                </div>
              </div>
              <div className=" flex  px-3 space-x-3 py-2">
                <button className="button w-full bg-gray-600 text-white border-none">
                  Cancel
                </button>
                <button className="button w-full  bg-blue-600 text-white border-none">
                  Confirm
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

AddChallengeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
};

export default AddChallengeModal;
