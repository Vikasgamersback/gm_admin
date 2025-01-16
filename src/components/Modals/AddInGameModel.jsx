import { MdClose } from "react-icons/md";
import { InputComponent } from "../general-components/InputComponent";
import PropTypes from 'prop-types';
import { useState } from "react";

const AddInGameModel = ({ open, close }) => {
  const [gameTabList,setGameTabList] = useState(0)
  const [thumbnailPreviewFile,setThumbnailPreviewFile] = useState(null)
  const [coverPreviewFile,setCoverPreviewFile] = useState(null)
  const [genres, setGenres] = useState([]);

  const clearState = () => {
    setThumbnailPreviewFile(null)
    setCoverPreviewFile(null)
    setGenres([])
  }

  
  const handleAddGenre = (event) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      // Add the genre to the list of genres
      setGenres([...genres, event.target.value.trim()]);
      // Clear the input
      event.target.value = '';
    }
  };
  
  const handleRemoveGenre = (index) => {
    setGenres((prevGenres) => prevGenres.filter((_, i) => i !== index));
  };

  const handleThumbnailFileUpload = async(event) => {
    
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setThumbnailPreviewFile(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setThumbnailPreviewFile(null);
    }
  }
  const handleCoverFileUpload = async(event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCoverPreviewFile(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setCoverPreviewFile(null);
    }
  }

  const renderStepContent = () => {
    switch(gameTabList){
      case 0:
        return (
          <div className="flex flex-col  px-3 py-3 space-y-3 space-x-5">
                <div className="flex space-y-3 flex-col px-10">
                  <InputComponent
                    label={"Game Name"}
                    name={"gameName"}
                    // value={"GameName"}
                  />
                  <InputComponent
                    label={"Developer"}
                    name={"developer"}
                    // value={"developer"}
                  />
                  <div>
                    <InputComponent
                      onKeyDown={handleAddGenre}
                      label={"Genre"}
                      name={"genre"}
                      placeholder={"Multiselect"}
                      // value={"description"}
                    />
                    <div className="flex flex-wrap gap-2 mt-2 px-32">
                      {genres.map((genre, index) => (
                        <span
                          key={index}
                          className="flex items-center bg-gray-200 px-2 py-1 rounded"
                        >
                          <span>{genre}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveGenre(index)}
                            className="ml-2 text-red-500 focus:outline-none"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <InputComponent
                    label={"Iframe"}
                    name={"iframelink"}
                    // value={"iframeLink"}
                    />
                  <InputComponent
                    type="textarea"
                    label={"Description"}
                    name={"description"}

                    // value={"description"}
                  />
                </div>
                {/* <div className='h-[45px] flex items-center justify-center cursor-pointer bg-blue-500 rounded-bl-2xl rounded-br-2xl'>
                  <button className='text-[#ffffff] font-sans text-2xl '>Next</button>
                </div> */}
              </div>
        )
      case 1:
        return (
          <div className="flex flex-col  px-3 py-3 space-y-3 space-x-5">
                <div className="flex space-y-3 flex-col px-10">
                  <div className="flex gap-10">
                    <InputComponent
                      type="file"
                      label={"Thumbnail"}
                      name={"thumbnailUpload"}
                      onChange = {handleThumbnailFileUpload}
                    />  
                    {thumbnailPreviewFile ? (
                            <img
                              src={thumbnailPreviewFile}
                              alt="image upload"
                              className="h-44 w-44 object-cover rounded"
                            />
                          ) : (
                            <img
                              src="/assets/png/image-upload.png"
                              alt="image upload"
                            />
                          )}
                  </div>
                  <div className="flex gap-10">
                    <InputComponent
                      type="file"
                      label={"Cover Upload"}
                      name={"thumbnailUpload"}
                      onChange = {handleCoverFileUpload}
                    />
                  {coverPreviewFile ? (
                            <img
                              src={coverPreviewFile}
                              alt="image upload"
                              className="h-44 w-44 object-cover rounded"
                            />
                          ) : (
                            <img
                              src="/assets/png/image-upload.png"
                              alt="image upload"
                            />
                          )}
                  </div>
                </div>
                {/* <div className='h-[45px] flex items-center justify-center cursor-pointer bg-blue-500 rounded-bl-2xl rounded-br-2xl'>
                  <button className='text-[#ffffff] font-sans text-2xl '>Submit</button>
                </div> */}
              </div>
        )
    }
  }

  const renderNavigationButton = () => {
    if (gameTabList === 0) {
      return (
        <div className="flex justify-end">
          <button
            className="button bg-blue-500 text-white flex my-3 mx-12"
            onClick={() => setGameTabList(1)}
          >
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between px-12 py-3">
          <span>
              <button
                className="button bg-blue-500 text-white"
                onClick={() => setGameTabList(0)}
              >
                Previous
              </button>
          </span>
          <button className="button bg-blue-500 text-white" >
            Submit
          </button>
        </div>
      );
    }
  }

  return (
    <>
      {open && (
        <div className="fixed z-50 inset-0 bg-opacity-60 bg-black  flex justify-center items-center">
          <div className="flex flex-col w-[90%]  dark:border-white">
            <div className="flex flex-row w-full items-center  justify-between px-6 py-4 bg-white dark:bg-[#393939]  rounded-tr-2xl border-b  rounded-tl-2xl">
              <div className="flex flex-row items-center space-x-6">
                <h5 className="text-black font-semibold dark:text-white">
                  Add Game
                </h5>
              </div>
              
              <MdClose
                className="cursor-pointer text-black dark:text-white"
                size={25}
                onClick={() => {
                  close();
                  clearState()
                }}
              />
            </div>
            <div className="flex flex-row items-center w-full space-x-20 px-6 bg-white dark:bg-[#393939] border-b">
                <h5
                  className={`${
                    gameTabList === 0
                      ? "py-2 px-3 dark:text-white rounded-xl font-bold"
                      : "text-[#949495] font-bold cursor-pointer py-2 px-3"
                  }`}
                  onClick={() => {
                    setGameTabList(0);
                  }}
                >
                  Basic Information
                </h5>
                <h5
                  className={`${
                    gameTabList === 1
                      ? "py-2 px-3 dark:text-white rounded-xl font-bold"
                      : "text-[#949495] font-bold cursor-pointer py-2 px-3"
                  }`}
                  onClick={() => {
                    setGameTabList(1);
                  }}
                >
                  Display Picture
                </h5>
                
              </div>
            <section className="bg-white dark:bg-[#393939] rounded-md">
              <div>
                {renderStepContent()}
              </div>
                {renderNavigationButton()}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

AddInGameModel.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
};


export default AddInGameModel;
