import { useState, useRef, useEffect } from "react";
import { MdClose, MdOutlineEditNote } from "react-icons/md";
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
import { FaRegTrashCan } from "react-icons/fa6";
import { InputComponent } from "../general-components/InputComponent";

const AddGameModal = ({ open, close }) => {
  const tabItems = [
    "Display Photos",
    "Overview",
    "Plot",
    "Awards",
    "Gallary",
    "Creators",
  ];
  const gallaryTabs = ["Photos", "Videos"];
  // const creatorsTabs = ["Search", "Users"];
  const creatorsTabs = ["user"];
  const [activeGallaryTabs, setActivegallaryTabs] = useState(gallaryTabs[0]);

  const [activeCreatorTabs, setactiveCreatorTabs] = useState(creatorsTabs[0]);

  const navigate = useNavigate();
  const [cookies] = useCookies();

  const inputRefGameLogo = useRef();
  const inputRefGameBanner = useRef();
  const inputRefFounderImg = useRef();
  const inputRefGallaryImg = useRef();
  const inputRefVideo = useRef();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [gameLogoPreviewFile, setgameLogoPreviewFile] = useState(null);
  const [gameBannerPreviewFile, setgameBannerPreviewFile] = useState(null);
  const [founderImgPrevFile, setfounderImgPrevFile] = useState(null);
  const [gallaryImgPrevFile, setgallaryImgPrevFile] = useState(null);
  const [, setgallaryVidPrevFile] = useState(null);

  const [logoImgFile, setLogoImgFile] = useState(null);
  const [bannerImgFile, setBannerImgFile] = useState(null);
  const [, setfounderImgFile] = useState(null);
  const [, setgallaryImgFile] = useState(null);
  const [gallaryVideoUrl, setgallaryVideoUrl] = useState("");
  const [resetGameData, setResetGameData] = useState(false);

  const [invokeAddGame, setInvokeAddGame] = useState(false);

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
    status: "ACTIVE",
    genre: "",
  });
  const [platform, setPlatform] = useState([]);
  const [genre, setGenre] = useState([]);
  const [awards, setAwards] = useState([]);
  const [newAward, setNewAward] = useState({
    name: "",
    category: "",
    date: "",
  });
  const [newGallaryImg, setNewGallaryImg] = useState({
    videos: [],
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [gallery, setGallery] = useState({
    images: [],
    videos: [],
  });
  const [galleryImg,setGalleryImg] = useState(null)
  const [founders, setFounders] = useState([
    
  ]);

  const [editingFounderIndex, setEditingFounderIndex] = useState(null);
  const [newFounder, setNewFounder] = useState({
    name: "",
    designation: "",
    image: "",
  });

  const [gameNameError, setgameNameError] = useState("");
  const [gameDescriptionError, setgameDescriptionError] = useState("");
  const [gameLogoError, setgameLogoError] = useState("");
  const [gameBannerError, setgameBannerError] = useState("");
  const [publishersError, setpublishersError] = useState("");
  const [developersError, setdevelopersError] = useState("");
  const [ageError, setageError] = useState("");
  const [releseDateError, setreleseDateError] = useState("");
  const [genreError, setgenreError] = useState("");
  const [totalDownloadsError, settotalDownloadsError] = useState("");
  const [totalUsersError, settotalUsersError] = useState("");
  const [platformError, setplatformError] = useState("");
  const [plotDescriptionError, setplotDescriptionError] = useState("");
  const [, setPrevieFileError] = useState("");
  const [awardsError, setawardsError] = useState({
    nameError: "",
    categoryError: "",
    dateError: "",
  });
  const [galleryError, setgalleryError] = useState({
    imagesError: "",
    videosError: "",
  });

  const [foundersError, setFoundersError] = useState({
    nameError: "",
    designationError: "",
    imageError: "",
  });
  const [statusError, setstatusError] = useState("");
  const [founderImg,setFounderImg] = useState()
  //for gallary
  const [gallaryImgPrevFiles, setGallaryImgPrevFiles] = useState([]);
  const [gallaryVidFiles, setGallaryVidFiles] = useState([]);

  
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (ev) => {
    const key = ev.key || ev.keyCode;

    if (key === "Enter" || key === 13) {
      ev.preventDefault();

      if (inputValue.trim() !== "") {
        setSelectedPlatforms([...selectedPlatforms, inputValue.trim()]);
        setInputValue("");
      } else {
        setplatformError("Input cannot be empty");
      }
    }
  };

  

  function scrollContainer(id, scrollOffset) {
    const container = document.getElementById(id);
    container.scrollLeft += scrollOffset;
  }

  // addAdminChangeHandler
  const addGameChangeHandler = (ev) => {
    setAddGameData((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };
  const handleAddAward = () => {
    if (editingIndex !== null) {
      setAwards((prevAwards) => {
        const updatedAwards = [...prevAwards];
        updatedAwards[editingIndex] = newAward;
        return updatedAwards;
      });
      setEditingIndex(null);
    } else {
      setAwards((prevAwards) => [...prevAwards, newAward]);
    }
    setNewAward({
      name: "",
      category: "",
      date: "",
    });
  };

  const handleAddPlatform = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      // Add the genre to the list of genres
      setPlatform([...platform, event.target.value.trim()]);
      // Clear the input
      event.target.value = "";
    }
  };
  const handleRemovePlatform = (index) => {
    setPlatform((prevPlatform) => prevPlatform.filter((_, i) => i !== index));
  };

  const handleEditAward = (index) => {
    const awardToEdit = awards[index];
    setNewAward(awardToEdit);
    setEditingIndex(index);
  };

  const handleDeleteAward = (index) => {
    setAwards((prevAwards) => {
      const updatedAwards = [...prevAwards];
      updatedAwards.splice(index, 1);
      return updatedAwards;
    });
  };

  const handleAddFounder = () => {
    const { name, designation, image } = newFounder;

    // Check if all fields are provided
    if (!name || !designation || !image) {
      setFoundersError({
        nameError: !name ? "Name is required" : "",
        designationError: !designation ? "Role is required" : "",
        imageError: !image ? "Image is required" : "",
      });
      return;
    }

    // Add or update the founder
    setFounders((prevFounders) => {
      if (editingFounderIndex !== null && editingFounderIndex !== undefined) {
        const updatedFounders = [...prevFounders];
        updatedFounders[editingFounderIndex] = newFounder;
        return updatedFounders;
      } else {
        return [...prevFounders, newFounder];
      }
    });

    // Clear the form and reset error messages
    setNewFounder({ name: "", designation: "", image: "" });
    setEditingFounderIndex(null);
    setFoundersError({ nameError: "", designationError: "", imageError: "" });
    setfounderImgPrevFile(null);
  };

  const handleEditFounder = (index) => {
    setNewFounder(founders[index]);
    setEditingFounderIndex(index);
    setfounderImgPrevFile(founders[index].image);
  };

  const handleDeleteFounder = (index) => {
    setFounders((prevFounders) => prevFounders.filter((_, i) => i !== index));
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
            setPreview(window.URL.createObjectURL(fileUploaded));
            setError("");
            setFile(fileUploaded);
            setGameData((prev) => ({
              ...prev,
              [type]: response.data.imageUrl,
            }));

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
  const handleGalleryFileUpload = (ev) => {
    handleGallaryIFileUpload(
      ev,
      setgallaryImgPrevFile,
      setgalleryError,
      setGalleryImg,
      setGallery,
      "image"
    );
    setGallaryImgPrevFiles([
      ...gallaryImgPrevFiles,
      ...Array.from(ev.target.files),
    ]);
  };
console.log(gallaryImgPrevFiles)
  const handleFounderImgUpload = (ev) => {
    const file = ev.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setfounderImgPrevFile(reader.result);
    //     setNewFounder((prev) => ({
    //       ...prev,
    //       image: reader.result,
    //     }));
    //   };
    //   reader.readAsDataURL(file);
    // }
    handleFileUpload(
      ev,
      setfounderImgPrevFile,
      setFoundersError,
      setFounderImg,
      setNewFounder,
      "image"
    );
  };

  // Add this function to handle the deletion of videos
  const handleDeleteImage = (index) => {
    const updatedFiles = gallaryImgPrevFiles.filter((_, i) => i !== index);
    setGallaryImgPrevFiles(updatedFiles);
  };

  const handleGallaryVidUpload = () => {
    setGallery((prev) => {
      // Ensure that videos is always an array
      return {
        ...prev,
        videos: [...(prev.videos || []), gallaryVideoUrl ],
      };
    });
    setgallaryVideoUrl("")
  };

  // Function to handle the deletion of videos
  const handleDeleteVideo = (index) => {
    setGallery((prevGallery) => ({
      ...prevGallery,
      videos: prevGallery.videos.filter((_, i) => i !== index),
    }));
  };
  //
  const handleGallaryIFileUpload = async (
    ev,
    setPreview,
    setError,
    setFile,
    setGallery,
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

            setGallery((prev) => {
              // Ensure that videos is always an array
              const updatedimages = Array.isArray(prev.images) ? prev.images : [];
              return {
                ...prev,
                images: [...updatedimages, response.data.imageUrl],
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
  console.log(gallery)
  const handleGallaryVidIFileUpload = async (
    ev,
    setPreview,
    setError,
    setFile,
    setGallery,
    type
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
            setGallery((prev) => ({
              ...prev,
              [type]: [...prev[type], response.data.imageUrl],
            }));

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

  const handleAddGallaryImg = () => {
    if (editingIndex !== null) {
      setgallaryImgFile((prevGallaryImg) => {
        const updatedGallaryImg = [...prevGallaryImg];
        updatedGallaryImg[editingIndex] = newGallaryImg;
        return updatedGallaryImg;
      });
      setEditingIndex(null);
    } else {
      setgallaryImgFile((prevGallaryImg) => [...prevGallaryImg, newGallaryImg]);
    }
    setNewGallaryImg({
      image: [],
    });
  };

  const handleDeleteGallaryImg = (index) => {
    setgallaryImgFile((prevGallaryImg) => {
      const updatedGallaryImg = [...prevGallaryImg];
      updatedGallaryImg.splice(index, 1);
      return updatedGallaryImg;
    });
  };
console.log(galleryImg)
  useEffect(() => {
    const addGamepediaFunction = async () => {
      let params = {
        ...addGameData,
      };
      params.awards = awards;
      params.gallery = gallery;
      params.founders = founders;
      params.platform = platform;
      params.genre = genre;
      console.log(params);
      const response = await invokeApi(
        config.baseUrl + apiList.addGamepedia,
        params,
        cookies
      );
      responseUtils.showToster(response);
      if (response && response.data) {
        if (response.customcode === 200) {
          // setResetGameData(true);
          close();
        }
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        // alert("Something went wront while adding gamepedia");
      }
      console.log(addGameData);
    };
    if (invokeAddGame) {
      setInvokeAddGame(false);
      addGamepediaFunction();
    }
  }, [addGameData, invokeAddGame, cookies, navigate]);

  // useEffect(() => {
  //   const resetAddGameData = () => {
  //     setgameLogoPreviewFile(null);
  //     setgameBannerError("");
  //     setgameLogoError("");
  //   };
  //   if (resetGameData) {
  //     setResetGameData(false);
  //     // resetAddGameData();
  //   }
  // }, [resetGameData]);

  // multi step form
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    const isCurrentStepValid = validateCurrentStep();
    console.log(isCurrentStepValid)
    if (isCurrentStepValid) {
      setCurrentStep((prevCurr) => prevCurr + 1);
    }
  };
  const prevStep = () => setCurrentStep(currentStep - 1);
  console.log(addGameData)
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: {
        let isValid = true;
        if (!logoImgFile) {
          setgameLogoError("This field is required");
          isValid = false;
        } else {
          setgameLogoError("");
        }
        if (!bannerImgFile) {
          setgameBannerError("This field is required");
          isValid = false;
        } else {
          setgameBannerError("");
        }
        return isValid;
      }
      case 2: {
        let isValid = true;
        if (addGameData.gameName === "") {
          console.log("faliler ")
          setgameNameError("Game Name is required");
          isValid = false;
        } else {
          setgameNameError("");
        }

        if (addGameData.developers === "") {
          console.log("faliler ")
          setdevelopersError("Developers is required");
          isValid = false;
        } else {
          setdevelopersError("");
        }
        if (addGameData.publishers === "") {
          console.log("faliler ")
          setpublishersError("Publishers are required");
          isValid = false;
        } else {
          setpublishersError("");
        }
        if (!addGameData.age) {
          console.log("faliler ")
          setageError("Age is required");
          isValid = false;
        } else {
          setageError("");
        }
        if (platform.length === 0) {
          console.log("faliler ")
          setplatformError("platforms are required");
          isValid = false;
        } else {
          setplatformError("");
        }
        if (genre.length === 0) {
          console.log("faliler ")
          setgenreError("Genre are required");
          isValid = false;
        } else {
          setgenreError("");
        }
        if (addGameData.releseDate === "") {
          console.log("faliler ")
          setreleseDateError("Release date is required");
          isValid = false;
        } else {
          setreleseDateError("");
        }
        if (addGameData.totalUsers === "") {
          console.log("faliler ")
          settotalUsersError("Total users are required");
          isValid = false;
        } else {
          settotalUsersError("");
        }
        if (addGameData.totalDownloads === "") {
          console.log("faliler ")
          settotalDownloadsError("Total Downloads are required");
          isValid = false;
        } else {
          settotalDownloadsError("");
        }
        if (!["ACTIVE", "INACTIVE"].includes(addGameData.status)) {
          console.log("faliler ")
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
          setawardsError({
            categoryError: "This Fileld is Required",
            nameError: "This Fileld is Required",
            dateError: "This Fileld is Required",
          });
          return false;
        } else {
          setawardsError(""); // Reset error if the validation passes
          return true; // Validation passed
        }
      }
      case 5: {
        console.log(galleryImg)
        if (!galleryImg) {
          setgalleryError({
            videosError: "This Fileld is Required",
          });
          return false;
        } else {
          setgalleryError({
            videosError: "",
          });
          return true; // Validation passed
        }
      }
      case 6: {
        if (founders.length === 0) {
          setFoundersError({
            nameError: "This field is required",
            designationError: "This field is required",
            imageError: "This field is required",
          });
          return false;
        } else {
          setgalleryError({
            nameError: "",
            designationError: "",
            imageError: "",
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
    // setResetGameData(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {/**Display photos */}
            <div className="flex flex-row items-start p-3 space-x-10 dark:text-white">
              <div className="flex-col items-center gap-4">
                {/** gamelogo upload */}
                <label
                  htmlFor="gameLogo"
                  className=" flex flex-col items-center gap-[20px] cursor-pointer justify-center border-dashed border-2 p-[1.5rem] rounded-[10px] shadow-[0px 48px -48px #e8e8e8]"
                >
                  <div className="flex flex-col items-center justify-center">
                    {gameLogoPreviewFile ? (
                      <img
                        src={gameLogoPreviewFile}
                        alt="gameLogoPreview"
                        className="object-cover rounded w-44 h-44"
                      />
                    ) : (
                      <img
                        src="/assets/png/image-upload.png"
                        alt="Upload Image Placeholder"
                        className="object-cover w-full h-full rounded"
                      />
                    )}
                    <p className="text-red-500">
                      {gameLogoError ? gameLogoError : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="font-normal text-white bg-blue-500 border-none button"
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
                <div className="pt-2 w-28">Game Logo</div>
              </div>

              <div className="flex-col items-center gap-4">
                {/**banner upload */}
                <label
                  htmlFor="gameBanner"
                  className="  flex flex-col  items-center gap-[20px] cursor-pointer justify-center border-dashed  border-2 p-[1.5rem] rounded-[10px] shadow-[0px 48px -48px #e8e8e8]"
                >
                  <div className="flex flex-col items-center justify-center">
                    {gameBannerPreviewFile ? (
                      <img
                        src={gameBannerPreviewFile}
                        alt=""
                        className="object-cover rounded w-44 h-44"
                      />
                    ) : (
                      <img
                        src="/assets/png/image-upload.png"
                        alt="Upload Image Placeholder"
                        className="object-cover w-full h-full rounded"
                      />
                    )}

                    <p className="text-red-500">{gameBannerError}</p>
                  </div>
                  <div className="flex items-center justify-center ">
                    <button
                      onClick={() => inputRefGameBanner.current.click()}
                      className="font-normal text-white bg-blue-500 border-none button"
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
                <div className="pt-2 w-28">Game Banner</div>
                {/**upload */}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/**Overview */}
            <div className="flex flex-col px-3 py-3 space-x-5 space-y-3">
              <div className="flex items-center">
                <label className="w-36 dark:text-white">Game Name</label>
                <input
                  type="text"
                  name="gameName"
                  value = {addGameData.gameName}
                  className="border px-4 py-2 ml-5 placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
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
                  value = {addGameData.developers}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setdevelopersError("");
                  }}
                  placeholder={developersError ? developersError : ""}
                  className="border px-4 py-2 placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Publisher</label>
                <input
                  type="text"
                  name="publishers"
                  value = {addGameData.publishers}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setpublishersError("");
                  }}
                  placeholder={publishersError ? publishersError : ""}
                  className="border w-full px-4 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Age</label>
                <input
                  type="number"
                  name="age"
                  value = {addGameData.age}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setageError("");
                  }}
                  placeholder={ageError ? ageError : ""}
                  className="border w-full px-4 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>

              <div className="flex items-center w-full max-w-[1490px]">
                <label className="w-36 dark:text-white">Platforms</label>
                <div className="w-full">
                
                <input
                  type="text"
                  onKeyDown={handleAddPlatform}
                  value={addGameData.platform}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Multiselect"
                  className="px-4 py-2 border placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
                {platform.length !== 0 && <div className="z-10 flex flex-wrap gap-2 mt-2">
                  {platform.map((platform, index) => (
                    <span
                      key={index}
                      className="flex items-center px-2 py-1 bg-gray-200 rounded"
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
                  name="genre"
                  value = {addGameData.genre}
                  onChange={(e) => {
                    let copy = [...genre];
                    copy[0] = e.target.value;
                    setGenre(copy);
                    addGameChangeHandler(e)
                  }}
                  placeholder={genreError ? genreError : ""}
                  className="border w-full px-4 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between ">
                <label className="w-36 dark:text-white">Release Date</label>
                <div className="w-full">
                  <input
                    type="date"
                    name="releseDate"
                    value = {addGameData.releseDate}
                    onChange={(ev) => {
                      addGameChangeHandler(ev);
                      setreleseDateError("");
                    }}
                    placeholder={releseDateError ? releseDateError : ""}
                    className="border w-full px-4 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                  />
                </div>
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Users</label>
                <input
                  type="text"
                  name="totalUsers"
                  value = {addGameData.totalUsers}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    settotalUsersError("");
                  }}
                  placeholder={totalUsersError ? totalUsersError : ""}
                  className="border w-full px-4 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Downloads</label>
                <input
                  type="text"
                  name="totalDownloads"
                  value = {addGameData.totalDownloads}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    settotalDownloadsError("");
                  }}
                  placeholder={totalDownloadsError ? totalDownloadsError : ""}
                  className="border w-full px-4 placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <label className="w-36 dark:text-white">Status</label>
                <select
                  name="status"
                  value = {addGameData.status}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setstatusError("");
                  }}
                  className="border w-full px-4 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
                {statusError && <span className="text-red-600">{statusError}</span>}
              </div>
              <div className="flex items-center ">
                <label className="w-36 dark:text-white">Summary</label>
                <textarea
                  type="text"
                  name="gameDescription"
                  value = {addGameData.gameDescription}
                  onChange={(ev) => {
                    addGameChangeHandler(ev);
                    setgameDescriptionError("");
                  }}
                  placeholder={gameDescriptionError ? gameDescriptionError : ""}
                  className="border w-full px-4  placeholder-red-600 py-2 rounded-lg dark:bg-[#242424] dark:border-none outline-none dark:text-white"
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            {/**Plot */}
            <div className="flex flex-row items-start px-5 py-3 space-x-10 space-y-3">
              <p className="text-xl font-semibold dark:text-white">Plot</p>
              <textarea
                type="text"
                name="plotDescription"
                value={addGameData.plotDescription}
                onChange={(ev) => {
                  addGameChangeHandler(ev);
                  setplotDescriptionError("");
                }}
                placeholder={plotDescriptionError ? plotDescriptionError : ""}
                className="w-full h-96 border placeholder-red-600 dark:bg-[#242424] dark:border-none outline-none dark:text-white rounded-lg px-3 py-3"
              />
            </div>
          </>
        );
      case 4:
        return (
          <>
            {/**Awards */}

            <div className="">
              <div className="flex justify-between px-3 py-3 space-x-5">
                <input
                  type="text"
                  placeholder={
                    awardsError.nameError ? awardsError.nameError : "Name"
                  }
                  name="name"
                  value={newAward.name}
                  onChange={(e) =>
                    setNewAward((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="outline-none bg-transparent py-1 placeholder-red-500 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-1"
                />
                <input
                  type="text"
                  name="category"
                  placeholder={
                    awardsError.categoryError
                      ? awardsError.categoryError
                      : "Category"
                  }
                  value={newAward.category}
                  onChange={(e) =>
                    setNewAward((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="outline-none bg-transparent py-1 placeholder-red-500 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px]  w-full me-1"
                />
                <input
                  type="date"
                  name="date"
                  placeholder={
                    awardsError.dateError ? awardsError.dateError : "Date"
                  }
                  value={newAward.date}
                  onChange={(e) =>
                    setNewAward((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="outline-none bg-transparent py-1 dark:text-[#FFFFFF] placeholder-red-500 border-b-[#707070] border-b-[2px]  w-full me-1"
                />
                <button
                  onClick={handleAddAward}
                  className="text-white bg-blue-600 border-none button"
                >
                  {editingIndex !== null ? "Update" : "Add"}
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
                          className="cursor-pointer hover:text-green-600"
                          onClick={() => handleEditAward(index)}
                        />
                        <FaRegTrashCan
                          size={20}
                          className="cursor-pointer hover:text-red-600"
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
            {/** Gallery */}

            <div>
              <ul className="flex px-3 py-3">
                {gallaryTabs.map((tab) => (
                  <li
                    key={tab}
                    className={`flex-1 button text-center font-montserrat py-3 cursor-pointer space-x-4 border-b-4 ${
                      activeGallaryTabs === tab
                        ? "dark:bg-white font-bold"
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
                  <div
                    className="flex flex-wrap items-center gap-4 overflow-y-auto"
                    style={{ maxHeight: "500px" }}
                  >
                    <div
                      className="flex flex-col items-center justify-center flex-none px-3 py-3 space-y-3 border-2 border-dashed rounded-md"
                      style={{ width: "240px", height: "240px" }}
                    >
                      <label
                        htmlFor="videos"
                        className="flex flex-col items-center my-3 space-y-3"
                      >
                        <img
                          src="/assets/png/image-upload.png"
                          alt="image upload"
                          style={{ width: "150px", height: "150px" }}
                        />
                        <p className="text-red-500">
                          {galleryError.videosError}
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          name="image"
                          id="videos"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryFileUpload}
                          ref={inputRefGallaryImg}
                        />
                        <button
                          className="mt-3 text-white bg-blue-500 border-none button"
                          onClick={() => inputRefGallaryImg.current.click()}
                        >
                          Upload Photos
                        </button>
                      </label>
                    </div>
                    {gallaryImgPrevFiles.map((file, index) => (
                      <div
                        key={index}
                        className="relative flex flex-col items-center justify-center flex-none px-3 py-3 space-y-3 border-2 border-dashed rounded-md"
                        style={{ width: "240px", height: "240px" }}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`image-${index}`}
                          className="object-cover rounded"
                          style={{ width: "220px", height: "220px" }}
                        />
                        <button
                          className="absolute p-2 text-white bg-red-500 rounded-full top-2 right-2"
                          onClick={() => handleDeleteImage(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeGallaryTabs === "Videos" && (
                <div className="flex flex-col items-center justify-center w-full px-10 py-4">
                    <div className="flex items-center flex-grow w-full space-x-6">
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
                        className="text-white bg-blue-600 border-none button"
                      >
                        {editingIndex !== null ? "Update" : "Add"}
                      </button>
                    </div>
                    <div className="w-full pt-4">
                    {gallery.videos && gallery.videos?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between flex-grow w-full gap-6 py-2 text-white dark:border-gray-700" >
                        <p className="w-full font-semibold text-white">{item}</p>
                        <button className="p-2 " onClick={() => handleDeleteVideo(index)} >
                         <FaRegTrashCan
                          size={20}
                          className="cursor-pointer hover:text-red-600"
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

            <ul className="flex px-3 py-3">
              {creatorsTabs.map((tab) => (
                <li
                  key={tab}
                  className={`flex-1 button text-center font-montserrat py-3 cursor-pointer space-x-4 border-b-4 ${
                    activeCreatorTabs === tab
                      ? "dark:bg-white font-bold"
                      : "border-transparent w-16 dark:text-white"
                  } hover:border-blue-500 transition duration-300`}
                  onClick={() => setactiveCreatorTabs(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>

            <div className="px-4 py-4">
              <div className="flex items-center space-x-6">
                <div
                  className="relative flex items-center justify-center flex-none border-2 border-dashed rounded-md"
                  style={{ width: "220px", height: "220px" }}
                >
                  <label
                    htmlFor="founderImg"
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                  >
                    {founderImgPrevFile ? (
                      <img
                        src={founderImgPrevFile}
                        alt="Founder Image"
                        className="object-cover w-full h-full rounded"
                      />
                    ) : (
                      <>
                        <img
                          src="/assets/png/image-upload.png"
                          alt="image upload"
                          className="w-3/4 h-3/4"
                        />
                        <button
                          // type="button"
                          className="text-white bg-blue-500 border-none button"
                          onClick={() => inputRefFounderImg.current.click()}
                        >
                          {founderImgPrevFile ? "Change" : "Upload"}
                        </button>
                      </>
                    )}
                    <input
                      type="file"
                      id="founderImg"
                      ref={inputRefFounderImg}
                      accept="image/*"
                      onChange={handleFounderImgUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                  {foundersError.imageError && (
                    <p className="absolute text-red-500 bottom-2 left-2">
                      {foundersError.imageError}
                    </p>
                  )}
                </div>

                <div className="flex items-center flex-grow space-x-6">
                  <input
                    type="text"
                    placeholder={
                      foundersError.nameError ? foundersError.nameError : "Name"
                    }
                    name="name"
                    value={newFounder.name}
                    onChange={(e) =>
                      setNewFounder((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="outline-none bg-transparent py-1 placeholder-red-500 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px] w-full"
                  />

                  <input
                    type="text"
                    placeholder={
                      foundersError.designationError
                        ? foundersError.designationError
                        : "Role"
                    }
                    name="designation"
                    value={newFounder.designation}
                    onChange={(e) =>
                      setNewFounder((prev) => ({
                        ...prev,
                        designation: e.target.value,
                      }))
                    }
                    className="outline-none bg-transparent py-1 placeholder-red-500 dark:text-[#FFFFFF] border-b-[#707070] border-b-[2px] w-full"
                  />

                  <button
                    onClick={handleAddFounder}
                    className="text-white bg-blue-600 border-none button"
                  >
                    {editingIndex !== null ? "Update" : "Add"}
                  </button>
                </div>
              </div>

              <p className="dark:bg-[#242424] py-4 px-4 dark:text-white font-semibold text-lg mt-8">
                Creators Added
              </p>

              <div
                className="px-3 py-3 overflow-y-auto dark:text-white"
                style={{ maxHeight: "300px" }}
              >
                {founders.length > 0 &&
                  founders.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center py-2 space-x-4 border-b dark:border-gray-700"
                    >
                      <p className="w-8 text-center">{index + 1}</p>
                      <img
                        src={item.image}
                        className="object-cover w-20 h-20 rounded"
                        alt={item.name}
                      />
                      <div className="flex flex-col flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p>{item.designation}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MdOutlineEditNote
                          size={30}
                          className="cursor-pointer hover:text-green-600"
                          onClick={() => handleEditFounder(index)}
                        />
                        <FaRegTrashCan
                          size={20}
                          className="cursor-pointer hover:text-red-600"
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
        <div className="flex justify-between px-5 py-3">
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
                  Add Game
                </h5>
              </div>
              <MdClose
                className="text-black cursor-pointer dark:text-white"
                size={25}
                onClick={() => {
                  // setResetGameData(true);
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

AddGameModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
};

export default AddGameModal;
