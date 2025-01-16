import { useEffect, useRef, useState } from "react";
import FixedSidebar from "/src/components/general-components/FixedSidebar";
import BreadCrumbs from "/src/components/general-components/Breadcrumbs";
import ActionButton from "/src/components/general-components/ActionButton";
import constants from "/src/json/constants.json";
import {
  MdCloseFullscreen,
  MdOpenInFull,
  MdOutlineEditNote,
  MdOutlineFilterAlt,
} from "react-icons/md";
import { IoIosSearch, IoMdAddCircleOutline } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import AddInBlogs from "/src/components/Modals/AddInBlogs";
import { apiList, invokeApi } from "/src/utils/apiServiceUtils"; // Importing from a custom file
import { useCookies } from "react-cookie";
import { config } from "../../../../utils/configUtils";
import helperUtils from "/src/utils/helperUtils";
import { useNavigate } from "react-router-dom";
import FilterModal from "/src/components/Modals/FilterModal";
import { IoSearchOutline } from "react-icons/io5";
import ConformationPopup from "/src/components/general-components/ConfirmationPopup";
import Spinner from "/src/components/general-components/Spinner";
import EditBlogModal from "../../../Modals/EditBlogModal";

const Blogs = () => {
  const navigate = useNavigate();
  const listInnerRef = useRef(null);

  const [cookies] = useCookies();

  const [invokeBlogs, setInvokeBlogs] = useState(true);
  const [blogsData, setBlogsData] = useState(null);
  const [totalBlogs, setTotalBlogs] = useState(null);
  const [skip, setSkip] = useState(0);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("0-10");
  const [searchQuary, setsearchQuary] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filteredBlogData, setFilteredBlogData] = useState([]);

  const [toggleId, setToggleId] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(null);
  const [innerRef, setInnerRef] = useState(null);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [maxDistReached, setMaxDistReached] = useState(false);
  const [iSFullscreenModalOpen, setISFullscreenModalOpen] = useState(false);

  const [confirmPopup, setConfirmPopup] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [openAddInBlogs, setOpenAddInBlogs] = useState(false);
  const onCloseAddBlogs = () => {
    setOpenAddInBlogs(false);
  };
  const [isBlogEditModalOpen, setIsBlogEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const onCloseEditBlogs = () => {
    setIsBlogEditModalOpen(false);
  };
  const [addBlogData, setAddBlogData] = useState({
    title: "",
    description: "",
    duration: "",
    type: "",
    status: "",
    docs: "",
    url: "",
  });
  const [tags, setTags] = useState([]);
  const [invokeBlog, setinvokeBlog] = useState(true);
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

  const [blogTabList, setBlogTabList] = useState(0);
  //items for page
  const itemsPerPage = parseInt(selectedItemsPerPage.split("-")[1]);

  // Check bottom Scroll reached
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll = () => {
    if (innerRef) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if (isNearBottom && !isDataFetching && !maxDistReached) {
        setSkip(skip + 10);
        setInvokeBlogs(true);
      }
    } else {
      console.error("on bottom scroll error");
    }
  };

  // onScroll effect handler
  useEffect(() => {
    setInnerRef(listInnerRef.current);
    if (innerRef) {
      innerRef.addEventListener("scroll", onScroll);
      // Clean-up
      return () => {
        innerRef.removeEventListener("scroll", onScroll);
      };
    }
  }, [innerRef, onScroll]);

  // useEffect(() => {
  //   const getBlogList = async () => {
  //     setIsDataFetching(true);
  //     let params = {
  //       skip: skip,
  //       limit: itemsPerPage,
  //       search: searchQuary,
  //     };
  //     let response = await invokeApi(
  //       config.baseUrl + apiList.getBlogList,
  //       params,
  //       cookies
  //     );
  //     console.log(response.data);
  //     if (response.customcode === 200) {
  //       setBlogsData(response.data);
  //       setTotalBlogs(response.total);
  //       if (response.data.length < itemsPerPage) {
  //         setMaxDistReached(true);
  //       } else {
  //         setMaxDistReached(false);
  //       }
  //       if (skip > 0) {
  //         setBlogsData([...blogsData, ...response.data]);
  //         setIsFetchLoading(false);
  //       } else {
  //         setBlogsData(response.data);
  //       }
  //       setTotalBlogs(response.total);
  //       setIsLoading(false);
  //       setIsDataFetching(false);
  //     } else if (response.customcode === 201) {
  //       navigate("/logout");
  //     } else {
  //       alert("Something went wrong while fetching getBlogpediaList");
  //     }
  //   };
  //   if (invokeBlogs) {
  //     setInvokeBlogs(false);
  //     setIsFetchLoading(false);
  //     getBlogList();
  //   }
  // }, [cookies, invokeBlogs, navigate, skip, itemsPerPage]);
  useEffect(() => {
    const getBlogList = async () => {
      setIsDataFetching(true);
      let params = {
        skip: skip,
        limit: itemsPerPage,
        search: searchQuary,
      };
      let response = await invokeApi(
        config.baseUrl + apiList.getBlogList,
        params,
        cookies
      );
      console.log(response.data);
      if (response.customcode === 200) {
        const newBlogsData = response.data;
        if (skip > 0) {
          setBlogsData([...blogsData, ...newBlogsData]);
        } else {
          setBlogsData(newBlogsData);
        }
        setTotalBlogs(response.total);
        setMaxDistReached(newBlogsData.length < itemsPerPage);
        setIsLoading(false);
        setIsDataFetching(false);
        const filteredData = filterBlogsByTab(newBlogsData, blogTabList);
        setFilteredBlogData(filteredData);
      } else if (response.customcode === 201) {
        navigate("/logout");
      } else {
        alert("Something went wrong while fetching getBlogpediaList");
      }
    };
    if (invokeBlogs) {
      setInvokeBlogs(false);
      setIsFetchLoading(false);
      getBlogList();
    }
  }, [cookies, invokeBlogs, navigate, skip, itemsPerPage, blogTabList]);

  

  
  const handleSearchQueary = (e) => {
    setsearchQuary(e.target.value);
    setIsLoading(true);
    setInvokeBlogs(true);
  };

  //change the Blog status
  const changeStatusBlog = async () => {
    console.log(toggleId, "toggleID");
    let params = {
      id: toggleId,
      status: toggleStatus,
    };
    let response = await invokeApi(
      config.baseUrl + apiList.changeStatusBlog,
      params,
      cookies
    );
    if (response.customcode === 200) {
      responseUtils.showToster(response);
      setInvokeBlogs(true);
      setActionStatus("");
      setToggleId(null);
    } else if (response.customcode === 201) {
      navigate("/logout");
    } else {
      alert("Something went wrong while changing Blog status");
    }
  };

  // const archiveBlog = async () => {
  //   let params = {
  //     id: toggleId,
  //   };
  //   console.log(toggleId);
  //   let response = await invokeApi(
  //     config.baseUrl + apiList.deleteBlog,
  //     params,
  //     cookies
  //   );
  //   responseUtils.showToster(response);
  //   if (response.customcode === 200) {
  //     setInvokeBlogs(true);
  //     setToggleId(null);
  //     setActionStatus("");
  //   } else if (response.customcode === 201) {
  //     navigate("/logout");
  //   } else {
  //     alert("Something went wrong while deleting Job");
  //   }
  // };

  const confirmStatusHandler = (confirmStatus) => {
    if (confirmStatus) {
      if (actionStatus === "toggleStatus") changeStatusBlog();
      setInvokeBlogs(true);
    }
    return null;
  };

  const filterBlogsByTab = (blogs, tab) => {
    if (!blogs) return [];
    if (tab === 0) {
      return blogs.filter((blog) => blog.status === "ACTIVE");
    } else if (tab === 1) {
      return blogs.filter((blog) => blog.status === "INACTIVE");
    }
    return blogs;
  };
  
  useEffect(() => {
    const filteredData = filterBlogsByTab(blogsData, blogTabList);
    setFilteredBlogData(filteredData);
  }, [blogsData, blogTabList]);

  return (
    <>
      <FixedSidebar />
      <div className="section">
        <div className="m-10 flex flex-col space-y-8">
          <BreadCrumbs
            nav1="Landing Page"
            nav2={`${
              blogTabList === 0
                ? "Active Blogs"
                : blogTabList === 1
                  ? "Inactive Blogs"
                  : ""
            }`}
          />
          <div>
            <h1 className="text-[#242424] dark:text-white text-3xl font-bold leading-normal tracking-normal">
              Blogs
            </h1>
          </div>

          <div className="flex flex-row items-center space-x-20">
            <h5
              className={`${
                blogTabList === 0
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setBlogTabList(0);
              }}
            >
              Active Blogs
            </h5>
            <h5
              className={`${
                blogTabList === 1
                  ? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
                  : "text-[#949495] font-semibold cursor-pointer"
              }`}
              onClick={() => {
                setBlogTabList(1);
              }}
            >
              Inactive Blogs
            </h5>
          </div>
          {/**Game table starts */}
          <div className="flex flex-col space-y-5 card card-shadow w-full h-[500px]">
            {/**table header */}
            <div className="flex flex-row items-center justify-between px-7 pt-5">
              {/**left */}
              <div className="flex flex-row items-center space-x-5">
                <img src="/assets/svg/blogs.svg" alt="" className="w-10 h-10" />
                <h5 className=" font-semibold dark:text-white">Blog list</h5>
                <p className="dark:text-gray-400">
                  (Total Blogs: {totalBlogs})
                </p>
              </div>
              {/**Action Buttons */}
              {filteredBlogData?.some((el) => el.isChecked === true) > 0 && (
                <div className="flex gap-x-3">
                  <div
                    onClick={() => {
                      let tempData = [...filteredBlogData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setActionStatus("toggleStatus");
                      setToggleStatus(constants.ACTIVESTATUS);
                      setConfirmPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.ACTIVE}
                      color={constants.GREEN}
                    />
                  </div>
                  <div
                    onClick={() => {
                      let tempData = [...filteredBlogData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setActionStatus("toggleStatus");
                      setToggleStatus(constants.INACTIVESTATUS);
                      setConfirmPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.INACTIVE}
                      color={constants.BLUE}
                    />
                  </div>
                  {/* <div
                    onClick={() => {
                      let tempData = [...filteredBlogData];
                      let mapData = tempData
                        ?.filter((el) => el.isChecked === true)
                        .map((el) => el._id);
                      setToggleId(mapData);
                      setActionStatus("toggleDelete");
                      setConfirmPopup(true);
                    }}
                  >
                    <ActionButton
                      text={constants.DELETE}
                      color={constants.RED}
                    />
                  </div> */}
                </div>
              )}
              {/**Right */}
              <div className="flex flex-row items-center space-x-7">
                <div className="flex flex-row space-x-5 items-center">
                  <MdOutlineFilterAlt
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => setOpenFilterModal(true)}
                  />
                  <BiRefresh
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => {
                      setIsLoading(true);
                      setInvokeBlogs(true);
                    }}
                  />
                  <IoMdAddCircleOutline
                    size={30}
                    className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => {
                      setOpenAddInBlogs(true);
                    }}
                  />
                </div>
                {/**search input */}
                <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full ">
                  <IoSearchOutline size={30} className="dark:text-white" />
                  <input
                    className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                    placeholder="Search..."
                    value={searchQuary}
                    onChange={handleSearchQueary}
                  />
                </div>
                <MdOpenInFull
                  size={30}
                  className="dark:text-white cursor-pointer hover:dark:text-blue-400 hover:text-blue-400"
                  onClick={() => setISFullscreenModalOpen(true)}
                />
              </div>
            </div>
            {/**Loader */}
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {filteredBlogData?.length > 0 ? (
                  <div className="h-full overflow-y-auto " ref={listInnerRef}>
                    <table className="w-full text-sm text-left">
                      <thead className=" sticky top-0 z-10 border-b dark:text-white bg-[#242424] text-white">
                        <tr>
                          <th scope="col" className="text-center px-6 py-3">
                            <input
                              type="checkbox"
                              checked={filteredBlogData?.every(
                                (check) => check.isChecked
                              )}
                              onChange={() => {
                                let tempData = [...filteredBlogData];
                                let allChecked = tempData.every(
                                  (el) => el.isChecked
                                );
                                if (allChecked) {
                                  tempData.map((el) => (el.isChecked = false));
                                } else {
                                  tempData.map((el) => (el.isChecked = true));
                                }
                                setBlogsData(tempData);
                              }}
                            />
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            SL.No
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Blog
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Image
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Type
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Date
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBlogData?.map((el, index) => {
                          return (
                            <tr
                              className=" font-medium text-[#707070]"
                              key={index}
                            >
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                <input
                                  type="checkbox"
                                  checked={el?.isChecked ? true : false}
                                  onChange={() => {
                                    let tempData = [...filteredBlogData];
                                    tempData[index].isChecked =
                                      !tempData[index].isChecked;
                                    setBlogsData(tempData);
                                  }}
                                />
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {index + 1}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.title}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.image}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.type}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {helperUtils.getDateFormat(
                                  el.createdAt,
                                  "dd/mm/yyyy"
                                )}
                              </td>

                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                {el.status === "ACTIVE" ? (
                                  <div className="bg-green-400 font-light  text-white px-1.5 py-1 rounded-lg">
                                    Active
                                  </div>
                                ) : (
                                  <div className="bg-red-400 font-light  text-white px-1.5 py-1 rounded-lg">
                                    InActive
                                  </div>
                                )}
                              </td>
                              <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                <div className="flex flex-row space-x-3 items-center justify-center">
                                  <RxEyeOpen
                                    size={25}
                                    className="hover:dark:text-blue-400 hover:text-blue-400 cursor-pointer"
                                    onClick={() => {
                                      navigate(
                                        constants.PATH.NAVIGATEBLOGVIEW,
                                        {
                                          state: el._id,
                                        }
                                      );
                                    }}
                                 
                                  />
                                  <MdOutlineEditNote
                                    onClick={() => {
                                      setIsBlogEditModalOpen(true);
                                      setEditId(el._id);
                                    }}
                                    size={30}
                                    className="hover:dark:text-green-400 hover:text-green-400 cursor-pointer"
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {isFetchLoading ? (
                          <div className="h-full w-full flex items-center justify-center">
                            <Spinner />
                          </div>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="flex h-full w-full items-center justify-center font-semibold">
                    No data available
                  </p>
                )}
              </>
            )}
            {/**table */}
          </div>
        </div>
      </div>

      {iSFullscreenModalOpen && (
        <div className="fixed z-10 inset-0 bg-opacity-60 bg-black flex justify-center items-center">
          <div className="flex flex-col w-full h-full dark:border-white dark:bg-[#393939] bg-white text-black">
            <div className="flex flex-col space-y-5 card card-shadow w-full h-full">
              {/**table header */}
              <div className="flex flex-row items-center justify-between px-7 pt-5">
                {/**left */}
                <div className="flex flex-row items-center space-x-5">
                  <img
                    src="/assets/png/icons-game.png"
                    alt=""
                    className="w-10 h-10"
                  />
                  <h5 className=" font-semibold dark:text-white">Blog list</h5>
                  <p className="dark:text-gray-400">
                    (Total Blogs: {totalBlogs})
                  </p>
                </div>
                {/**Action Buttons */}
                {filteredBlogData?.some((el) => el.isChecked === true) > 0 && (
                  <div className="flex gap-x-3">
                    <div
                      onClick={() => {
                        let tempData = [...filteredBlogData];
                        let mapData = tempData
                          ?.filter((el) => el.isChecked === true)
                          .map((el) => el._id);
                        setToggleId(mapData);
                        setActionStatus("toggleStatus");
                        setToggleStatus(constants.ACTIVESTATUS);
                        setConfirmPopup(true);
                      }}
                    >
                      <ActionButton
                        text={constants.ACTIVE}
                        color={constants.GREEN}
                      />
                    </div>
                    <div
                      onClick={() => {
                        let tempData = [...filteredBlogData];
                        let mapData = tempData
                          ?.filter((el) => el.isChecked === true)
                          .map((el) => el._id);
                        setToggleId(mapData);
                        setActionStatus("toggleStatus");
                        setToggleStatus(constants.INACTIVESTATUS);
                        setConfirmPopup(true);
                      }}
                    >
                      <ActionButton
                        text={constants.INACTIVE}
                        color={constants.BLUE}
                      />
                    </div>
                  </div>
                )}
                {/**Right */}
                <div className="flex flex-row items-center space-x-7">
                  <div className="flex flex-row space-x-5 items-center">
                    <MdOutlineFilterAlt
                      size={30}
                      className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                      onClick={() => setOpenFilterModal(true)}
                    />
                    <BiRefresh
                      size={30}
                      className=" cursor-pointer  dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
                      onClick={() => {
                        setIsLoading(true);
                        setInvokeBlogs(true);
                      }}
                    />
                  </div>
                  {/**search input */}
                  <div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full ">
                    <IoSearchOutline size={30} className="dark:text-white" />
                    <input
                      className="outline-none bg-transparent dark:text-[#FFFFFF]  w-full me-5"
                      placeholder="Search..."
                      value={searchQuary}
                      onChange={handleSearchQueary}
                    />
                  </div>
                  <MdCloseFullscreen
                    size={30}
                    className="dark:text-white cursor-pointer hover:dark:text-blue-400 hover:text-blue-400"
                    onClick={() => setISFullscreenModalOpen(false)}
                  />
                </div>
              </div>
              {/**Loader */}
              {isLoading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  {filteredBlogData?.length > 0 ? (
                    <div className="h-full overflow-y-auto " ref={listInnerRef}>
                      <table className="w-full text-sm text-left">
                        <thead className=" sticky top-0 z-10 border-b dark:text-white bg-[#242424] text-white">
                          <tr>
                            <th scope="col" className="text-center px-6 py-3">
                              <input
                                type="checkbox"
                                checked={filteredBlogData?.every(
                                  (check) => check.isChecked
                                )}
                                onChange={() => {
                                  let tempData = [...filteredBlogData];
                                  let allChecked = tempData.every(
                                    (el) => el.isChecked
                                  );
                                  if (allChecked) {
                                    tempData.map(
                                      (el) => (el.isChecked = false)
                                    );
                                  } else {
                                    tempData.map((el) => (el.isChecked = true));
                                  }
                                  setBlogsData(tempData);
                                }}
                              />
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              SL.No
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Blog
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Image
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Type
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Date
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Status
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBlogData?.map((el, index) => {
                            return (
                              <tr
                                className=" font-semibold text-[#707070]"
                                key={index}
                              >
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  <input
                                    type="checkbox"
                                    checked={el?.isChecked ? true : false}
                                    onChange={() => {
                                      let tempData = [...filteredBlogData];
                                      tempData[index].isChecked =
                                        !tempData[index].isChecked;
                                      setBlogsData(tempData);
                                    }}
                                  />
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {index + 1}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {el.title}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {el.image}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {el.type}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {helperUtils.getDateFormat(
                                    el.createdAt,
                                    "dd/mm/yyyy"
                                  )}
                                </td>

                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  {el.status === "ACTIVE" ? (
                                    <div className="bg-green-400 font-light  text-white px-1.5 py-1 rounded-lg">
                                      Active
                                    </div>
                                  ) : (
                                    <div className="bg-red-400 font-light  text-white px-1.5 py-1 rounded-lg">
                                      InActive
                                    </div>
                                  )}
                                </td>
                                <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                  <div className="flex flex-row space-x-3 items-center justify-center">
                                    <RxEyeOpen
                                      size={25}
                                      className="hover:dark:text-blue-400 hover:text-blue-400 cursor-pointer"
                                      onClick={() => {
                                        navigate(
                                          constants.PATH.NAVIGATEGAMEPEDIAVIEW,
                                          {
                                            state: el._id,
                                          }
                                        );
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                          {isFetchLoading ? (
                            <div className="h-full w-full flex items-center justify-center">
                              <Spinner />
                            </div>
                          ) : null}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="flex h-full w-full items-center justify-center font-semibold">
                      No data available
                    </p>
                  )}
                </>
              )}
              {/**table */}
            </div>
          </div>
        </div>
      )}

      {openFilterModal && (
        <FilterModal
          setOpenFilterModal={setOpenFilterModal}
          filterType={filterType}
          setFilterType={setFilterType}
          setIsLoading={setIsLoading}
          setInvokeFunction={setInvokeBlogs}
          selectedItemsPerPage={selectedItemsPerPage}
          setSelectedItemsPerPage={setSelectedItemsPerPage}
          data={blogsData}
        />
      )}
      <ConformationPopup
        open={confirmPopup}
        close={() => setConfirmPopup(false)}
        text={
          actionStatus === "toggleStatus"
            ? constants.CHANGESTATUSPOPUPTEXT
            : constants.CHANGEDELETEPOPUPTEXT
        }
        heading={
          actionStatus === "toggleStatus"
            ? constants.STATUSCHANGE
            : constants.DELETESTATUS
        }
        submitHandler={confirmStatusHandler}
      />
      <AddInBlogs open={openAddInBlogs} close={onCloseAddBlogs} />
      {isBlogEditModalOpen && (
        <EditBlogModal
          isBlogEditModalOpen={isBlogEditModalOpen}
          close={onCloseEditBlogs}
          editId={editId}
        />
      )}
    </>
  );
};

export default Blogs;
