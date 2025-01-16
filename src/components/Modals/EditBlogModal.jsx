import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../utils/apiServiceUtils";
import { MdClose } from "react-icons/md";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils.js";
import { toast } from "react-toastify";
import { InputComponent } from "../general-components/InputComponent.jsx";

const EditBlogModal = ({ isBlogEditModalOpen, close, editId }) => {
  const tabItems = ["Basic Information", "Display Photos"];

  const navigate = useNavigate();
  const [cookies] = useCookies();

  const inputRefCoverPicture = useRef();
  const [imagePreviewFile, setImagePreviewFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [resetBlogData, setResetBlogData] = useState(false);
  const [invokeAddBlog, setInvokeAddBlog] = useState(false);
  const [invokeBlog, setinvokeBlog] = useState(true);
  const [addBlogData, setAddBlogData] = useState({
    title: "",
    description: "",
    duration: "",
    type: "",
    status: "",
    docx: "",
    url: "",
  });
  const [tags, setTags] = useState([]);

  const [addBlogDataErrors, setAddBlogDataErrors] = useState({
    titleError: "",
    descriptionError: "",
    tagsError: "",
    durationError: "",
    typeError: "",
    statusError: "",
    docxError: "",
    urlError: "",
  });
  const [imageError, setimageError] = useState("");

  // addAdminChangeHandler
  const addBlogChangeHandler = (ev) => {
    setAddBlogData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };
  const addBlogChangeHandler1 = (ev, params) => {
    setAddBlogData((prev) => ({
      ...prev,
      [params]: ev.toString(),
    }));
  };

  const handleAddTags = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      setTags([...tags, event.target.value.trim()]);
      event.target.value = "";
    }
  };
  const handleFileUpload = async (
    ev,
    setPreview,
    setError,
    setFile,
    setAddBlogData,
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
  const handleImageUpload = (ev) => {
    handleFileUpload(
      ev,
      setImagePreviewFile,
      setimageError,
      setImageFile,
      setAddBlogData,
      "image"
    );
  };

  // edit blog
  useEffect(() => {
    const editBlog = async () => {
      let params = {
        ...addBlogData,
        tags,
      };
      params._id = editId;
      const response = await invokeApi(
        config.baseUrl + apiList.editBlog,
        params,
        cookies
      );
      responseUtils.showToster(response);
      if (response && response.data) {
        if (response.customcode === 200) {
          setResetBlogData(true);
          close();
        }
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wrong while editing blog data");
      }
    };
    if (invokeAddBlog) {
      setInvokeAddBlog(false);
      editBlog();
    }
  }, [addBlogData, close, editId, cookies, navigate, invokeAddBlog]);

  //Get blog Details
  // const [invokeGetBlogDetails] = useState(true);
  // const [invokeBlog, setinvokeBlog] = useState(true);
  useEffect(() => {
    const getBlogDetail = async () => {
      try {
        let params = {
          _id: editId,
        };
        let response = await invokeApi(
          config.baseUrl + apiList.getBlogDetail,
          params,
          cookies
        );

        if (response.customcode === 200) {
          const {
            title,
            type,
            status,
            description,
            duration,
            docx,
            url,
            tags,
            image,
          } = response.data;

          setAddBlogData({
            title,
            type,
            status,
            description,
            duration,
            docx,
            url,
          });
          setTags(tags);
          setImagePreviewFile(image);
          setImageFile(image);
        } else if (response.customcode === 201) {
          navigate("/logout");
        } else {
          alert("Something went wrong while getting blog details");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
        alert("An error occurred while fetching blog details");
      }
    };

    if (invokeBlog) {
      setinvokeBlog(false);
      getBlogDetail();
    }
  }, [cookies, editId, navigate, invokeBlog]);

  // reset blog data
  useEffect(() => {
    const resetAddBlogData = () => {
      setAddBlogData({
        title: "",
        description: "",
        tags: "",
        duration: "",
        status: "",
        type: "",
        url: "",
        docx: "",
      });
      setImageFile("");
      setImagePreviewFile("");
    };
    if (resetBlogData) {
      setResetBlogData(false);
      resetAddBlogData();
    }
  }, [resetBlogData]);

  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => {
    const isCurrentStepValid = validateCurrentStep();
    if (isCurrentStepValid) {
      setCurrentStep((prevCurr) => prevCurr + 1);
    }
  };
  const prevStep = () => setCurrentStep(currentStep - 1);

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: {
        let isValid = true;
        if (!addBlogData.title) {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            titleError: "Title is required",
          }));
          isValid = false;
        } else {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            titleError: "",
          }));
        }
        if (!addBlogData.description) {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            descriptionError: "Description is required",
          }));
          isValid = false;
        } else {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            descriptionError: "",
          }));
        }
        if (!tags.length) {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            tagsError: "Tag(s) is required",
          }));
          isValid = false;
        } else {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            tagsError: "",
          }));
        }
        if (!addBlogData.duration) {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            durationError: "Duration is required",
          }));
          isValid = false;
        } else {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            durationError: "",
          }));
        }
        if (!["URL", "DOCX"].includes(addBlogData.type)) {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            typeError: "Type should be either URL or Docx",
          }));
          isValid = false;
        } else {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            typeError: "",
          }));
        }
        if (!["ACTIVE", "INACTIVE"].includes(addBlogData.status)) {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            statusError: "Blog status should be either ACTIVE or INACTIVE",
          }));
          isValid = false;
        } else {
          setAddBlogDataErrors((prevErrors) => ({
            ...prevErrors,
            statusError: "",
          }));
        }
        return isValid;
      }
      case 2: {
        let isValid = true;
        if (!image) {
          setimageError("Image is required");
          isValid = false;
        } else {
          setimageError("");
        }
        return isValid;
      }
      default: {
        return null;
      }
    }
  };

  const handleSubmit = () => {
    setInvokeAddBlog(true);
    setResetBlogData();
  };
  const dropdownOptions1 = [
    { label: "Select type", value: "" },
    { label: "URL", value: "URL" },
    { label: "DOCX", value: "DOCX" },
  ];
  const dropdownOptions2 = [
    { label: "Select status", value: "" },
    { label: "ACTIVE", value: "ACTIVE" },
    { label: "INACTIVE", value: "INACTIVE" },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="flex flex-col  px-3 py-3 space-y-3 space-x-5">
              <div className="flex  space-y-3 flex-col px-10 ">
                <div className="flex  space-y-3 flex-col px-10">
                  <InputComponent
                    label={"Title"}
                    name={"title"}
                    value={addBlogData.title}
                    onChange={(ev) => {
                      addBlogChangeHandler(ev);
                      setAddBlogDataErrors({
                        titleError: "",
                      });
                    }}
                    placeholder={
                      addBlogDataErrors.titleError
                        ? addBlogDataErrors.titleError
                        : ""
                    }
                  />
                </div>

                <div className="flex  space-y-3 flex-col px-10">
                  <InputComponent
                    label={"Description"}
                    name={"description"}
                    value={addBlogData.description}
                    textarea={true}
                    onChange={(ev) => {
                      addBlogChangeHandler(ev);
                      setAddBlogDataErrors({
                        descriptionError: "",
                      });
                    }}
                    placeholder={
                      addBlogDataErrors.descriptionError
                        ? addBlogDataErrors.descriptionError
                        : "Enter the job description..."
                    }
                  />
                </div>

                <div className="flex  space-y-3 flex-col px-10">
                  <InputComponent
                    onKeyDown={handleAddTags}
                    label={"Tag(s)"}
                    name={"tags"}
                    placeholder={"Multiselect"}
                    // value={"description"}
                  />
                  <div className="flex flex-wrap gap-2 mt-2 px-32">
                    {tags.map((tags, index) => (
                      <span
                        key={index}
                        className="flex items-center bg-gray-200 px-2 py-1 rounded"
                      >
                        <span>{tags}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTags(index)}
                          className="ml-2 text-red-500 focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-y-3 flex-col px-10">
                  <InputComponent
                    label={"Duration"}
                    name={"duration"}
                    value={addBlogData.duration}
                    onChange={(ev) => {
                      //   handleDurationChange(ev);
                      addBlogChangeHandler(ev);
                      setAddBlogDataErrors({
                        durationError: "",
                      });
                    }}
                    placeholder={
                      addBlogDataErrors.durationError
                        ? addBlogDataErrors.durationError
                        : ""
                    }
                  />
                </div>
                <div className="flex  space-y-3 flex-col px-10">
                  <InputComponent
                    label={"Type"}
                    name={"type"}
                    value={addBlogData.type}
                    dropdown={true}
                    options={dropdownOptions1}
                    onChange={(ev) => {
                      addBlogChangeHandler(ev);
                      setAddBlogDataErrors({
                        typeError: "",
                      });
                    }}
                    placeholder={
                      addBlogDataErrors.typeError
                        ? addBlogDataErrors.typeError
                        : ""
                    }
                  />
                  {addBlogData.type === "URL" && (
                    <InputComponent
                      label={"URL"}
                      name={"url"}
                      value={addBlogData.url}
                      onChange={(ev) => addBlogChangeHandler(ev)}
                      placeholder="Enter the URL"
                    />
                  )}
                  {addBlogData.type === "DOCX" && (
                    <InputComponent
                      richTextEditor={true}
                      setData={(ev) => {
                        addBlogChangeHandler1(ev, "docx");
                      }}
                      label={"DOCX"}
                      name={"docx"}
                      value={addBlogData.docx}
                      placeholder={
                        addBlogDataErrors.docxError
                          ? addBlogDataErrors.docxError
                          : ""
                      }
                    />
                  )}
                </div>

                <div className="flex space-y-3 flex-col px-10">
                  <InputComponent
                    label={"Status"}
                    name={"status"}
                    dropdown={true}
                    value={addBlogData.status}
                    options={dropdownOptions2}
                    onChange={(ev) => {
                      addBlogChangeHandler(ev);
                      setAddBlogDataErrors({
                        statusError: "",
                      });
                    }}
                    placeholder={
                      addBlogDataErrors.statusError
                        ? addBlogDataErrors.statusError
                        : ""
                    }
                  />
                </div>
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
                  {imagePreviewFile ? (
                    <img
                      src={imagePreviewFile}
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
                    onChange={handleImageUpload}
                    required
                  />

                  <p className="text-red-500">{imageError ? imageError : ""}</p>
                  <button
                    className=" bg-blue-500 button font-normal text-white border-none"
                    onClick={() => inputRefCoverPicture.current.click()}
                  >
                    {imagePreviewFile ? "Change Picture" : "Upload Image"}
                  </button>
                </label>
              </div>
            </div>
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
        <div className="flex justify-end">
          <button
            className="button bg-blue-500 text-white flex my-3 mx-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex justify-end px-5 py-3">
          <span>
            {currentStep > 1 && (
              <button
                className="button bg-blue-500 text-white"
                onClick={prevStep}
              >
                Previous
              </button>
            )}
          </span>
          <button className="button bg-blue-500 text-white" onClick={nextStep}>
            Next
          </button>
        </div>
      );
    }
  };

  return (
    <>
      {isBlogEditModalOpen && (
        <div className="fixed z-50 inset-0 bg-opacity-60 bg-black  flex justify-center items-center">
          <div className="flex flex-col w-[90%]  dark:border-white">
            {/*Header*/}
            <div className="flex flex-row w-full items-center  justify-between px-6 py-4 bg-white dark:bg-[#393939]  rounded-tr-2xl border-b  rounded-tl-2xl">
              <div className="flex flex-row items-center space-x-6 ">
                <h5 className="text-black font-semibold dark:text-white">
                  Edit Blog
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

EditBlogModal.propTypes = {
  isBlogEditModalOpen: PropTypes.bool.isRequired,
  close: PropTypes.func,
  editId: PropTypes.any,
};

export default EditBlogModal;
