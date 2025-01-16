import { useState, useEffect, useRef } from "react";
import BreadCrumbs from "../general-components/Breadcrumbs";
import { IoIosArrowForward } from "react-icons/io";
import AddUserModal from "../Modals/AddUserModal";
import DeleteUserModal from "..//Modals/DeleteUserModal";
import FixedSidebar from "../general-components/FixedSidebar";

const Profile = () => {
  const listInnerRef = useRef(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [innerRef, setInnerRef] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [profileDataTab, setProfileDataTab] = useState(0);

  // Check left Scroll reached
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScrollLeft = () => {
    if (innerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = listInnerRef.current;
      const isNearLeft =
        Math.round(scrollLeft) + 1 + clientWidth >= scrollWidth;
      if (isNearLeft) {
        setShowLeftArrow(false);
      } else {
        setShowLeftArrow(true);
      }
      if (scrollLeft === 0) {
        setShowRightArrow(false);
      } else {
        setShowRightArrow(true);
      }
    } else {
      console.error("on bottom scroll error");
    }
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };
  const closeDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
  };

  const slideLeft = () => {
    console.log("calling");
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  // onScroll left handler
  useEffect(() => {
    setInnerRef(listInnerRef.current);
    if (innerRef) {
      innerRef.addEventListener("scroll", onScrollLeft);
      // Clean-up
      return () => {
        innerRef.removeEventListener("scroll", onScrollLeft);
      };
    }
  }, [innerRef, onScrollLeft]);
  return (
    <>
      {/* <FixedSidebar /> */}
      <div className="sectiona overflow-y-auto">
        <div className="m-10 flex flex-col space-y-8">
          {/* Breadcrumbs */}
          <BreadCrumbs nav1="Profile"  />

          {/* User Banner Card */}
          <div className="relative  w-full image-shade">
            {/* Dynamic */}
            <img src="/assets/png/background.png" />

            {/* Right bar */}
            <div className=" flex z-10 flex-row space-x-6  items-center justify-center bg-white absolute rounded-lg p-3 top-6 right-6">
              <img src="/assets/png/eye.png" className="h-5 w-5" />
              <img src="/assets/png/verified-badge.png" className="h-5 w-5" />
              <img src="/assets/png/edit.png" className="h-5 w-5" />
              <img src="/assets/png/delete.png" className="h-5 w-5" />
            </div>

            <div className="absolute z-10 flex  justify-around w-full items-center bottom-7 text-white">
              <div className="flex flex-row space-x-6  items-center">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                  className="w-20 rounded-lg"
                />

                <div className="flex flex-col items-center space-y-2">
                  <h5>Arvinth Kumar</h5> <h6>@aksgs</h6>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <h5>Account Type</h5> <h6>Casual gamer</h6>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h5>Followers</h5> <h6>35k</h6>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h5>Following</h5> <h6>234</h6>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h5>Profile</h5>
                <div className="flex flex-row items-center space-x-5">
                  <img src="/assets/png/icons-posts.png" className="h-6 w-6" />
                  <img src="/assets/png/icons-spam.png" className="h-6 w-6" />
                  <img
                    src="/assets/png/icons-tutorial.png"
                    className="h-6 w-6"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Users Tab List */}
          <div className="relative flex  items-center">
            {showRightArrow && (
              <IoIosArrowForward
                size={40}
                className="absolute left-0 bottom-0 rotate-180 p-2 bg-[#F1F1F9] cursor-pointer"
                onClick={slideRight}
              />
            )}
            <div
              id="slider"
              ref={listInnerRef}
              className="flex space-x-9 px-5 w-full overflow-x-scroll scroll-smooth"
            >
              <h5
                className={`${
                  profileDataTab === 0
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(0)}
              >
                Personal&nbsp;Info
              </h5>
              <h5
                className={`${
                  profileDataTab === 1
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(1)}
              >
                Account&nbsp;LoginInfo
              </h5>
              <h5
                className={`${
                  profileDataTab === 2
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(2)}
              >
                Activity
              </h5>
              <h5
                className={`${
                  profileDataTab === 3
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(3)}
              >
                User&nbsp;Report
              </h5>
              <h5
                className={`${
                  profileDataTab === 4
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(4)}
              >
                Wallet&nbsp;Details
              </h5>
              <h5
                className={`${
                  profileDataTab === 5
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(5)}
              >
                Posts
              </h5>
              <h5
                className={`${
                  profileDataTab === 6
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(6)}
              >
                Games&nbsp;Played
              </h5>
              <h5
                className={`${
                  profileDataTab === 7
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(7)}
              >
                Device&nbsp;Info
              </h5>
              <h5
                className={`${
                  profileDataTab === 8
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(8)}
              >
                Linked&nbsp;Games
              </h5>
              <h5
                className={`${
                  profileDataTab === 9
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(9)}
              >
                Games&nbsp;Stats
              </h5>
              <h5
                className={`${
                  profileDataTab === 10
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(10)}
              >
                Chat
              </h5>
              <h5
                className={`${
                  profileDataTab === 11
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(11)}
              >
                Interests
              </h5>
              <h5
                className={`${
                  profileDataTab === 12
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(12)}
              >
                Tournament&nbsp;Details
              </h5>
              <h5
                className={`${
                  profileDataTab === 13
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(13)}
              >
                Ad&nbsp;View&nbsp;Home
              </h5>
              <h5
                className={`${
                  profileDataTab === 14
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(14)}
              >
                Avatar&nbsp;History
              </h5>
              <h5
                className={`${
                  profileDataTab === 15
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(15)}
              >
                Verification
              </h5>
            </div>
            {showLeftArrow && (
              <IoIosArrowForward
                size={40}
                className="absolute right-0 bottom-0 p-2 bg-[#F1F1F9] cursor-pointer"
                onClick={slideLeft}
              />
            )}
          </div>

          {/* User Table cards */}
          <div className="flex flex-col space-y-5 text-[#242424] card card-shadow w-full h-[350px] mt-20 p-8">
            {/* <h1 className="p-4 m-2 text-xl">
              Personal Information
              <div className="flex justify-end">
                <BiSolidPencil className="m-1" />
                Edit
              </div>
            </h1>

            <div className="grid grid-rows-2 grid-flow-col p-4 m-4 gap-6 ">
              <h4>
                First Name<h5 className="font-bold">Arvinth</h5>
              </h4>

              <h4>
                User Name<h5 className="font-bold">arvi2154</h5>
              </h4>
              <h4>
                Last Name<h5 className="font-bold">Kumar</h5>
              </h4>
            </div> */}
            <h5 className="font-semibold text-xl">Personal Information</h5>
            {/* inside card */}
            <div className="card w-full h-[250px] border-[1px] border-gray-300 p-5">
              {/* Edit button */}
              <div className="flex justify-end">
                <div className="flex flex-row items-center space-x-3 px-3 py-2 rounded-full border-[1px] border-gray-300">
                  <img src="/assets/png/edit.png" />
                  <h5>Edit</h5>
                </div>
              </div>

              <div className="flex flex-col space-y-6 w-1/2 h-full">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col space-y-1">
                    <h4>First Name</h4>
                    <h6 className="font-semibold">Shiva</h6>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <h4>Last Name</h4>
                    <h6 className="font-semibold">SJ</h6>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <h4>Username</h4>
                  <h6 className="font-semibold">ShivSJSJ</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddUserModal open={isAddUserModalOpen} close={closeAddUserModal} />
      <DeleteUserModal
        open={isDeleteUserModalOpen}
        close={closeDeleteUserModal}
      />
    </>
  );
};

export default Profile;























// import { useNavigate } from "react-router-dom";
// import { useState, useRef } from "react";
// import BreadCrumbs from "../general-components/Breadcrumbs";

// import { FiEdit } from "react-icons/fi";
// import FixedSidebar from "../general-components/FixedSidebar";
// export default function Profile() {
//   const [avatar, setAvatar] = useState(null);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState(null);
//   const navigate = useNavigate();
//   const inputRefImage = useRef();
//   const handleFileUpload = (ev) => {
//     const fileUploaded = ev.target.files[0];
//     let acceptProfileFileTypes = fileUploaded.type.match(
//       /^image\/(jpe?g|png|gif)/
//     );
//     if (fileUploaded && acceptProfileFileTypes) {
//       if (fileUploaded.size < 5242880) {
//         setAvatar(window.URL.createObjectURL(fileUploaded));
//       }
//     }
//   };

//   return (
//     <>
//     <FixedSidebar/>
//     <div className="section">
//       <div className="border bg-white m-4 p-2 py-4 rounded-lg">
//         <div className="flex gap-x-5">
//           <div
//             className={
//               location.pathname === "/profile"
//                 ? "font-semibold flex gap-1"
//                 : "flex gap-1"
//             }
//           >
//             Personal Info
//           </div>
//           <div
//             className={"flex gap-1 cursor-pointer"}
//             onClick={() => {
//               navigate("/changepassword");
//             }}
//           >
//             Change Password
//           </div>
//         </div>
//       </div>
//       <div className="h-screen bg-white mx-4 p-2 rounded-lg">
//       <div className="mx-2  flex flex-row justify-between border-b-2 bg-white  ">
//         <BreadCrumbs nav1="Users" nav2="Profile " />

//         <button className="border bg-blue-400 p-2 m-2 rounded-lg text-white">
//           Submit
//         </button>
//       </div>
    
//       <div className="rounded-full  mb-10 flex flex-col items-center ">
//         <input
//           type="file"
//           className="hidden"
//           ref={inputRefImage}
//           onChange={handleFileUpload}
//         />
//         <div>
//           <img
//             className="rounded-full h-40 w-40"
//             src={avatar ? avatar : "assets/png/icons-avatar.png"}
//           />
//         </div>
//         <FiEdit
//           // eslint-disable-next-line no-undef
//           onClick={() => inputRefImage.current.click()}
//           className="text-xl text-black content-end"
//         />
     

//       <div className="flex flex-wrap gap-y-5 m-4 p-2 ">
//         <div className="w-1/3">
//           <div className="flex flex-col gap-2">
//             <div>FirstName</div>
//             <div className="input-wrapping-div">
//               <input
//                 className="form-input-text border rounded-lg p-2"
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => {
//                   setFirstName(e.target.value);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="w-1/3">
//           <div className="flex flex-col gap-2">
//             <div>LastName</div>
//             <div className="input-wrapping-div">
//               <input
//                 className="form-input-text border rounded-lg p-2"
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => {
//                   setLastName(e.target.value);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="w-1/3">
//           <div className="flex flex-col gap-2">
//             <div>Email</div>
//             <div className="input-wrapping-div">
//               <input
//                 className="form-input-text border rounded-lg p-2"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="w-1/3">
//           <div className="flex flex-col gap-2">
//             <div>Gender</div>
//             <div className="input-wrapping-div">
//               <select className="form-input-text border rounded-lg p-2 px-16 ">
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Others</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="input-main-div">
//           <div>Phone Number</div>
//           <input
//             className="form-input-text border rounded-lg p-2 mt-1"
//             type="phone"
//             placeholder="Phone"
//             value={phone}
//           />

//         </div>
//       </div>
//       </div> 
//     </div>
//     </div>
//     </>
//   );
// }
