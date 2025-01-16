import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../utils/apiServiceUtils";
import { config } from "../../utils/configUtils";
import responseUtils from "../../utils/responseUtils.js";
import { InputComponent } from "../general-components/InputComponent.jsx";
import PropTypes from 'prop-types';


const EditJobModal = ({ open, close, editId }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [resetJobData, setResetJobData] = useState(false);
  const [invokeGetJobDetails] = useState(true);
  const [invokeEditJob, setInvokeEditJob] = useState(false);
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");

  const tabItems = [
    // "Basic Information",
    // "Description",
    // "Requirements",
    // "Responsibilities",
  ];

  const [addJobData, setAddJobData] = useState({
    title: "",
    aboutJob: "",
    workType: "",
    jobType: "",
    status: "",
    description: "",
    resposibilities: "",
    requirements: "",
  });


  const [addJobDataErrors, setAddJobDataErrors] = useState({
    titleError: "",
    descriptionError: "",
    aboutJobError: "",
    resposibilitiesError: "",
    requirementsError: "",
    workTypeError: "",
    jobTypeError: "",
    statusError: "",
  });

  // addAdminChangeHandler
  const addJobChangeHandler = (ev) => {
    setAddJobData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };
  const addJobChangeHandler1 = (ev, params) => {
    setAddJobData((prev) => ({
      ...prev,
      [params]: ev,
    }));
  };
  useEffect(() => {
    const editJob = async () => {
      try {
        let params = {
          ...addJobData,
        };
        params._id = editId;
        let response = await invokeApi(
          config.baseUrl + apiList.editJob,
          params,
          cookies
        );
        responseUtils.showToster(response);
        if (response && response.data) {
          if (response.customcode === 200) {
            setResetJobData(true);
            close();
          }
        } else if (response.customcode === 201) {
          navigate("/logout");
        } else {
          alert("Something went wront while adding Job");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (invokeEditJob) {
      setInvokeEditJob(false);
      editJob();
    }
  }, [
    cookies,
    invokeEditJob,
    navigate,
    addJobData,
    editId,
    close
  ]);

  useEffect(() => {
    const getJobDetail = async () => {
      let params = { _id: editId };
      let response = await invokeApi(
        config.baseUrl + apiList.getJobDetail,
        params,
        cookies
      );

      if (response.customcode === 200) {
        setAddJobData({
          title: response.data.title,
          aboutJob: response.data.aboutJob,
          jobType: response.data.jobType,
          status: response.data.status,
          workType: response.data.workType,
          description: response.data.description,
          requirements: response.data.requirements,
          resposibilities: response.data.resposibilities,
        });
     
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wront while getting Job details");
      }
    };
    if (invokeGetJobDetails) {
      getJobDetail();
    }
  }, [editId]);

  useEffect(() => {
    const resetJobDataFun = () => {
      setAddJobData({
        aboutJob: "",
        title: "",
        status: "",
        workType: "",
        jobType: "",
        description:"",
        requirements:"",
        resposibilities:"",
      });
      
    };
    if (resetJobData) {
      setResetJobData(false);
      resetJobDataFun();
    }
  }, [resetJobData]);

  const [currentStep, setCurrentStep] = useState(1);
 
  const handleSubmit = () => {
    setInvokeEditJob(true);
  };
  const handleCancel = () => {
    close();
  };
  const dropdownOptions1 = [
    { label: "Select job type", value: "" },
    { label: "FULLTIME", value: "FULLTIME" },
    { label: "PARTTIME", value: "PARTTIME" },
    
  ];
  const dropdownOptions2 = [
    { label: "Select work type", value: "" },
    { label: "REMOTE", value: "REMOTE" },
    { label: "WFO", value: "WFO" },
    { label: "WFH", value: "WFH" },
  ];
  const dropdownOptions3 = [
    { label: "Select status", value: "" },
    { label: "ACTIVE", value: "ACTIVE" },
    { label: "INACTIVE", value: "INACTIVE" },
  ];

  const validateCurrentStep = () => {
 
    let isValid = true;
    if (!addJobData.title) {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        titleError: "Job title is Required",
      }));
      isValid = false;
    } else {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        titleError: "",
      }));
    }
    if (!["REMOTE", "WFO", "WFH"].includes(addJobData.jobType)) {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        jobTypeError: "Job type should be either REMOTE, WHO, HYBRID",
      }));

      isValid = false;
    } else {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        jobTypeError: "",
      }));
    }
    if (!["ACTIVE", "INACTIVE"].includes(addJobData.status)) {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        statusError: "Job status should be either ACTIVE or INANCTIVE",
      }));

      isValid = false;
    } else {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        statusError: "",
      }));
    }
    if (!["PARTTIME", "FULLTIME"].includes(addJobData.workType)) {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        workTypeError: "work type is should be eithere PARTTIME or FULLTIME",
      }));

      isValid = false;
    } else {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        workTypeError: "",
      }));
    }
    if (!addJobData.aboutJob) {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        aboutJobError: "AboutJob is required",
      }));

      isValid = false;
    } else {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        aboutJobError: "",
      }));
    }

    if (!addJobData.description) {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        descriptionError: "Job Description is  required",
      }));
      isValid = false;
    } else {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        descriptionError: "",
      }));
    }
   
    if (!addJobData.requirements) {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        requirementsError: "Job requirements is  required",
      }));
      isValid = false;
    } else {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        requirementsError: "",
      }));
    }
  
    if (!addJobData.resposibilities) {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        resposibilitiesError: "Job responsibiltites is  required",
      }));
      isValid = false;
    } else {
      setAddJobDataErrors((prevErrors) => ({
        ...prevErrors,
        resposibilitiesErrors: "",
      }));
    }
    return isValid;
  
  };

  //buttons
  const renderNavigationButtons = () => {
    return (
      <div className="flex justify-between">
        <button
          type="button"
          className="button bg-gray-500 text-white flex my-3 mx-4"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="button bg-blue-500 text-white flex my-3 mx-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  };

  const renderStepContent = () => {
    // switch (currentStep) {
    //  case 1:
    return (
      <>
        <div className="flex flex-col  px-3 py-3 space-y-3 space-x-5">
          <div className="flex  space-y-3 flex-col px-10 ">
            <div className="flex  space-y-3 flex-col px-10">
             
              <InputComponent
                label={"Title"}
                name={"title"}
                value={addJobData.title}
                onChange={(ev) => {
                  addJobChangeHandler(ev);
                  setAddJobDataErrors({
                    titleError: "",
                  });
                }}
                placeholder={
                  addJobDataErrors.titleError ? addJobDataErrors.titleError : ""
                }
              />
            </div>

            <div className="flex  space-y-3 flex-col px-10">
              <InputComponent
                label={"Description"}
                name={"description"}
                value={addJobData.description}
                textarea={true}
                onChange={(ev) => {
                  addJobChangeHandler(ev);
                  setAddJobDataErrors({
                    descriptionError: "",
                  });
                }}
                placeholder={
                  addJobDataErrors.descriptionError
                    ? addJobDataErrors.descriptionError
                    : "Enter the job description..."
                }
              />
            </div>
           
            
            <div className="flex  space-y-3 flex-col px-10">
              <InputComponent
                label={"Job type"}
                name={"jobType"}
                value={addJobData.jobType}
                dropdown={true}
                options={dropdownOptions1}
                onChange={(ev) => {
                  addJobChangeHandler(ev);
                  setAddJobDataErrors({
                    jobTypeError: "",
                  });
                }}
                placeholder={
                  addJobDataErrors.jobTypeError
                    ? addJobDataErrors.jobTypeError
                    : ""
                }
              />
             
            </div>
            <div className="flex  space-y-3 flex-col px-10">
            
                
              <InputComponent
                label={"Work Type"}
                name={"workType"}
                value={addJobData.workType}
                dropdown={true}
                options={dropdownOptions2}
                onChange={(ev) => {
                  addJobChangeHandler(ev);
                  setAddJobDataErrors({
                    workTypeError: "",
                  });
                }}
                placeholder={
                  addJobDataErrors.workTypeError
                    ? addJobDataErrors.workTypeError
                    : ""
                }
              />
            </div>
            <div className="flex space-y-3 flex-col px-10">
              <InputComponent
                label={"About Job"}
                name={"aboutJob"}
                value={addJobData.aboutJob}
                textarea={true}
                onChange={(ev) => {
                  addJobChangeHandler(ev);
                  setAddJobDataErrors({
                    aboutJobError: "",
                  });
                }}
                placeholder={
                  addJobDataErrors.aboutJobError
                    ? addJobDataErrors.aboutJobError
                    : ""
                }
              />
            </div>
           
            <div className="flex space-y-3 flex-col px-10">
                  <InputComponent
                    label={"Status"}
                    name={"status"}
                    dropdown={true}
                    value={addJobData.status}
                    options={dropdownOptions3}
                    onChange={(ev) => {
                      addJobChangeHandler(ev);
                      setAddJobDataErrors({
                        statusError: "",
                      });
                    }}
                    placeholder={
                      addJobDataErrors.statusError
                        ? addJobDataErrors.statusError
                        : ""
                    }
                  />
                </div>
            <div className="flex  space-y-3 flex-col px-10 ">
            <InputComponent
                      richTextEditor={true}
                      setData={(ev) => {
                        addJobChangeHandler1(ev, "requirements");
                      }}
                      label={"Requirements"}
                      name={"requirements"}
                      value={addJobData.requirements}
                      placeholder={
                        addJobDataErrors.requirementsError
                          ?  addJobDataErrors.requirementsError
                          : ""
                      }
                    />
            </div>
            <div className="flex  space-y-3 flex-col px-10">
              <InputComponent
                richTextEditor={true}
                label={"Resposibilities"}
                name={"resposibilities"}
                value={addJobData.resposibilities}
                setData={(ev) => {
                  addJobChangeHandler1(ev, "resposibilities");
                }}
                placeholder={
                  addJobDataErrors.resposibilitiesError
                    ? addJobDataErrors.resposibilitiesError
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </>
    );
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
                Edit Job
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


EditJobModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
  editId: PropTypes.any,
};

export default EditJobModal;
