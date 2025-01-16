
// import { useState, useEffect } from "react";

// function ToggleButton({ status, statusResponse }) {
//   const [toggle, setToggle] = useState(status);
//   const toggleClass = "transform translate-x-5";
//   useEffect(() => {
//     if (statusResponse) setToggle(status);
//   }, [status, statusResponse, toggle]);
//   return (
//     <>
//       {/*   ToggleButton Container */}

//       <div
//         className={
//           "w-10 h-5 flex items-center rounded-full p-1 cursor-pointer" +
//           (toggle ? " bg-[#92c09a]" : " bg-[#c6846d]")
//         }
       
//       >
    
//         {/* ToggleButton */}
//         <div
//           className={
//             "bg-white dark:bg-black h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out inset-10" +
//             (toggle ? toggleClass : null)
//           }
//         ></div>
//       </div>
//     </>
//   );
// }

// export default ToggleButton;


import PropTypes from 'prop-types';


function ToggleButton({ status, onClick }) {
  return (
    <div
      className={
        "w-10 h-5 flex items-center rounded-full p-1 cursor-pointer" +
        (status ? " bg-[#92c09a]" : " bg-[#c6846d]")
      }
      onClick={onClick}
    >
      <div
        className={
          "bg-white dark:bg-black h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out inset-10" +
          (status ? " transform translate-x-5" : "")
        }
      ></div>
    </div>
  );
}


ToggleButton.propTypes = {
  status: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ToggleButton;
