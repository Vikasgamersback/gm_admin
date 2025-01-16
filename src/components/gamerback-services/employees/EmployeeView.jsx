import { useState, useEffect, useRef } from "react";
// import { IoIosArrowForward } from "react-icons/io";
// import AddUserModal from "../../../Modals/AddUserModal";
// import DeleteUserModal from "../../../Modals/DeleteUserModal";
// import { BiSolidPencil } from "react-icons/bi";
// import FixedSidebar from "../../../general-components/FixedSidebar";
import { apiList, invokeApi } from "../../../utils/apiServiceUtils";
import { config } from "../../../utils/configUtils";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import BreadCrumbs from "../../general-components/Breadcrumbs";
// import FixedSidebar from "../../general-components/FixedSidebar";
import constants from "../../../json/constants.json";
import utils from "../../../utils/helperUtils";
import { MdOutlineEditNote } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import EditEmployeesModal from "../../Modals/EditEmployeesModal";
import ConformationPopup from "../../general-components/ConfirmationPopup";
import responseUtils from "../../../utils/responseUtils.js";

const EmployeeView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const listInnerRef = useRef(null);
  const [cookies] = useCookies();
  //   const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  //   const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  // const [innerRef, setInnerRef] = useState(null);
  // const [showLeftArrow, setShowLeftArrow] = useState(true);
  // const [showRightArrow, setShowRightArrow] = useState(false);
  const [profileDataTab, setProfileDataTab] = useState(0);
  const [employeeData, setEmployeeData] = useState(0);
  // const [isDataFetching, setIsDataFetching] = useState(true);
  const [invokeEmployee, setInvokeEmployee] = useState(true);
  const [isEmployeeEditModalOpen, setIsEmployeeEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(false);

  // Check left Scroll reached
  // 
  //   const onScrollLeft = () => {
  //     if (innerRef) {
  //       const { scrollLeft, scrollWidth, clientWidth } = listInnerRef.current;
  //       const isNearLeft =
  //         Math.round(scrollLeft) + 1 + clientWidth >= scrollWidth;
  //       if (isNearLeft) {
  //         setShowLeftArrow(false);
  //       } else {
  //         setShowLeftArrow(true);
  //       }
  //       if (scrollLeft === 0) {
  //         setShowRightArrow(false);
  //       } else {
  //         setShowRightArrow(true);
  //       }
  //     } else {
  //       console.error("on bottom scroll error");
  //     }
  //   };

  //   const slideLeft = () => {
  //     let slider = document.getElementById("slider");
  //     slider.scrollLeft = slider.scrollLeft + 500;
  //   };

  //   const slideRight = () => {
  //     let slider = document.getElementById("slider");
  //     slider.scrollLeft = slider.scrollLeft - 500;
  //   };

  // onScroll left handler
  //   useEffect(() => {
  //     setInnerRef(listInnerRef.current);
  //     if (innerRef) {
  //       innerRef.addEventListener("scroll", onScrollLeft);
  //       // Clean-up
  //       return () => {
  //         innerRef.removeEventListener("scroll", onScrollLeft);
  //       };
  //     }
  //   }, [innerRef, onScrollLeft]);

  // get template data
  useEffect(() => {
    const getEmployee = async () => {
      let params = {
        _id: location?.state,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getAdminDetail,
        params,
        cookies
      );

      if (response.customcode === 200) {
        setEmployeeData(response.data);
        // setIsDataFetching(false);
      } else if (response.customcode === 201) {
        navigate("logout");
      } else {
        alert("Something went wrong");
      }
    };
    if (invokeEmployee) {
      setInvokeEmployee(false);
      getEmployee();
    }
  }, [cookies, invokeEmployee, location?.state, navigate]);

  // ArchiveAdmin
  const archiveAdmin = async () => {
    let params = {
      id: [employeeData._id],
    };
    let response = await invokeApi(
      config.baseUrl + apiList.archiveAdmin,
      params,
      cookies
    );
    responseUtils.showToster(response);
    if (response.customcode === 200) {
      navigate("/employee-list");
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong");
    }
  };

  // popup confirm status handler
  const confirmStatusHandler = (confirmStatus) => {
    if (confirmStatus) {
      archiveAdmin();
    } else {
      return null;
    }
  };

  const onCloseEmpEditModal = () => {
    setIsEmployeeEditModalOpen(false);
    setInvokeEmployee(true);
  };

  return (
    <>
      {/* <FixedSidebar /> */}
      <div className="sectiona overflow-y-auto">
        <div className="m-10 flex flex-col space-y-8">
          {/* Breadcrumbs */}
          <BreadCrumbs
            nav1="Employee"
            nav2={
              profileDataTab === 0
                ? "Basic Information"
                : profileDataTab === 1
                ? "Contact Details"
                : profileDataTab === 2
                ? "Identify Information"
                : profileDataTab === 3
                ? "Work Information"
                : profileDataTab === 4
                ? "Work Experience"
                : profileDataTab === 5
                ? "Educational Qualification"
                : ""
            }
          />

          {/* User Banner Card */}
          <div className="relative  w-full image-shade">
            {/* Dynamic */}
            <img src="/assets/png/background.png" />

            {/* Right bar */}
            <div className=" flex z-10 flex-row space-x-4  items-center justify-center bg-white absolute rounded-lg p-3 top-6 right-6">
              <MdOutlineEditNote
                size={30}
                className="hover:text-green-600 cursor-pointer"
                onClick={() => {
                  setIsEmployeeEditModalOpen(true);
                  setEditId(employeeData._id);
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

            <div className="absolute z-10 flex  justify-start ps-10 space-x-10 w-full items-center bottom-7 text-white">
              <div className="flex flex-row space-x-6  items-end">
                <img
                  src={employeeData?.avatar}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex flex-col items-center space-y-2">
                  <h5 className=" uppercase font-semibold">
                    {employeeData?.firstName}
                  </h5>
                  <h6 className="bg-gray-500 px-2 rounded">
                    @{employeeData?.nickName}
                  </h6>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <h5 className="font-semibold ">Account Type</h5>{" "}
                  <h6 className=" lowercase bg-gray-500 px-2 rounded">
                    {employeeData?.adminType}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          {/* Users Tab List */}
          <div className="relative flex  items-center">
            {/* {showRightArrow && (
              <IoIosArrowForward
                size={40}
                className="absolute left-0 bottom-0 rotate-180 p-2 bg-[#F1F1F9] cursor-pointer"
                onClick={slideRight}
              />
            )} */}
            <div
              id="slider"
              ref={listInnerRef}
              className="flex space-x-9 px-5 w-full overflow-x-scroll scroll-smooth"
            >
              <h5
                className={`${
                  profileDataTab === 0
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(0)}
              >
                Basic&nbsp;Information
              </h5>
              <h5
                className={`${
                  profileDataTab === 1
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(1)}
              >
                Contact&nbsp;Details
              </h5>
              <h5
                className={`${
                  profileDataTab === 2
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(2)}
              >
                Identity&nbsp;Information
              </h5>
              <h5
                className={`${
                  profileDataTab === 3
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(3)}
              >
                Work&nbsp;Information
              </h5>
              <h5
                className={`${
                  profileDataTab === 4
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(4)}
              >
                Work&nbsp;Experience
              </h5>
              <h5
                className={`${
                  profileDataTab === 5
                    ? "border-b-[#1492E6] border-b-[4px] dark:text-white font-semibold"
                    : "pb-2 cursor-pointer dark:text-gray-400"
                }`}
                onClick={() => setProfileDataTab(5)}
              >
                Educational&nbsp;Qualification
              </h5>
              {/* <h5
                className={`${
                  profileDataTab === 6
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(6)}
              >
                Status
              </h5> */}
              {/* <h5
                className={`${
                  profileDataTab === 7
                    ? "border-b-[#1492E6] border-b-[4px]"
                    : "pb-2 cursor-pointer"
                }`}
                onClick={() => setProfileDataTab(7)}
              >
                Password
              </h5> */}
            </div>
            {/* {showLeftArrow && (
              <IoIosArrowForward
                size={40}
                className="absolute right-0 bottom-0 p-2 bg-[#F1F1F9] cursor-pointer"
                onClick={slideLeft}
              />
            )} */}
          </div>

          {/* User Table cards */}
          {profileDataTab === 0 && (
            <div className="flex flex-col space-y-5 text-[#242424] card card-shadow w-full h-[350px] mt-20 p-8">
              <h5 className="font-semibold text-xl dark:text-white">
                {constants.BASICINFORMATION}
              </h5>
              {/* inside card */}
              <div className="card w-full h-[250px] overflow-y-auto border-[1px] border-gray-300 p-5">
                <div className="flex flex-col  space-y-6 w-full h-full">
                  {/* row 1 */}
                  <div className="flex flex-row">
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">First Name</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.firstName}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Last Name</h4>
                      <h6 className="font-semibold  dark:text-white">
                        {employeeData?.lastName}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Username</h4>
                      <h6 className="font-semibold  dark:text-white">
                        {" "}
                        {utils.getDateFormat(employeeData?.dob, "dd/mm/yyyy")}
                      </h6>
                    </div>
                  </div>
                  {/* row 2 */}
                  <div className="flex flex-row">
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Gender</h4>
                      <h6 className="font-semibold  dark:text-white">
                        {employeeData?.gender}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Martial Status</h4>
                      <h6 className="font-semibold  dark:text-white">
                        {employeeData?.maritalStatus}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Employee ID</h4>
                      <h6 className="font-semibold  dark:text-white">
                        {employeeData?.employeeId}
                      </h6>
                    </div>
                  </div>
                  {/* row 3 */}
                  <div className="flex flex-row">
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">About me</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.aboutMe}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Nick name</h4>
                      <h6 className="font-semibold  dark:text-white">
                        {employeeData?.nickName}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Status</h4>
                      <h6 className="font-semibold  dark:text-white">
                        {employeeData?.status}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {profileDataTab === 1 && (
            <div className="flex flex-col space-y-5 text-[#242424] card card-shadow w-full h-[350px] mt-20 p-8">
              <h5 className="font-semibold text-xl dark:text-white">
                {constants.CONTACTINFORMATION}
              </h5>
              {/* inside card */}
              <div className="card w-full h-[250px] overflow-y-auto border-[1px] border-gray-300 p-5">
                <div className="flex flex-col  space-y-6 w-full h-full">
                  {/* row 1 */}
                  <div className="flex flex-row">
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Phone</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.phone.code} {employeeData?.phone.number}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Email</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.email}
                      </h6>
                    </div>
                  </div>
                  {/* row 2 */}
                  <div className="flex flex-row">
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Present Address</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.presentAddress.addressLine1}
                      </h6>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.presentAddress.addressLine2}
                      </h6>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.presentAddress.city},{" "}
                        {employeeData?.presentAddress.state},{" "}
                        {employeeData?.presentAddress.country},
                      </h6>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.presentAddress.postalCode}.
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Permanent Address</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.permanentAddress?.addressLine1}
                      </h6>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.permanentAddress?.addressLine2}
                      </h6>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.permanentAddress?.city},{" "}
                        {employeeData?.permanentAddress?.state},{" "}
                        {employeeData?.permanentAddress?.country},
                      </h6>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.permanentAddress?.postalCode}.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {profileDataTab === 2 && (
            <div className="flex flex-col space-y-5 text-[#242424] card card-shadow w-full h-[350px] mt-20 p-8">
              <h5 className="font-semibold text-xl dark:text-white">
                {constants.IDENTITYINFORMATION}
              </h5>
              {/* inside card */}
              <div className="card w-full h-[250px] overflow-y-auto border-[1px] border-gray-300 p-5">
                <div className="flex flex-col  space-y-6 w-full h-full">
                  {/* row 1 */}
                  <div className="flex flex-row">
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Pan Number</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.panNumber}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Aadhaar Number</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.aadhaarNumber}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {profileDataTab === 3 && (
            <div className="flex flex-col space-y-5 text-[#242424] card card-shadow w-full h-[350px] mt-20 p-8">
              <h5 className="font-semibold text-xl dark:text-white">
                {constants.WORKINFORMATION}
              </h5>
              {/* inside card */}
              <div className="card w-full h-[250px] overflow-y-auto border-[1px] border-gray-300 p-5">
                <div className="flex flex-col  space-y-6 w-full h-full">
                  {/* row 1 */}
                  <div className="flex flex-row">
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Employee Type</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.employeeType}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Admin Type</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.adminType}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Date Of Joining</h4>
                      <h6 className="font-semibold dark:text-white">
                        {utils.getDateFormat(
                          employeeData?.dateOfJoining,
                          "dd/mm/yyyy"
                        )}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {profileDataTab === 4 && (
            <div className="flex flex-col space-y-5 text-[#242424] card card-shadow w-full h-[350px] mt-20 p-8">
              <h5 className="font-semibold text-xl dark:text-white">
                {constants.WORKEXPERIENCE}
              </h5>
              {/* inside card */}
              <div className="card w-full h-[250px] overflow-y-auto border-[1px] border-gray-300 p-5">
                <div className="flex flex-col  space-y-6 w-full h-full">
                  {console.log("employeeData ", employeeData?.workExperiance)}
                  {employeeData?.workExperiance.map((el, idx) => (
                    <div key={idx} className="flex flex-row">
                      <div className="flex flex-col space-y-1 w-[40%]">
                        <h4 className=" dark:text-gray-400">Company Name</h4>
                        <h6 className="font-semibold dark:text-white">
                          {el.companyName}
                        </h6>
                      </div>
                      <div className="flex flex-col space-y-1 w-[30%]">
                        <h4 className="dark:text-gray-400">Job Title</h4>
                        <h6 className="font-semibold dark:text-white">
                          {el.jobTitle}
                        </h6>
                      </div>
                      <div className="flex flex-col space-y-1 w-[20%]">
                        <h4 className=" dark:text-gray-400">From</h4>
                        <h6 className="font-semibold dark:text-white">
                          {utils.getDateFormat(el.from, "dd/mm/yyyy")}
                        </h6>
                      </div>
                      <div className="flex flex-col space-y-1 w-[20%]">
                        <h4 className=" dark:text-gray-400">To</h4>
                        <h6 className="font-semibold dark:text-white">
                          {utils.getDateFormat(el.to, "dd/mm/yyyy")}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {profileDataTab === 5 && (
            <div className="flex flex-col space-y-5 text-[#242424] card card-shadow w-full h-[350px] mt-20 p-8">
              <h5 className="font-semibold text-xl dark:text-white">
                {constants.EDUCATIONALQUALIFICATION}
              </h5>
              {/* inside card */}
              <div className="card w-full h-[250px] overflow-y-auto border-[1px] border-gray-300 p-5">
                <div className="flex flex-col  space-y-6 w-full h-full">
                  {employeeData?.educationalQulification.map((el, idx) => (
                    <div key={idx} className="flex flex-row">
                      <div className="flex flex-col space-y-1 w-[40%]">
                        <h4 className=" dark:text-gray-400">
                          Institution Name
                        </h4>
                        <h6 className="font-semibold dark:text-white">
                          {el.institutionName}
                        </h6>
                      </div>
                      <div className="flex flex-col space-y-1 w-[30%]">
                        <h4 className=" dark:text-gray-400">Degree</h4>
                        <h6 className="font-semibold dark:text-white">
                          {el.degree}
                        </h6>
                      </div>
                      <div className="flex flex-col space-y-1 w-[30%]">
                        <h4 className=" dark:text-gray-400">
                          Date Of Complition
                        </h4>
                        <h6 className="font-semibold dark:text-white">
                          {utils.getDateFormat(
                            el.dateOfCompletion,
                            "dd/mm/yyyy"
                          )}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {profileDataTab === 6 && (
            <div className="flex flex-col space-y-5 text-[#242424] card card-shadow w-full h-[350px] mt-20 p-8">
              <h5 className="font-semibold text-xl dark:text-white">
                {constants.WORKINFORMATION}
              </h5>
              {/* inside card */}
              <div className="card w-full h-[250px] overflow-y-auto border-[1px] border-gray-300 p-5">
                <div className="flex flex-col  space-y-6 w-full h-full">
                  {/* row 1 */}
                  <div className="flex flex-row">
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Employee Type</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.employeeType}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4 className=" dark:text-gray-400">Admin Type</h4>
                      <h6 className="font-semibold dark:text-white">
                        {employeeData?.adminType}
                      </h6>
                    </div>
                    <div className="flex flex-col space-y-1 w-[33.3%]">
                      <h4>Date Of Joining</h4>
                      <h6 className="font-semibold dark:text-white">
                        {utils.getDateFormat(
                          employeeData?.dateOfJoining,
                          "dd/mm/yyyy"
                        )}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isEmployeeEditModalOpen ? (
        <EditEmployeesModal
          isEmployeeEditModalOpen={isEmployeeEditModalOpen}
          close={onCloseEmpEditModal}
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

export default EmployeeView;
