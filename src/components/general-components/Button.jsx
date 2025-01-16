/* eslint-disable react/prop-types */
function Button({ text }) {
  return (
    <div className="p-0.5 w-full border-2 border-black dark:border-white cursor-pointer rounded-lg ">
      <p className=" text-[#121212] dark:text-white h-[35px] py-1 px-1 text-center rounded-lg font-bold">
        {text}
      </p>
    </div>
  );
}

export default Button;
