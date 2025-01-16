/* eslint-disable react/prop-types */
function ActionButton({ text, color }) {
  return (
    <div
      className={`w-full mx-auto ${
        color === "Red"
          ? "bg-red-300 border-[1px] border-red-700"
          : color === "Green"
          ? "bg-green-300 border-[1px] border-green-700"
          : color === "Blue"
          ? "bg-blue-300 border-[1px] border-blue-700"
          : "white"
      } cursor-pointer rounded-md py-1 px-1`}
    >
      <span className=" text-[#121212] px-2 font-light">{text}</span>
    </div>
  );
}

export default ActionButton;
