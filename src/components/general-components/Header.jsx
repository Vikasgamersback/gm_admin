// @import dependencies
import { useState } from "react";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import { BsMoonStars, BsSun } from "react-icons/bs";
import "../../App.css";

// @import files
import constants from "../../json/constants.json";
import UserProfileModal from "../Modals/UserProfileModal";

import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [openModal, setOpenModal] = useState(false);
  const [searchValue , setSearchValue] = useState("");

  const onClose = () => {
    setOpenModal(false);
  };

  // settting initial cookies
  /* useEffect(() => {
    setCookie(constants.MODECOOKIE, JSON.stringify(constants.LIGHT), {
      path: "/",
      maxAge: 3000000,
      sameSite: "strict",
    });
  }, [setCookie]); */

  return (
    <>
      <div className="h-20 fixed top-0 z-10 flex w-full items-center justify-between bg-header-light dark:bg-header-dark p-5 header-shadow">
        {/* gamersback */}
        <div className="flex flex-row space-x-10 items-center">
          <img
            className="h-10 w-30 cursor-pointer"
            src={
              cookies[constants.MODECOOKIE] === constants.LIGHT
                ? "/assets/png/GamersBack_Logo_Black.png"
                : "/assets/png/GamersBack_Logo.png"
            }
            onClick={() => {   {/* doubt */}
              if (
                cookies[constants.ADMINDATA].adminType !== constants.HRADMINS
              ) {
                navigate("/");
              }
            }}
          />
          {/* Search input */}
          <div className="flex flex-row space-x-5 h-10  items-center p-5 border-[1px] border-[#707070] w-[350px] rounded-full">
            <IoSearchOutline size={30} className="dark:text-white" />
            <input
              className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
              placeholder="Search..."
              value = {searchValue}
              onChange={(e)=> setSearchValue(e.target.value)}
            />
            <RxCross1 size={25} className="dark:text-white" onClick={() => setSearchValue("")} />
          </div>
        </div>

        {/* Center icons */}
        {/* <div className="flex flex-row items-center justify-center space-x-10 me-[308px]">
        <img className="h-8 w-8" src={"/assets/png/logo-black.png"} />
        <img className="h-8 w-8" src={"/assets/png/joystick.png"} />
        <img className="h-8 w-8" src={"/assets/png/ad.png"} />
        <img className="h-8 w-8" src={"/assets/png/game-store.png"} />
      </div> */}

        {/* justify end  icons*/}
        <div className="flex flex-row items-center justify-end space-x-7 cursor-pointer">
          {cookies[constants.MODECOOKIE] === constants.LIGHT ? (
            <BsSun
              className="text-2xl dark:text-zinc-200"
              onClick={() => {
                setCookie(
                  constants.MODECOOKIE,
                  JSON.stringify(constants.DARK), 
                  {
                    path: "/",
                    maxAge: 3000000,
                    sameSite: "strict",
                  }
                );
              }}
            />
            
          ) : (
            <BsMoonStars
              className="text-2xl dark:text-zinc-200"
              onClick={() => {
                setCookie(
                  constants.MODECOOKIE,
                  JSON.stringify(constants.LIGHT),
                  {
                    path: "/",
                    maxAge: 3000000,
                    sameSite: "strict",
                  }
                );
              }}
            />
          )}

          <img className="h-8 w-8" src={"/assets/png/notification.png"} />

          <img
            onClick={() => {
              setOpenModal(true);
            }}
            className="h-8 w-8 cursor-pointer"
            src={"/assets/png/avatar.png"}
          />
        </div>
      </div>
      <UserProfileModal open={openModal} close={onClose} />
    </>
  );
};

export default Header;
