import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils.js";

const AddThemeModal = ({ open, close }) => {
  const tabItems = ["Basic Info", "Background"];

  const navigate = useNavigate();
  const [cookies] = useCookies();

  const inputRefCoverPicture = useRef();
  const [coverPicturePreviewFile, setCoverPicturePreviewFile] = useState(null);
  const [coverPictureFile, setCoverPictureFile] = useState(null);

  const [resetThemeData, setResetThemeData] = useState(false);

  const [invokeAddTheme, setInvokeAddTheme] = useState(false);

  const [addThemeData, setAddThemeData] = useState({
    name: "",
    type: "",
    status: "",
  });

  const [themeErrors, setthemeErrors] = useState({
    nameError: "",
    typeError: "",
    statusError: "",
  });

  const [themeCoverPictureError, setthemeCoverPictureError] = useState("");

  // addAdminChangeHandler
  const addThemeChangeHandler = (ev) => {
    setAddThemeData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleFileUpload = async (
    ev,
    setPreview,
    setError,
    setFile,
    setAddThemeData,
    type
  ) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(/^image\/(jpe?g|png)/);

    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 5242880) {
        const formData = new FormData();
        formData.append("image", fileUploaded);

        try {
          const response = await invokeFormDataApi(
            config.baseUrl + apiList.singleImage,
            formData
          );

          if (response.customcode === 200) {
            setPreview(window.URL.createObjectURL(fileUploaded));
            setError("");
            setFile(fileUploaded);
            setAddThemeData((prev) => ({
              ...prev,
              [type]: response.data.imageUrl,
            }));

            toast.success(response.data.message);
          } else {
            console.error("Image upload failed:", response.data.message);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    }
  };

  //cover picture upload
  const handleCoverPictureUpload = (ev) => {
    handleFileUpload(
      ev,
      setCoverPicturePreviewFile,
      setthemeCoverPictureError,
      setCoverPictureFile,
      setAddThemeData,
      "url"
    );
  };

  // Add Theme
  useEffect(() => {
    const addTheme = async () => {
      let params = {
        ...addThemeData,
      };
      const response = await invokeApi(
        config.baseUrl + apiList.addTheme,
        params,
        cookies
      );
      responseUtils.showToster(response);
      if (response && response.data) {
        if (response.customcode === 200) {
          setResetThemeData(true);
          close();
        }
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wront while adding Theme");
      }
    };
    if (invokeAddTheme) {
      setInvokeAddTheme(false);
      addTheme();
    }
  }, [addThemeData, invokeAddTheme, cookies, navigate]);

  // reset theme data
  useEffect(() => {
    const resetAddThemeData = () => {
      setAddThemeData({
        name: "",
        status: "",
        type: "",
      });
      setCoverPictureFile("");
      setCoverPicturePreviewFile("");
    };
    if (resetThemeData) {
      setResetThemeData(false);
      resetAddThemeData();
    }
  }, [resetThemeData]);

  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => {
    const isCurrentStepValid = validateCurrentStep();
    if (isCurrentStepValid) {
      setCurrentStep((prevCurr) => prevCurr + 1);
    } 
  };
  const prevStep = () => setCurrentStep(currentStep - 1);
  const handleSubmit = () => {
    setInvokeAddTheme(true);
    close();
  };
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: {
        let isValid = true;
        if (!addThemeData.name) {
          setthemeErrors((prevErrors) => ({
            ...prevErrors,
            nameError: "Theme Name is Required",
          }));
          isValid = false;
        } else {
          setthemeErrors((prevErrors) => ({
            ...prevErrors,
            nameError: "",
          }));
        }
        if (!addThemeData.type) {
          setthemeErrors((prevErrors) => ({
            ...prevErrors,
            typeError: "Theme type is Required",
          }));
          isValid = false;
        } else {
          setthemeErrors((prevErrors) => ({
            ...prevErrors,
            typeError: "",
          }));
        }
        if (!["ACTIVE", "INACTIVE"].includes(addThemeData.status)) {
          setthemeErrors((prevErrors) => ({
            ...prevErrors,
            statusError: "Theme status should be either ACTIVE or INANCTIVE",
          }));

          isValid = false;
        } else {
          setthemeErrors((prevErrors) => ({
            ...prevErrors,
            statusError: "",
          }));
        }
        return isValid;
      }
      case 2: {
        let isValid = true;
        if (!coverPictureFile) {
          setthemeCoverPictureError("Cover Picture is Required");
          isValid = false;
        } else {
          setthemeCoverPictureError("");
        }
        return isValid;
      }
      case 3: {
        let isValid = true;
        return isValid;
      }
      case 4: {
        let isValid = true;
        return isValid;
      }
      default: {
        return null;
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="flex flex-col px-3 py-3 space-y-3 space-x-5">
              <div className="flex items-center">
                <label htmlFor="name" className="w-52 dark:text-white">
                  Theme Name
                </label>
                <input
                  type="text"
                  name="name"
                  className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                  onChange={(ev) => {
                    addThemeChangeHandler(ev);
                    setthemeErrors({
                      nameError: "",
                    });
                  }}
                  placeholder={
                    themeErrors.nameError ? themeErrors.nameError : ""
                  }
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="type" className="w-44 dark:text-white">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                  onChange={(ev) => {
                    addThemeChangeHandler(ev);
                    setthemeErrors({
                      typeError: "",
                    });
                  }}
                  placeholder={
                    themeErrors.typeError ? themeErrors.typeError : ""
                  }
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="status" className="w-44 dark:text-white">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  className=" px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                  onChange={(ev) => {
                    addThemeChangeHandler(ev);
                    setthemeErrors({
                      statusError: "",
                    });
                  }}
                  placeholder={
                    themeErrors.statusError ? themeErrors.statusError : ""
                  }
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className=" mx-4 my-4 ">
              <div className="border border-dashed h-96 flex items-center justify-center">
                <label
                  htmlFor="url"
                  className="flex items-center flex-col space-y-3"
                >
                  {coverPicturePreviewFile ? (
                    <img
                      src={coverPicturePreviewFile}
                      className="h-72 w-full object-cover rounded-lg"
                    />
                  ) : (
                    <img src="/assets/png/image-upload.png" />
                  )}

                  <input
                    type="file"
                    id="url"
                    ref={inputRefCoverPicture}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleCoverPictureUpload}
                    required
                  />

                  <p className="text-red-500">
                    {themeCoverPictureError ? themeCoverPictureError : ""}
                  </p>
                  <button
                    className=" bg-blue-500 button font-normal text-white border-none"
                    onClick={() => inputRefCoverPicture.current.click()}
                  >
                    {coverPicturePreviewFile
                      ? "Change Picture"
                      : "Upload Cover picture"}
                  </button>
                </label>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>Icon Set</div>
          </>
        );
      case 4:
        return (
          <>
            <div>Colors</div>
          </>
        );
      default:
        null;
    }
  };

  //buttons
  const renderNavigationButtons = () => {
    if (currentStep === tabItems.length) {
      return (
        <button
          className="button bg-blue-500 text-white flex  my-3 mx-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      );
    } else {
      return (
        <div className="flex justify-between px-5 py-3">
          {currentStep > 1 && (
            <button
              className="button bg-blue-500 text-white"
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          <button className="button bg-blue-500 text-white" onClick={nextStep}>
            Next
          </button>
        </div>
      );
    }
  };

  return (
    <>
      {open && (
        <div className="fixed z-50 inset-0 bg-opacity-60 bg-black  flex justify-center items-center">
          <div className="flex flex-col w-[90%]  dark:border-white">
            {/*Header*/}
            <div className="flex flex-row w-full items-center  justify-between px-6 py-4 bg-white dark:bg-[#393939]  rounded-tr-2xl border-b  rounded-tl-2xl">
              <div className="flex flex-row items-center space-x-6 ">
                <h5 className="text-black font-semibold dark:text-white">
                  Add Theme
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
            {/**tabs */}
            <section className="bg-white dark:bg-[#393939] rounded-md ">
              <div>
                {/**tab header */}
                <nav className="w-full bg-white dark:bg-[#393939] dark:text-white">
                  <ul className="flex">
                    {tabItems.map((tab, index) => (
                      <li
                        key={tab}
                        className={`flex-1 text-center font-montserrat py-3 cursor-pointer border-b-4 ${
                          currentStep === index + 1
                            ? "border-blue-500 text-blue-500 font-bold"
                            : "border-transparent"
                        }`}
                        onClick={() => setCurrentStep(index + 1)}
                      >
                        {tab}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div>{renderStepContent()}</div>
              {renderNavigationButtons()}
            </section>
          </div>
        </div>
      )}
    </>
  );
};


AddThemeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
  
};

export default AddThemeModal;
