import { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../utils/apiServiceUtils";
import responseUtils from "../../utils/responseUtils";
import { config } from "../../utils/configUtils";
import { InputComponent } from "../general-components/InputComponent";

const AddInBlogs = ({ open, close }) => {
  const tabItems = ["Basic Information", "Display Photos"];

  const [imagePreviewFile, setImagePreviewFile] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [resetBlogData, setResetBlogData] = useState(false);
  const [invokeAddBlog, setInvokeAddBlog] = useState(false);

  const [addBlogData, setAddBlogData] = useState({
    title: "",
    description: "",
    duration: "",
    type: "",
    status: "",
    url:"",
    docs:"",
  });

  const [tags, setTags] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setSubOption(""); // Reset sub option when main option changes
  };

  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [addBlogDataErrors, setAddBlogDataErrors] = useState({
    titleError: "",
    descriptionError: "",
    tagsError: "",
    durationError: "",
    typeError: "",
    statusError: "",
    docxError:"",
    urlError:"",
  });

  const addBlogChangeHandler = (ev) => {
    setAddBlogData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };
  const addBlogChangeHandler1 = (ev, params) => {
    setAddBlogData((prev) => ({
      ...prev,
      [params]: ev,
    }));
  };

  // const handleAddTags = (event) => {
  //   if (event.key === "Enter" && event.target.value.trim()) {
  //     setTags([...tags, event.target.value.trim()]);
  //     event.target.value = "";
  //   }
  // };
  const handleAddTags = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      if (!tags.includes(event.target.value.trim())) {
        setTags([...tags, event.target.value.trim()]);
      } else {
        toast.error("Duplicate tag");
      }
      event.target.value = "";
    }
  };
  

  const handleRemoveTags = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleDurationChange = (e) => {
    const input = e.target.value;
    const regex = /^[0-9\b]+$/;

    if (input === "" || regex.test(input)) {
      setAddBlogData((prev) => ({
        ...prev,
        duration: input,
      }));
    }
  };

  useEffect(() => {
    const addBlog = async () => {
      try {
        let params = {
          ...addBlogData,

          tags,
        };

        let response = await invokeApi(
          config.baseUrl + apiList.addBlog,
        //   {
        //     "title": "The First Blog",
        //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
        //     "image": "https://miro.medium.com/v2/resize:fit:750/0*cpQo2vBDH0D1djO5",
        //     "tags": ["Design"],
        //     "type": "URL",
        //     "duration": 5,
        //     "url": "https://gamersback.medium.com/gamersback-learnings-from-alpha-test-14fa98db1dd1",
        //     "docs": "",
        //     "status": "ACTIVE"
        // },
        params,
          cookies
        );
       console.log("response by vikas", response);
        if (response) {
          if (response.customcode === 200) {
            toast.success(response.message);
            setResetBlogData(true);
            close();
          } else if (response.customcode === 201) {
            navigate("/logout");
          } else {
            if(response.message){
              toast.error(response.message[0]);
              
            }
            else
            alert( "Something went wrong while adding the blog");
          }
        } else {
          alert("No valid response from the server");
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    if (invokeAddBlog) {
      setInvokeAddBlog(false);
      addBlog();
    }
  }, [cookies, invokeAddBlog, navigate, addBlogData, tags]);

  const handleImageFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        console.log("FileReader result:", result);
        if (typeof result === "string") {
          setImagePreviewFile(result);
          console.log("Image preview set:", result);
        } else {
          console.error("FileReader result is not a string");
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  };
  //
  const inputRefCoverPicture = useRef();
  const [imageFile, setImageFile] = useState(null);

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
          
          console.log( "image", response)

          if (response.customcode === 200) {
            setPreview(window.URL.createObjectURL(fileUploaded));
            setError("");
            setFile(fileUploaded);
            setAddBlogData((prev) => ({
              ...prev,
              [type]: response.data.imageUrl,
            }));

            toast.success(response.message);
          } else {
            console.error("Image upload failed:", response.data.message);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    }
  };

  const handleImageUpload =  (ev) => {
    handleFileUpload(
      ev,
      setImagePreviewFile,
      setImageError,
      setImageFile,
      setAddBlogData,
      "image"
    ).then((res) =>console.log(res));
 
  };

  useEffect(() => {
    const resetBlogDataFun = () => {
      setAddBlogData({
        title: "",
        description: "",
        duration: "",
        type: "",
        status: "",
      });
      setTags([]);
      setImage("");
    };
    if (resetBlogData) {
      setResetBlogData(false);
      resetBlogDataFun();
    }
  }, [resetBlogData]);

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
            typeError: "Type should be either URL or Docs",
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
          setImageError("Image is required");
          isValid = false;
        } else {
          setImageError("");
        }
        return isValid;
      }
      default: {
        return null;
      }
    }
  };

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    const isCurrentStepValid = validateCurrentStep();
    if (isCurrentStepValid) {
      setCurrentStep((prevCurr) => prevCurr + 1);
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = () => {
    setInvokeAddBlog(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="flex flex-col px-3 py-3 space-x-5 space-y-3">
              <div className="flex flex-col px-10 space-y-3 ">
                <div className="flex flex-col px-10 space-y-3">
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

                <div className="flex flex-col px-10 space-y-3">
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

                <div className="flex flex-col px-10 space-y-3">
                  <InputComponent
                    onKeyDown={handleAddTags}
                    label={"Tag(s)"}
                    name={"tags"}
                    placeholder={"Multiselect"}
                    // value={"description"}
                  />
                  <div className="flex flex-wrap gap-2 px-32 mt-2">
                    {tags.map((tags, index) => (
                      <span
                        key={index}
                        className="flex items-center px-2 py-1 bg-gray-200 rounded"
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
                <div className="flex flex-col px-10 space-y-3">
                  <InputComponent
                  type={"number"}
                    label={"Duration in Years"}
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
                <div className="flex flex-col px-10 space-y-3">
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
                   {addBlogData.type === 'URL' && (
        <InputComponent
          label={"URL"}
          name={"url"}
          value={addBlogData.url}
          onChange={(ev) => addBlogChangeHandler(ev)}
          placeholder="Enter the URL"
        />
      )}
      {addBlogData.type === 'DOCX' && (
         <InputComponent
         richTextEditor={true}
         setData={(ev) => {
           addBlogChangeHandler1(ev, "docx");
         }}
         label={"DOCX"}
         name={"docs"}
         value={addBlogData.docs}
         placeholder={
           addBlogDataErrors.docxError
             ? addBlogDataErrors.docxError
             : ""
         }
       />
      )}
                </div>

                <div className="flex flex-col px-10 space-y-3">
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
            <div className="mx-4 my-4 ">
              <div className="flex items-center justify-center border border-dashed h-96">
                <label
                  htmlFor="url"
                  className="flex flex-col items-center space-y-3"
                >
                  {imagePreviewFile ? (
                    <img
                      src={imagePreviewFile}
                      className="object-cover w-full rounded-lg h-72"
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
                    className="font-normal text-white bg-blue-500 border-none button"
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
        return null;
    }
  };

  const renderNavigationButtons = () => {
    if (currentStep === tabItems.length) {
      // Last step - render a different action (e.g., submit button)
      return (
        <div className="flex justify-end">
          <button
            className="flex mx-4 my-3 text-white bg-blue-500 button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      );
    } else {
      // Render "Previous" and "Next" buttons for other steps
      return (
        <div className="flex justify-end px-5 py-3">
          <span>
            {currentStep > 1 && (
              <button
                className="text-white bg-blue-500 button"
                onClick={prevStep}
              >
                Previous
              </button>
            )}
          </span>
          <button className="text-white bg-blue-500 button" onClick={nextStep}>
            Next
          </button>
        </div>
      );
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="flex flex-col w-[90%]  dark:border-white">
            {/**header */}
            <div className="flex flex-row w-full items-center  justify-between px-6 py-4 bg-white dark:bg-[#393939]  rounded-tr-2xl border-b  rounded-tl-2xl">
              <div className="flex flex-row items-center space-x-6 ">
                <h5 className="font-semibold text-black dark:text-white">
                  Write Blog
                </h5>
              </div>
              <MdClose
                className="text-black cursor-pointer dark:text-white"
                size={25}
                onClick={() => {
                  setResetBlogData(true);
                  close();
                }}
              />
            </div>

            <section className="bg-white dark:bg-[#393939] rounded-md ">
              <div>
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

              {/* Display current step content */}
              <div>{renderStepContent()}</div>
              {/* Render navigation buttons */}
              {renderNavigationButtons()}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

AddInBlogs.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
};

export default AddInBlogs;
