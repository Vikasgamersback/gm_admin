import { useState, useRef, useEffect } from "react";
import { MdClose, MdOutlineEditNote } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import {
  apiList,
  invokeApi,
  invokeFormDataApi,
} from "../../utils/apiServiceUtils";
import responseUtils from "../../utils/responseUtils";
import { config } from "../../utils/configUtils";
import { FaRegTrashCan } from "react-icons/fa6";

const EditGameModal = ({ isGameEditModalOpen, close, editId }) => {
  const tabItems = [
    "Display Photos",
    "Overview",
    "Plot",
    "Awards",
    "Gallary",
    "Creators",
  ];
  const gallaryTabs = ["Photos", "Videos"];
  const creatorsTabs = ["Search", "Users"];
  const [activeGallaryTabs, setActivegallaryTabs] = useState(gallaryTabs[0]);
  
  const [activeCreatorTabs, setactiveCreatorTabs] = useState(creatorsTabs[0]);

  const navigate = useNavigate();
  const [cookies] = useCookies();

  const inputRefGameLogo = useRef();
  const inputRefGameBanner = useRef();
  const inputRefFounderImg = useRef();
  const inputRefGallaryImg = useRef();
  const inputRefVideo = useRef();

  const [gameLogoPreviewFile, setgameLogoPreviewFile] = useState(null);
  const [gameBannerPreviewFile, setgameBannerPreviewFile] = useState(null);
  const [founderImgPrevFile, setfounderImgPrevFile] = useState(null);
  const [gallaryImgPrevFile, setgallaryImgPrevFile] = useState(null);
  const [, setgallaryVidPrevFile] = useState(null);

  const [, setLogoImgFile] = useState(null);
  const [, setBannerImgFile] = useState(null);
  const [, setfounderImgFile] = useState(null);
  const [, setgallaryImgFile] = useState(null);
  const [gallaryVidFile, setgallaryVidImgFile] = useState([]);
  const [resetGameData, setResetGameData] = useState(false);

  const [invokeAddGame, setInvokeAddGame] = useState(false);
  const [invokeGame, setInvokeGame] = useState(true);
  

  const [addGameData, setAddGameData] = useState({
    gameName: "",
    gameDescription: "",
    publishers: "",
    developers: "",
    age: "",
    releseDate: "",
    totalDownloads: "",
    totalUsers: "",
    plotDescription: "",
    status: "",

  });

  const [platform, setPlatform] = useState([]);
  const [platformInputValue,setPlatformInputValue] = useState("")
  const [gerne, setGerne] = useState([]);
  const [awards, setAwards] = useState([]);
  const [newAward, setNewAward] = useState({
    name: "",
    category: "",
    date: "",
  });
  const [editingAwardIndex, setEditingAwardIndex] = useState(null);
  const [gallary, setGallary] = useState({
    images: [],
    videos: [],
  });
  const [gallaryVideoUrl, setgallaryVideoUrl] = useState("");
  
  const [editingFounderIndex, setEditingFounderIndex] = useState(null);
  const [founders, setFounders] = useState([
    {
      name: "",
      designation: "",
      image: "",
    },
  ]);

  const [newFounder, setNewFounder] = useState([{
    name: "",
    designation: "",
    image: "",
  }]);

  const [gameNameError, setgameNameError] = useState("");
  const [gameDescriptionError, setgameDescriptionError] = useState("");
  const [gameLogoError, setgameLogoError] = useState("");
  const [gameBannerError, setgameBannerError] = useState("");
  const [publishersError, setpublishersError] = useState("");
  const [developersError, setdevelopersError] = useState("");
  const [ageError, setageError] = useState("");
  const [releseDateError, setreleseDateError] = useState("");
  const [gerneError, setgerneError] = useState("");
  const [totalDownloadsError, settotalDownloadsError] = useState("");
  const [totalUsersError, settotalUsersError] = useState("");
  const [platformError, setplatformError] = useState("");
  const [plotDescriptionError, setplotDescriptionError] = useState("");
  const [, setPrevieFileError] = useState("");
  const [, setawardsError] = useState({
    nameError: "",
    categoryError: "",
    dateError: "",
  });
  const [, setgallaryError] = useState({
    imagesError: "",
    videosError: "",
  });
  const [foundersError, setfoundersError] = useState({
    nameError: "",
    designationError: "",
    imageError: "",
  });
  const [statusError, setstatusError] = useState("");

  // addAdminChangeHandler
  const addGameChangeHandler = (ev) => {
    setAddGameData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
    
  };
  console.log(addGameData)
  const handleAddPlatForm = (event) => {
    if (event.key === "Enter" && platformInputValue) {
      setPlatform([...platform, platformInputValue]);
      setPlatformInputValue("")
    }
  }

  const handleRemovePlatform = (index) => {
    setPlatform((prevPlatform) => prevPlatform.filter((_, i) => i !== index));
  };

  const handleDeleteVideo = (index) => {
    setGallary((prevGallery) => ({
      ...prevGallery,
      videos: prevGallery.videos.filter((_, i) => i !== index),
    }));
  };

  const handleAddAward = () => {
    if (editingAwardIndex !== null) {
      setAwards((prevAwards) => {
        const updatedAwards = [...prevAwards];
        updatedAwards[editingAwardIndex] = newAward;
        return updatedAwards;
      });
      setEditingAwardIndex(null);
    } else {
      setAwards((prevAwards) => [...prevAwards, newAward]);
    }
    setNewAward({
      name: "",
      category: "",
      date: "",
    });
  };

  const handleEditAward = (index) => {
    const awardToEdit = awards[index];
    setNewAward(awardToEdit);
    setEditingAwardIndex(index);
  };

  const handleDeleteAward = (index) => {
    setAwards((prevAwards) => {
      const updatedAwards = [...prevAwards];
      updatedAwards.splice(index, 1);
      return updatedAwards;
    });
  };

  const handleAddFounder = () => {
    // if (editingFounderIndex !== null) {
    //   setNewFounder((prevFounder) => {
    //     const updateFounder = [...prevFounder];
    //     updateFounder[editingFounderIndex] = newFounder;
    //     return updateFounder;
    //   });
    //   setEditingFounderIndex(null);
    // } else {
    //   setNewFounder((prevFounder) => [...prevFounder, newFounder]);
    // }
      setNewFounder((prevFounders) => {
        if (editingFounderIndex !== null && editingFounderIndex !== undefined) {
          const updatedFounders = [...prevFounders];
          updatedFounders[editingFounderIndex] = founders;
          return updatedFounders;
        } else {
          return [...prevFounders, founders];
        }
      });
      setFounders({ name: "", designation: "", image: "" });
      setEditingFounderIndex(null);
  };

  const handleEditFounder = (index) => {
    const founderToEdit = founders[index];
    setNewFounder({
      name: founderToEdit.name || "",
      designation: founderToEdit.designation || "",
      image: founderToEdit.image || "",
    });
    setEditingFounderIndex(index);
  };

  const handleDeleteFounder = (index) => {
    setNewFounder((prevFounder) => {
      const updateFounder = [...prevFounder];
      updateFounder.splice(index, 1);
      return updateFounder;
    });
  };

  const handleFileUpload = async (
    ev,
    setPreview,
    setError,
    setFile,
    setGameData,
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
            // Image uploaded successfully
            console.log("Image uploaded:", response.data.message);
            setPreview(window.URL.createObjectURL(fileUploaded));
            setError("");
            setFile(fileUploaded);

            // Assuming setGameData is a function to update the state
            setGameData((prev) => ({
              ...prev,
              [type]: response.data.imageUrl,
            }));
            
            toast.success(response.data.message);
            // setInvokeAddGame(true);
          } else {
            // Handle errors
            console.error("Image upload failed:", response.data.message);
            alert("Something went wrong");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Something went wrong");
        }
      }
    }
  };

  const handleLogoFileUpload = (ev) => {
    handleFileUpload(
      ev,
      setgameLogoPreviewFile,
      setPrevieFileError,
      setLogoImgFile,
      setAddGameData,
      "gameLogo"
    );
  };

  const handleBannerFileUpload = (ev) => {
    handleFileUpload(
      ev,
      setgameBannerPreviewFile,
      setPrevieFileError,
      setBannerImgFile,
      setAddGameData,
      "gameBanner"
    );
  };

  const handleGallaryIFileUpload = async (
    ev,
    setPreview,
    setError,
    setFile,
    setGallary,
    
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
            setGallary((prev) => {
              const imagesArray = Array.isArray(prev.images)
                ? [...prev.images]
                : [];
              return {
                ...prev,
                images: [...imagesArray, response.data.imageUrl],
              };
            });

            toast.success(response.data.message);
          } else {
            console.error("Image upload failed:", response.data.message);
            alert("Something went wrong");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Something went wrong");
        }
      }
    }
  };

  const handleGallaryVidIFileUpload = async (
    ev,
    setPreview,
    setError,
    setFile,
    setGallary,
    
  ) => {
    const fileUploaded = ev.target.files[0];
    console.log(fileUploaded);
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^video\/(mp4|ogg|webm)/
    );

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
            setGallary((prev) => {
              const videosArray = Array.isArray(prev.videos)
                ? [...prev.videos]
                : [];
              return {
                ...prev,
                videos: [...videosArray, response.data.imageUrl],
              };
            });

            toast.success(response.data.message);
          } else {
            console.error("Image upload failed:", response.data.message);
            alert("Something went wrong");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Something went wrong");
        }
      }
    }
  };

  const handleGallaryImgUpload = (ev) => {
    handleGallaryIFileUpload(
      ev,
      setgallaryImgPrevFile,
      setPrevieFileError,
      setgallaryImgFile,
      setGallary,
      "images"
    );
  };
  // const handleGallaryVidUpload = (ev) => {
  //   handleGallaryVidIFileUpload(
  //     ev,
  //     setgallaryVidPrevFile,
  //     setPrevieFileError,
  //     setgallaryVidImgFile,
  //     setGallary,
  //     "videos"
  //   );
  // };
  const handleGallaryVidUpload = () => {
    setGallary((prev) => {
      // Ensure that videos is always an array
      return {
        ...prev,
        videos: [...(prev.videos || []), gallaryVideoUrl ],
      };
    });
    setgallaryVideoUrl("")
  };

  const handleFounderImgUpload = async (ev) => {
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
            console.log("Image uploaded:", response.data.message);
            setfounderImgPrevFile(window.URL.createObjectURL(fileUploaded));
            setPrevieFileError("");
            setfounderImgFile(fileUploaded);
            setNewFounder((prev) => [
              {
                ...prev,
                image: response.data.imageUrl,
              },
            ]);
            toast.success(response.data.message);
          } else {
            console.error("Image upload failed:", response.data.message);
            alert("Something went wrong");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Something went wrong");
        }
      }
    }
  };

  useEffect(() => {
    const editGameFunc = async () => {
      let params = {
        ...addGameData,
      };
      params._id = editId;
      params.platform = platform;
      params.genre = gerne;
      params.gallary = gallary;
      params.founders = newFounder;
      params.awards = awards;
      console.log(params)
      const response = await invokeApi(
        config.baseUrl + apiList.editGamepedia,
        params,
        cookies
      );
      console.log(response);
      responseUtils.showToster(response);
      if (response && response.data) {
        if (response.customcode === 200) {
          setResetGameData(true);
          close();
        }
      } else if (response.customcode === 201) {
        navigate("/logout");
      } 
    };
    if (invokeAddGame) {
      setInvokeAddGame(false);
      editGameFunc();
    }
  }, [
    addGameData,
    close,
    editId,
    awards,
    gallary,
    newFounder,
    platform,
    gerne,
    invokeAddGame,
    cookies,
    navigate,
  ]);

  useEffect(() => {
    const getGamepediaDetail = async () => {
      let params = {
        _id: editId,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getGamepediaDetail,
        params,
        cookies
      );
      if (response.customcode === 200) {
        setAddGameData({
          gameName: response.data.gameName,
          gameDescription: response.data.gameDescription,
          publishers: response.data.publishers,
          developers: response.data.developers,
          age: response.data.age,
          releseDate: response.data.releseDate,
          totalDownloads: response.data.totalDownloads,
          totalUsers: response.data.totalUsers,
          plotDescription: response.data.plotDescription,
          status: response.data.status,
        });
        setGerne(response.data.genre);
        setPlatform(response.data.platform);
        setgameLogoPreviewFile(response.data.gameLogo);
        setgameBannerPreviewFile(response.data.gameBanner);

        // Update awards state
        setAwards(
          response.data.awards.map((el) => ({
            name: el.name,
            category: el.category,
            date: el.date,
          }))
        );
        // Update gallary state
        setGallary({
          images: [...gallary.images, ...response.data.gallery.images],
          videos: [...gallary.videos, ...response.data.gallery.videos],
        });

        // // Update founders state
        // let copyFounders = [...founders];
        // response.data.founders.map((el) =>
        //   copyFounders.push({
        //     image: el.image,
        //     name: el.name,
        //     designation: el.designation,
        //   })
        // );
        setNewFounder(
          response.data.founders.map((el) => ({
            name: el.name,
            designation: el.designation,
            image: el.image,
          }))
        );
      }
    };

    if (invokeGame) {
      setInvokeGame(false);
      getGamepediaDetail();
    }
  }, [cookies, editId, navigate, invokeGame]);

  useEffect(() => {
    const resetAddGameData = () => {
      setgameLogoPreviewFile(null);
      setgameBannerError("");
      setgameLogoError("");
    };
    if (resetGameData) {
      setResetGameData(false);
      resetAddGameData();
    }
  }, [resetGameData]);

  // multi step form
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
        if (addGameData.gameLogo === "") {
          setgameLogoError("This field is required");
          isValid = false;
        } else {
          setgameLogoError("");
        }
        if (addGameData.gameBanner === "") {
          setgameBannerError("This field is required");
          isValid = false;
        } else {
          setgameBannerError("");
        }
        return isValid;
      }
      case 2: {
        let isValid = true;
        if (!addGameData.gameName) {
          setgameNameError("Game Name is required");
          isValid = false;
        } else {
          setgameNameError("");
        }

        if (!addGameData.developers) {
          setdevelopersError("Developers is required");
          isValid = false;
        } else {
          setdevelopersError("");
        }
        if (!addGameData.publishers) {
          setpublishersError("Publishers are required");
          isValid = false;
        } else {
          setpublishersError("");
        }
        if (!addGameData.age) {
          setageError("Age is required");
          isValid = false;
        } else {
          setageError("");
        }
        if (platform.length === 0) {
          setplatformError("platforms are required");
          isValid = false;
        } else {
          setplatformError("");
        }
        if (gerne.length === 0) {
          setgerneError("Gerne are required");
          isValid = false;
        } else {
          setgerneError("");
        }
        if (addGameData.releseDate === "") {
          setreleseDateError("Release date is required");
          isValid = false;
        } else {
          setreleseDateError("");
        }
        if (addGameData.totalUsers === "") {
          settotalUsersError("Total users are required");
          isValid = false;
        } else {
          settotalUsersError("");
        }
        if (addGameData.totalDownloads === "") {
          settotalDownloadsError("Total Downloads are required");
          isValid = false;
        } else {
          settotalDownloadsError("");
        }
        if (!["ACTIVE", "INACTIVE"].includes(addGameData.status)) {
          setstatusError("Status should be ACTIVE or INACTIVE");
          isValid = false;
        } else {
          setstatusError("");
        }
        if (addGameData.gameDescription === "") {
          setgameDescriptionError("Game Description is required");
          isValid = false;
        } else {
          setgameDescriptionError("");
        }
        return isValid;
      }
      case 3: {
        if (!addGameData.plotDescription) {
          setplotDescriptionError("This field is required");
          return false;
        } else {
          setplotDescriptionError("");
          return true;
        }
      }

      case 4: {
        if (awards.length === 0) {
          setawardsError("This field is required");
          return false;
        } else {
          setawardsError(""); // Reset error if the validation passes
          return true; // Validation passed
        }
      }
      case 5: {
        if (addGameData.gallery === "") {
          setgallaryError("This field is required");
          return false;
        } else {
          setgallaryError(""); // Reset error if the validation passes
          return true; // Validation passed
        }
      }
      case 6: {
        if (founders.length === 0) {
          setfoundersError({
            designationError: "This feild is required",
            imageError: "This feild is required",
            nameError: "This feild is required",
          });
          return false;
        } else {
          setfoundersError({
            designationError: "",
            imageError: "",
            nameError: "",
          });
          return true;
        }
      }
      default: {
        return null;
      }
    }
  };

  const handleSubmit = () => {
    setInvokeAddGame(true);
    setResetGameData(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {/**Display photos */}
            <div className="p-3 flex space-x-10 items-center dark:text-white">
              <div className="flex-col gap-4 items-center">
                {/** gamelogo upload */}
                <label
                  htmlFor="gameLogo"
                  className=" flex flex-col items-center gap-[20px] cursor-pointer justify-center border-dashed border-2 p-[1.5rem] rounded-[10px] shadow-[0px 48px -48px #e8e8e8]"
                >
                  <div className="flex items-center justify-center flex-col">
                    {gameLogoPreviewFile ? (
                      <img
                      src={gameLogoPreviewFile}
                      alt="gameLogoPreview"
                      className="w-44 h-44 object-cover rounded"
                      />
                    ) : (
                      <img
                      src="/assets/png/image-upload.png"
                      alt="Upload Image Placeholder"
                      className="w-full h-full object-cover rounded"
                      />
                    )}
                    <p className="text-red-500">
                      {gameLogoError ? gameLogoError : ""}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      className="bg-blue-500 button font-normal text-white border-none"
                      onClick={() => inputRefGameLogo.current.click()}
                    >
                      {gameLogoPreviewFile ? "Change" : "Upload"}
                    </button>
                  </div>
                  <input
                    id="gameLogo"
                    type="file"
                    ref={inputRefGameLogo}
                    accept="image/*"
                    onChange={handleLogoFileUpload}
                    style={{ display: "none" }}
                    required
                  />
                </label>
                <div className="w-28 pt-2">Game Logo</div>
              </div>

              <div className="flex-col gap-4 items-center">
                
                {/**banner upload */}
                <label
                  htmlFor="gameBanner"
                  className="  flex flex-col  items-center gap-[20px] cursor-pointer justify-center border-dashed  border-2 p-[1.5rem] rounded-[10px] shadow-[0px 48px -48px #e8e8e8]"
                >
                  <div className="flex items-center justify-center flex-col">
                    {gameBannerPreviewFile ? (
                      <img
                        src={gameBannerPreviewFile}
                        alt=""
                        className="w-44 h-44 object-cover rounded"
                      />
                    
                    ) : (
                      <img
                        src="/assets/png/image-upload.png"
                        alt="Upload Image Placeholder"
                        className="w-full h-full object-cover rounded"
                      />
                    )}

                    <p className="text-red-500">{gameBannerError}</p>
                  </div>
                  <div className=" flex justify-center items-center">
                    <button
                      onClick={() => inputRefGameBanner.current.click()}
                      className=" bg-blue-500 button font-normal text-white border-none"
                    >
                      {gameBannerPreviewFile ? "Change" : "Upload"}
                    </button>
                  </div>
                  <input
                    id="gameBanner"
                    type="file"
                    ref={inputRefGameBanner}
                    onChange={handleBannerFileUpload}
                    style={{ display: "none" }}
                    required
                  />
                </label>
                <div className="w-28 pt-2">Game Banner</div>
                {/**upload */}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/**Overview */}
            <div className="flex flex-col px-3 py-3 space-y-3 space-x-5">
              <div className="flex items-center ">
                <label className="w-44 dark:text-white">Game Name</label>
                <input
                  type="text"
                  name="gameName"
                  value={addGameData.gameName}
                  className=" px-3 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setgameNameError("");
                  }}
                  placeholder={gameNameError ? gameNameError : ""}
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Developer</label>
                <input
                  type="text"
                  name="developers"
                  value={addGameData.gameDescription}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setdevelopersError("");
                  }}
                  placeholder={developersError ? developersError : ""}
                  className="border px-3 py-2 placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Publisher</label>
                <input
                  type="text"
                  name="publishers"
                  value={addGameData.publishers}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setpublishersError("");
                  }}
                  placeholder={publishersError ? publishersError : ""}
                  className="border w-full px-3 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Age</label>
                <input
                  type="text"
                  name="age"
                  value={addGameData.age}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setageError("");
                  }}
                  placeholder={ageError ? ageError : ""}
                  className="border w-full px-3 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Platform</label>
                <div className="w-full">
                <input
                  type="text"
                  name="platform"
                  value={platformInputValue}
                  onChange={(e) => {
                    setPlatformInputValue(e.target.value)
                  }}
                  onKeyDown={handleAddPlatForm}
                  placeholder={platformError ? platformError : ""}
                  className="border w-full px-3 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
                {platform.length !== 0 &&
                 <div className="flex flex-wrap gap-2 mt-2 z-10">
                  {platform.map((platform, index) => (
                    <span
                      key={index}
                      className="flex items-center bg-gray-200 px-2 py-1 rounded"
                    >
                      <span>{platform}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePlatform(index)}
                        className="ml-2 text-red-500 focus:outline-none"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  </div>}
                  </div>
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Genre</label>
                <input
                  type="text"
                  name="gerne"
                  value={gerne}
                  onChange={(e) => {
                    let copy = [...gerne];
                    copy[0] = e.target.value;
                    setGerne(copy);
                  }}
                  placeholder={gerneError ? gerneError : ""}
                  className="border w-full px-3 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center justify-between ">
                <label className="w-36 dark:text-white">Release Date</label>
                <div className="w-full">
                  <input
                    type="date"
                    name="releseDate"
                    value={addGameData.releseDate}
                    onChange={(ev) => {
                      addGameChangeHandler(ev);
                      setreleseDateError("");
                    }}
                    placeholder={releseDateError ? releseDateError : ""}
                    className="border w-full px-3 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                  />
                </div>
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Users</label>
                <input
                  type="text"
                  name="totalUsers"
                  value={addGameData.totalUsers}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    settotalUsersError("");
                  }}
                  placeholder={totalUsersError ? totalUsersError : ""}
                  className="border w-full px-3 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Downloads</label>
                <input
                  type="text"
                  name="totalDownloads"
                  value={addGameData.totalDownloads}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    settotalDownloadsError("");
                  }}
                  placeholder={totalDownloadsError ? totalDownloadsError : ""}
                  className="border w-full px-3 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Status</label>
                <input
                  type="text"
                  name="status"
                  value={addGameData.status}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setstatusError("");
                  }}
                  placeholder={statusError ? statusError : ""}
                  className="border w-full px-3 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Summary</label>
                <textarea
                  type="text"
                  name="gameDescription"
                  value={addGameData.gameDescription}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setgameDescriptionError("");
                  }}
                  placeholder={gameDescriptionError ? gameDescriptionError : ""}
                  className="border w-full px-3 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            {/**Plot */}
            <div className="flex flex-row space-x-10 px-5 py-3 space-y-3 items-start">
              <p className="dark:text-white text-xl font-semibold">Plot</p>
              <textarea
                type="text"
                name="plotDescription"
                value={addGameData.plotDescription}
                onChange={(ev) => {
                  addGameChangeHandler(ev);
                  setplotDescriptionError("");
                }}
                placeholder={plotDescriptionError ? plotDescriptionError : ""}
                className="w-full h-80 border placeholder-red-600 dark:bg-[#242424] dark:border-none outline-none dark:text-white rounded-lg px-3 py-3"
              />
            </div>
          </>
        );
      case 4:
        return (
          <>
            {/**Awards */}

            <div className="">
              <div className="px-3 py-3 space-x-5 flex justify-between">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={newAward.name}
                  onChange={(e) =>
                    setNewAward((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="outline-none bg-transparent py-1 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-1"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={newAward.category}
                  onChange={(e) =>
                    setNewAward((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="outline-none bg-transparent py-1 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-1"
                />
                <input
                  type="date"
                  name="date"
                  placeholder="Year"
                  value={newAward.date}
                  onChange={(e) =>
                    setNewAward((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="outline-none bg-transparent py-1 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-1"
                />
                <button
                  onClick={handleAddAward}
                  className="button bg-blue-600 text-white border-none"
                >
                  {editingAwardIndex !== null ? "Update" : "Add"}
                </button>
              </div>
              <div className="">
                <div className="dark:bg-[#242424] py-3 px-3 dark:text-white">
                  {awards.length > 0 &&
                    awards.map((item, index) => (
                      <div key={index} className="flex justify-around">
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.date}</p>
                        <MdOutlineEditNote
                          size={30}
                          className="hover:text-green-600 cursor-pointer"
                          onClick={() => handleEditAward(index)}
                        />
                        <FaRegTrashCan
                          size={20}
                          className="hover:text-red-600 cursor-pointer"
                          onClick={() => handleDeleteAward(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            {/**gallery */}
            <div>
              <ul className="flex px-3 py-3">
                {gallaryTabs.map((tab) => (
                  <li
                    key={tab}
                    className={`flex-1 button text-center font-montserrat py-3 cursor-pointer space-x-4 border-b-4 ${
                      activeGallaryTabs === tab
                        ? "dark:bg-white   font-bold"
                        : "border-transparent w-16 dark:text-white"
                    } hover:border-blue-500 transition duration-300`}
                    onClick={() => setActivegallaryTabs(tab)}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
              {activeGallaryTabs === "Photos" && (
                <div className="flex items-center justify-center px-4 py-4">
                  <div className="flex gap-x-10 items-center">
                    <div className="border-dashed border-2 flex items-center flex-col justify-center space-y-3 rounded-md px-3 py-3 w-96 h-60">
                      <label htmlFor="images">
                        {gallaryImgPrevFile ? (
                          <img
                            src={gallaryImgPrevFile}
                            alt="image upload"
                            className="w-44 h-44 object-cover rounded"
                          />
                        ) : (
                          <img
                            src="/assets/png/image-upload.png"
                            alt="image upload"
                          />
                        )}
                        <input
                          type="file"
                          className="hidden"
                          id="images"
                          accept="image/*"
                          onChange={handleGallaryImgUpload}
                          style={{ display: "none" }}
                          ref={inputRefGallaryImg}
                          required
                        />
                        <button
                          className="button bg-blue-500 text-white border-none"
                          onClick={() => inputRefGallaryImg.current.click()}
                        >
                          Upload Photo
                        </button>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {activeGallaryTabs === "Videos" && (
                <div className="flex flex-col items-center justify-center px-10 py-4 w-full">
                  <div className="flex flex-grow items-center space-x-6 w-full">
                    <input
                      type="text"
                      placeholder={
                        "Video url"
                      }
                      name="vidoe"
                      value={gallaryVideoUrl}
                      onChange={(e) =>
                        setgallaryVideoUrl(e.target.value)
                      }
                      className="outline-none bg-transparent py-1 placeholder-red-500 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px] w-full"
                    />


                    <button
                      onClick={handleGallaryVidUpload}
                      className="button bg-blue-600 text-white border-none"
                    >
                     Add
                    </button>
                  </div>
                  <div className="w-full pt-4">
                  {gallary.videos && gallary.videos?.map((item, index) => (
                    <div key={index} className="w-full flex justify-between flex-grow gap-6 items-center py-2 dark:border-gray-700 text-white" >
                      <p className="font-semibold text-white w-full">{item}</p>
                      <button className=" p-2" onClick={() => handleDeleteVideo(index)} >
                      <FaRegTrashCan
                        size={20}
                        className="hover:text-red-600 cursor-pointer"
                      />
                      </button>
                    </div>
                  ))}
                  </div>
              </div>
              )}
            </div>
          </>
        );
      case 6:
        return (
          <>
            {/**Creators */}
            <div>
              <ul className="flex px-3 py-3">
                {creatorsTabs.map((tab) => (
                  <li
                    key={tab}
                    className={`flex-1 button text-center font-montserrat py-3 cursor-pointer space-x-4 border-b-4 ${
                      activeCreatorTabs === tab
                        ? "dark:bg-white   font-bold"
                        : "border-transparent w-16 dark:text-white"
                    } hover:border-blue-500 transition duration-300`}
                    onClick={() => setactiveCreatorTabs(tab)}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
              {activeCreatorTabs === "Search" && (
                <div>
                  <div className="flex  px-4 py-4">
                    <input
                      type="text"
                      placeholder="Search"
                      className="outline-none bg-transparent py-1 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-1"
                    />
                    <button className="button bg-blue-600 text-white border-none">
                      Add
                    </button>
                  </div>
                </div>
              )}
              {activeCreatorTabs === "Users" && (
                <div>
                  <div className="flex  px-4 py-4 items-end space-x-10">
                    <input type="file" className="hidden" />
                    <label htmlFor="founderImg">
                      <div className="flex-2">
                        {founderImgPrevFile ? (
                          <img
                            src={founderImgPrevFile}
                            alt="Founder Image"
                            className="w-44 h-44 object-cover rounded"
                          />
                        ) : (
                          <img
                            src="/assets/png/image-upload.png"
                            alt="image upload"
                          />
                        )}
                        <p className="text-red-500">
                          {foundersError.imageError ? foundersError : ""}
                        </p>
                        <button
                          className="button bg-blue-500 text-white border-none"
                          onClick={() => inputRefFounderImg.current.click()}
                        >
                          {founderImgPrevFile ? "Change" : "Upload"}
                        </button>
                      </div>
                      <input
                        type="file"
                        id="founderImg"
                        ref={inputRefFounderImg}
                        accept="image/*"
                        value={newFounder.image}
                        onChange={handleFounderImgUpload}
                        style={{ display: "none" }}
                        required
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={founders.name}
                      onChange={(e) =>
                        setFounders((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="outline-none bg-transparent py-1 dark:text-[#FFFFFF] flex-1 border-b-[#707070] border-b-[2px]  w-full me-1"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      name="designation"
                      value={founders.designation}
                      onChange={(e) =>
                        setFounders((prev) => ({
                          ...prev,
                          designation: e.target.value,
                        }))
                      }
                      className="outline-none bg-transparent py-1 dark:text-[#FFFFFF] flex-1 border-b-[#707070] border-b-[2px]  w-full me-1"
                    />
                    <button
                      className="button  h-10 w-32 bg-blue-600 text-white border-none"
                      onClick={handleAddFounder}
                    >
                      {editingFounderIndex !== null ? "Update" : "Add"}
                    </button>
                  </div>
                </div>
              )}
              <p className="dark:bg-[#242424] py-3 px-3 dark:text-white">
                Creators Added
              </p>
              <div className="px-3 py-3 dark:text-white flex flex-col gap-4">
                {newFounder.length > 0 &&
                  newFounder.map((item, index) => (
                    <div key={index} className="flex justify-around">
                      <img src={item.image} className="w-10 h-10" />
                      <p>{item.name}</p>
                      <p>{item.designation}</p>
                      <div className="flex space-x-3 items-center">
                        <MdOutlineEditNote
                          size={30}
                          className="hover:text-green-600 cursor-pointer"
                          onClick={() => handleEditFounder(index)}
                        />
                        <FaRegTrashCan
                          size={20}
                          className="hover:text-red-600 cursor-pointer"
                          onClick={() => handleDeleteFounder(index)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  //buttons
  const renderNavigationButtons = () => {
    if (currentStep === tabItems.length) {
      // Last step - render a different action (e.g., submit button)
      return (
        <div className="flex justify-end">
          <button
            className="button bg-blue-500 text-white flex  my-3 mx-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      );
    } else {
      // Render "Previous" and "Next" buttons for other steps
      return (
        <div className="flex justify-between px-5 py-3">
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
      {isGameEditModalOpen && (
        <div className="fixed z-50 inset-0 bg-opacity-60 bg-black  flex justify-center items-center">
          <div className="flex flex-col w-[90%]  dark:border-white">
            {/**header */}
            <div className="flex flex-row w-full items-center  justify-between px-6 py-4 bg-white dark:bg-[#393939]  rounded-tr-2xl border-b  rounded-tl-2xl">
              <div className="flex flex-row items-center space-x-6 ">
                <h5 className="text-black font-semibold dark:text-white">
                  Add Game
                </h5>
              </div>
              <MdClose
                className="cursor-pointer text-black dark:text-white"
                size={25}
                onClick={() => {
                  setResetGameData(true);
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


EditGameModal.propTypes = {
  isGameEditModalOpen: PropTypes.bool.isRequired,
  close: PropTypes.func,
  editId: PropTypes.any,
};


export default EditGameModal;
