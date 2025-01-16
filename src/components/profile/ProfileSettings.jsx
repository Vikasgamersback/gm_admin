import {  FiEdit } from "react-icons/fi";
import Breadcrumbs from "../general-components/Breadcrumbs";
import { useState, useRef } from "react";
import ToggleButton from "./ToggleButton";
import SingleSelect from "../general-components/SingleSelect";
export default function ProfileSettings() {
  const [avatarLight, setAvatarLight] = useState(null);
  const [avatarDark, setAvatarDark] = useState(null);
  const [avatarMobile, setAvatarMobile] = useState(null);
  const [avatarFavicon, setAvatarFavicon] = useState(null);
  const [status, setStatus] = useState(false);
  const [siteTitle, setSiteTitle] = useState(" ");
  const [error, setError] = useState(siteTitle.length === 0);
  const [rolesArray] = useState([1,2,3]);
  const [checkboxStatus, setCheckboxStatus] = useState([
    {
      num: 10,
      status: false,
    },
    {
      num: 20,
      status: false,
    },

    {
      num: 30,
      status: false,
    },

    {
      num: 40,
      status: false,
    },
    {
      num: 50,
      status: false,
    },
    {
      num: 100,
      status: false,
    },
    {
      num: 200,
      status: false,
    },
    {
      num: 500,
      status: false,
    },
  ]);
  const lightLogoRefImage = useRef();
  const darkLogoRefImage = useRef();
  const mobileLogoRefImage = useRef();
  const faviconLogoRefImage = useRef();

  const handleClick = () => {
    setStatus((prevStatus) => !prevStatus);
  };
  const handleLightlogoUpload = (ev) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^image\/(jpe?g|png|gif)/
    );
    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 5242880) {
        setAvatarLight(window.URL.createObjectURL(fileUploaded));
      }
    }
  };
  const handleDarklogoUpload = (ev) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^image\/(jpe?g|png|gif)/
    );
    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 5242880) {
        setAvatarDark(window.URL.createObjectURL(fileUploaded));
      }
    }
  };
  const handleMobileLogoUpload = (ev) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^image\/(jpe?g|png|gif)/
    );
    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 5242880) {
        setAvatarMobile(window.URL.createObjectURL(fileUploaded));
      }
    }
  };
  const handleFaviconLogoUpload = (ev) => {
    const fileUploaded = ev.target.files[0];
    let acceptProfileFileTypes = fileUploaded.type.match(
      /^image\/(jpe?g|png|gif)/
    );
    if (fileUploaded && acceptProfileFileTypes) {
      if (fileUploaded.size < 5242880) {
        setAvatarFavicon(window.URL.createObjectURL(fileUploaded));
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (siteTitle.length == 0) {
  //     setError(true);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (siteTitle.length === 0) {
  //     setError(true);
  //   }
  //   // Rest of your form submission logic
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (siteTitle.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
    // Rest of your form submission logic
  };

  return (
    <>
      
      <div className="sectiona  ">
        <div className=" m-10 flex flex-row space-y-2 justify-between">
          <Breadcrumbs nav1={"Settings"} />
          {/* <button className="border rounded-lg p-2 bg-blue-400 text-white">
          Submit
        </button> */}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-10  p-4 h-full  border card card-shadow rounded-lg overflow-y-auto"
        >
          {/* Site Settings */}
          <div className="flex flex-row justify-end">
            <button className="border rounded-lg p-2 bg-blue-400 text-white">
              Submit
            </button>
          </div>

          <div className="settings-input-box">
            <div className="border-b-2 m-2 p-2 text-2xl font-bold">
              Site Settings
            </div>

            <div className="grid grid-cols-3 grid-rows-3  grid-flow-row gap-4 m-2 p-2">
              <div>
                <div className="w-1/2 ">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Site Title</div>
                    <div className="input-wrapping-div">
                      <input
                    
                        onChange={e => setSiteTitle(e.target.value)}
                        className="form-input-text border rounded-lg p-2   "
                        type="text"
                      />
                      {error && siteTitle.length <= 0 ? (
                        <label className="mt-2 text-sm text-pink-600 ">
                          This is a required field
                        </label>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Site URL</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>

              <div>
                {" "}
                <div className="w-3/4">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm"> Email</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2 peer"
                        type="email"
                      />
                      <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                        Please provide a valid email address.
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Site Career Email</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Company Phone</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Latitude </div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>

              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Longitude </div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>

              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Emergency Number </div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm"></div>
                    <div className="input-wrapping-div">
                      {/* <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      /> */}

                      <SingleSelect
                          title="Cron Time Zone"
             
                          
                          dataArray={rolesArray}
              showSearch={false}
            
              height="135"
              width="315"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Site Address</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>

            <div className="flex  flex-row gap-[260px]">
              <div className="pl-4 ">
                Light
                <input
                  type="file"
                  className="hidden "
                  ref={lightLogoRefImage}
                  onChange={handleLightlogoUpload}
                />
              </div>

              <div className="pl-4">
                Dark
                <input
                  type="file"
                  className="hidden "
                  ref={darkLogoRefImage}
                  onChange={handleDarklogoUpload}
                />
              </div>

              <div className="">
                Mobile
                <input
                  type="file"
                  className="hidden "
                  ref={mobileLogoRefImage}
                  onChange={handleMobileLogoUpload}
                />
              </div>

              <div className="">
                Favicon
                <input
                  type="file"
                  className="hidden "
                  ref={faviconLogoRefImage}
                  onChange={handleFaviconLogoUpload}
                />
              </div>
            </div>

            <div className="flex flex-row gap-[160px]">
              <div>
                <img
                  className="rounded-full h-40 w-40"
                  src={avatarLight ? avatarLight : "assets/png/profile2.jpg"}
                />
                <FiEdit
                  
                  onClick={() => lightLogoRefImage.current.click()}
                  className="text-xl text-black "
                />
              </div>

              <div>
                <img
                  className="rounded-full h-40 w-40"
                  src={avatarDark ? avatarDark : "assets/png/profile1.jpg"}
                />
                <FiEdit
                  
                  onClick={() => darkLogoRefImage.current.click()}
                  className="text-xl text-black content-end"
                />
              </div>

              <div>
                <img
                  className="rounded-full h-40 w-40"
                  src={avatarMobile ? avatarMobile : "assets/png/profile1.jpg"}
                />
                <FiEdit
                  
                  onClick={() => mobileLogoRefImage.current.click()}
                  className="text-xl text-black "
                />
              </div>

              <div>
                <img
                  className="rounded-full h-40 w-40 "
                  src={
                    avatarFavicon ? avatarFavicon : "assets/png/profile1.jpg"
                  }
                />
                <FiEdit
                  
                  onClick={() => faviconLogoRefImage.current.click()}
                  className="text-xl text-black "
                />
              </div>
            </div>
          </div>

          {/* general settings */}

          <div className="settings-input-box ">
            <div className="border-b-2 m-2 p-2 text-2xl font-bold">
              General Settings
            </div>
            <div className="grid grid-cols-3 grid-rows-3  grid-flow-row gap-4 m-2 p-2">
              <div>
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">User minimum age:</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="w-2/3">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Maximum User Login count</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>

              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Joining Token Bonus</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm ">Referral token bonus</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm ">Daily token bonus:</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Emergency Num</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>

              <div>
                {" "}
                <div className="w-2/3">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Return Claim Token Bonus:</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>

              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Latitude </div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div>
                {" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Day to claim</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>

          {/* Table limit */}

          <div className="settings-input-box ">
            <div className="border-b-2 my-4 py-2 text-2xl font-bold">
              Table Limit
            </div>
            <div className="flex gap-5">
              {checkboxStatus.map((el, idx) => (
                <div
                  key={idx}
                  className={
                    el.status
                      ? "table-limit-div bg-zinc-200 dark:bg-zinc-500 border p-2 rounded-lg"
                      : "table-limit-div p-2 "
                  }
                  onClick={() => {
                    let copy = [...checkboxStatus];
                    copy[idx].status = !copy[idx].status;
                    setCheckboxStatus(copy);
                  }}
                >
                  {el.num}
                </div>
              ))}
            </div>
          </div>

          {/* Spaces Credentials */}
          <div>
            <div className=" settings-input-box">
              <div className="border-b-2 m-2 p-2 text-2xl font-bold">
                Spaces Credentials
              </div>
              <div className="grid grid-rows-3 grid-cols-3 grid-flow-rows gap-4 m-2 p-2">
                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Spaces Key:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Spaces Secret:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Spaces Endpoint:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Site URL</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Spaces Bucket Name</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Spaces Base URL:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Spaces Key:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* FCM Credentials */}
          <div>
            <div className="settings-input-box">
              <div className="border-b-2 m-2 p-2 text-2xl font-bold">
                FCM Credentials
              </div>
              <div className="grid grid-cols-3   grid-flow-row gap-4 m-2 p-2">
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Android User</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">
                      IOS User
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
                <div className="w-1/2">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">Desktop User</div>
                    <div className="input-wrapping-div">
                      <input
                        className="form-input-text border rounded-lg p-2"
                        type="text"
                      />
                      <p className="mt-2 text-sm text-pink-600">
                        This is a required field
                      </p>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>

          {/* SMS Settings*/}
          <div>
            <div className="settings-input-box">
              <div className="border-b-2 m-2 p-2 text-2xl font-bold">
                SMS Settings
              </div>
              <div className="grid grid-cols-3   grid-flow-row gap-4 m-2 p-2">
                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">SSID</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">
                        Auth Token
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* SMTP Mail Settings */}
          <div>
            <div className="settings-input-box">
              <div className="border-b-2 m-2 p-2 text-2xl font-bold">
                SMTP Mail Settings
              </div>
              <div className="grid grid-cols-3 grid-rows-2  grid-flow-row gap-4 m-2 p-2">
                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">User </div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Password </div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Host</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Port</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Is Secure</div>
                      <div className="input-wrapping-div">
                        <p className="text-2xl p-2 mx-2" onClick={() => {}}>
                          <ToggleButton status={status} onClick={handleClick} />
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Is reject Unauthorized</div>
                      <div className="input-wrapping-div">
                        <p className="text-2xl p-2 mx-2">
                          <ToggleButton status={status} onClick={handleClick} />
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* App Version Settings */}
          <div>
            <div className="settings-input-box">
              <div className="border-b-2 m-2 p-2 text-2xl font-bold">
                App Version Settings
              </div>
              <div className="grid grid-cols-3 grid-rows-2  grid-flow-row gap-4 m-2 p-2">
                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Android Version:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">IOS Version</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Android Status</div>
                      <div className="input-wrapping-div">
                        <p className="text-2xl p-2 mx-2">
                          <ToggleButton status={status} onClick={handleClick} />
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">IOS Status</div>
                      <div className="input-wrapping-div">
                        <p className="text-2xl p-2 mx-2">
                          <ToggleButton status={status} onClick={handleClick} />
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* Redirect URL */}
          <div>
            <div className="settings-input-box">
              <div className="border-b-2 m-2 p-2 text-2xl font-bold">
                Redirect URL
              </div>
              <div className="grid grid-cols-3 grid-rows-3  grid-flow-row gap-4 m-2 p-2">
                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">User App Store</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">User App Store</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">FAQ URL</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Terms and Conditions</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">User App Store</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">User App Store</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Privacy URL</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">About URL</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* Social Login credentials */}
          <div>
            <div className=" settings-input-box">
              <div className="border-b-2 m-2 p-2 text-2xl font-bold">
                Social Login credentials
              </div>
              <div className="grid grid-cols-2 grid-rows-1  grid-flow-row gap-4 m-2 p-2">
                <div>
                  <div className="my-4 font-semibold">Google</div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">App ID </div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="my-4 font-semibold">Facebook</div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">App ID</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">App secret</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">App Secret</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* Social URLs */}
          <div>
            <div className="  settings-input-box mb-36">
              <div className="border-b-2 m-2 p-2 text-2xl font-bold">
                Social URLs
              </div>
              <div className="grid grid-cols-3 grid-rows-2  grid-flow-row gap-4 m-2 p-2">
                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Google URL: </div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Instagram URL:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Discord URL:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">YouTube URL:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Linkedin URL:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div>
                  {" "}
                  <div className="w-1/2">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">Twitter URL:</div>
                      <div className="input-wrapping-div">
                        <input
                          className="form-input-text border rounded-lg p-2"
                          type="text"
                        />
                        <p className="mt-2 text-sm text-pink-600">
                          This is a required field
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
