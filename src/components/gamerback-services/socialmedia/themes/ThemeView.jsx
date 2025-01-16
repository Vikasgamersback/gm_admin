import { useEffect, useState } from "react";
import FixedSidebar from "../../../general-components/FixedSidebar";
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";
import { MdOutlineEditNote } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import EditThemeModal from "../../../Modals/EditThemeModal";
import ConformationPopup from "../../../general-components/ConfirmationPopup";
import constants from "../../../../json/constants.json";
import responseUtils from "../../../../utils/responseUtils.js";

const ThemeView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies();

  const [themeData, setThemeData] = useState(0);
  const [invokeThemes, setInvokeThemes] = useState(true);

  const [isThemeEditModalOpen, setIsThemeEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(false);

  const oncloseEditModal = () => {
    setIsThemeEditModalOpen(false);
  };

  useEffect(() => {
    const getThemeDetail = async () => {
      let params = {
        _id: location?.state,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getThemeDetail,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setThemeData(response.data);
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wrong in Theme View");
      }
    };
    if (invokeThemes) {
      setInvokeThemes(false);
      getThemeDetail();
    }
  }, [cookies, invokeThemes, location?.state, navigate]);

  const archiveTheme = async () => {
    let params = {
      id: [themeData._id],
    };
    let response = await invokeApi(
      config.baseUrl + apiList.deleteTheme,
      params,
      cookies
    );
    responseUtils.showToster(response);
    if (response.customcode === 200) {
      navigate("/themes");
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong while deleting Theme");
    }
  };

  // popup confirm status handler
  const confirmStatusHandler = (confirmStatus) => {
    if (confirmStatus) {
      archiveTheme();
    } else {
      return null;
    }
  };

  return (
    <>
      <FixedSidebar />
      <div className="section overflow-y-auto">
        <div className="m-10 flex flex-col space-y-8 ">
          <BreadCrumbs nav1="Themes" nav2="Theme View" />
          <div className=" relative w-full h-[500px] image-shade">
            <img
              src={themeData.url}
              alt=""
              className=" w-full bg-no-repeat h-96 object-cover rounded-3xl"
            />
            {/**Right */}
            <div className=" flex z-10 flex-row space-x-4  items-center justify-center bg-white absolute rounded-lg p-3 top-6 right-6">
              <MdOutlineEditNote
                size={30}
                className="hover:text-green-600 cursor-pointer"
                onClick={() => {
                  setIsThemeEditModalOpen(true);
                  setEditId(themeData._id);
                }}
              />
              <FaRegTrashCan
                size={20}
                className="hover:text-red-600 cursor-pointer"
                onClick={() => {
                  setConfirmPopup(true);
                }}
              />
            </div>
          </div>
          <div className=" z-10 flex  justify-start ps-10 space-x-10 w-full items-center bottom-7 text-white">
            <div className="flex flex-row space-x-6  items-start">
              <img
                src={themeData?.url}
                className="w-44 h-44 object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex flex-col space-y-3">
                <div className="flex  space-x-4 items-center">
                  <p className="font-normal">Name </p>
                  <p className="font-semibold">{themeData?.name}</p>
                </div>
                <div className="flex  space-x-4 items-center">
                  <p className="font-normal">Type </p>
                  <p className="font-semibold">{themeData?.type}</p>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="font-normal">Status </p>
                  <button
                    className={`${
                      themeData?.status === "ACTIVE"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }  font-semibold  px-3 py-2 rounded`}
                  >
                    {themeData?.status}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isThemeEditModalOpen ? (
        <EditThemeModal
          isThemeEditModalOpen={isThemeEditModalOpen}
          close={oncloseEditModal}
          editId={editId}
        />
      ) : null}
      <ConformationPopup
        open={confirmPopup}
        close={() => setConfirmPopup(false)}
        text={constants.CHANGEDELETEPOPUPTEXT}
        heading={constants.DELETESTATUS}
        submitHandler={confirmStatusHandler}
      />
    </>
  );
};

export default ThemeView;
