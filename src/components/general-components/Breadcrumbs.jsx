/* eslint-disable react/prop-types */
// import dependencies
import { IoIosArrowForward } from "react-icons/io";
import { ImHome3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

// Import files
import constants from "../../json/constants.json";

const BreadCrumbs = ({ nav1, nav2, link }) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row items-center space-x-3'>
      <ImHome3
        className='dark:text-white text-[#949495] h-5 w-5 cursor-pointer'
        onClick={() => {
          navigate(constants.PATH.NAVIGATEHOME);
        }}
      />

      <IoIosArrowForward className='dark:text-white text-[#949495] h-4 w-4' />
      <h4 className='text-[#949495] font-semibold'>{nav1}</h4>
      {!!nav2 && (
        <>
          <IoIosArrowForward className='dark:text-white text-[#949495] h-4 w-4' />
          <h4
            className='text-[#949495] font-semibold'
            onClick={() => {
              navigate(link);
            }}>
            {nav2}
          </h4>
        </>
      )}
    </div>
  );
};

export default BreadCrumbs;
