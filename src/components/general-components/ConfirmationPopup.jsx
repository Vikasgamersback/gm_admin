import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

// eslint-disable-next-line react/prop-types
const ConformationPopup = ({ open, close, text, heading, submitHandler }) => {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed z-10 inset-0 bg-opacity-80 bg-black  flex justify-center items-center">
      <div className="flex flex-col space-y-5 w-full  max-w-sm bg-white dark:bg-[#121212]  border-[1px] border-black dark:border-white  rounded-2xl  p-6  text-white">
        <h3 className="text-[#121212] text-center text-2xl dark:text-white dark:border-white border-black pb-2 border-b-[1px] font-semibold">
          {heading}
        </h3>
        <p className="text-[#121212] dark:text-white text-center text-lg">
          {text}
        </p>
        <div className="flex flex-row items-center justify-center space-x-8">
          <div
            className="cursor-pointer"
            onClick={() => {
              submitHandler(false);
              close();
            }}
          >
            <RxCross2
              size={40}
              className="dark:text-red-600 text-red-600 hover:dark:text-white hover:text-black hover:scale-125"
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              submitHandler(true);
              close();
            }}
          >
            <MdOutlineDone
              size={40}
              className="dark:text-green-600 text-green-600 hover:dark:text-white hover:text-black hover:scale-125"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConformationPopup;
