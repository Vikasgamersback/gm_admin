// import { useEffect, useState } from "react";
// import FixedSidebar from "../../../general-components/FixedSidebar";
// import BreadCrumbs from "../../../general-components/Breadcrumbs";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
// import { config } from "../../../../utils/configUtils";
// import { MdOutlineEditNote } from "react-icons/md";
// import { FaRegTrashCan } from "react-icons/fa6";
// import EditThemeModal from "../../../Modals/EditThemeModal";
// import ConformationPopup from "../../../general-components/ConfirmationPopup";
// import constants from "../../../../json/constants.json";
// import responseUtils from "../../../../utils/responseUtils.js";

// const BlogView = () => {
//   const navigate = useNavigate();
//  // const location = useLocation();
//   const [cookies] = useCookies();

//   const [blogData, setAddBlogData] = useState(0);
//   const [invokeBlogs, setInvokeBlogs] = useState(true);

//  // const [isThemeEditModalOpen, setIsThemeEditModalOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [confirmPopup, setConfirmPopup] = useState(false);

//   // const oncloseEditModal = () => {
//   //   setIsThemeEditModalOpen(false);
//   // };

//   useEffect(() => {
//     const getBlogDetail = async () => {
//       try {
//         let params = {
//           _id: editId,
//         };
//         let response = await invokeApi(
//           config.baseUrl + apiList.getBlogDetail,
//           params,
//           cookies
//         );

//         if (response.customcode === 200) {
//           const {
//             title,
//             type,
//             status,
//             description,
//             duration,
//             docx,
//             url,
//             tags,
//             image,
//           } = response.data;

//           setAddBlogData({
//             title,
//             type,
//             status,
//             description,
//             duration,
//             docx,
//             url,
//           });
//        //   setTags(tags);
//       //    setImagePreviewFile(image);
//        //   setImageFile(image);
//         } else if (response.customcode === 201) {
//           navigate("/logout");
//         } else {
//           alert("Something went wrong while getting blog details");
//         }
//       } catch (error) {
//         console.error("Error fetching blog details:", error);
//         alert("An error occurred while fetching blog details");
//       }
//     };

//     if (invokeBlogs) {
//       setInvokeBlogs(false);
//       getBlogDetail();
//     }
//   }, [cookies, editId, navigate, invokeBlogs]);

//   // const archiveTheme = async () => {
//   //   let params = {
//   //     id: [themeData._id],
//   //   };
//   //   let response = await invokeApi(
//   //     config.baseUrl + apiList.deleteTheme,
//   //     params,
//   //     cookies
//   //   );
//   //   responseUtils.showToster(response);
//   //   if (response.customcode === 200) {
//   //     navigate("/themes");
//   //   } else if (response.customcode === 201) {
//   //     navigate("/logout");
//   //   } else {
//   //     alert("Something went wrong while deleting Theme");
//   //   }
//   // };

//   // popup confirm status handler
//   const confirmStatusHandler = (confirmStatus) => {
//     if (confirmStatus) {
//       // archiveTheme();
//     } else {
//       return null;
//     }
//   };

//   return (
//     <>
//       <FixedSidebar />
//       <div className="section overflow-y-auto">
//         <div className="m-10 flex flex-col space-y-8 ">
//           <BreadCrumbs nav1="Themes" nav2="Theme View" />
//           <div className=" relative w-full h-[500px] image-shade">
//             <img
//               src={blogData.url}
//               alt=""
//               className=" w-full bg-no-repeat h-96 object-cover rounded-3xl"
//             />
//             {/**Right */}
//             <div className=" flex z-10 flex-row space-x-4  items-center justify-center bg-white absolute rounded-lg p-3 top-6 right-6">
//               {/* <MdOutlineEditNote
//                 size={30}
//                 className="hover:text-green-600 cursor-pointer"
//                 onClick={() => {
//                   setIsThemeEditModalOpen(true);
//                   setEditId(themeData._id);
//                 }}
//               /> */}
//               <FaRegTrashCan
//                 size={20}
//                 className="hover:text-red-600 cursor-pointer"
//                 onClick={() => {
//                   setConfirmPopup(true);
//                 }}
//               />
//             </div>
//           </div>
//           <div className=" z-10 flex  justify-start ps-10 space-x-10 w-full items-center bottom-7 text-white">
//             <div className="flex flex-row space-x-6  items-start">
//               <img
//                 src={blogData?.url}
//                 className="w-44 h-44 object-cover rounded-lg"
//               />
//             </div>
//             <div>
//               <div className="flex flex-col space-y-3">
//                 <div className="flex  space-x-4 items-center">
//                   <p className="font-normal">Title </p>
//                   <p className="font-semibold">{blogData?.title}</p>
//                 </div>
//                 <div className="flex  space-x-4 items-center">
//                   <p className="font-normal">Description </p>
//                   <p className="font-semibold">{blogData?.description}</p>
//                 </div>
//                 <div className="flex space-x-4 items-center">
//                   <p className="font-normal">Status </p>
//                   <button
//                     className={`${
//                       blogData?.status === "ACTIVE"
//                         ? "bg-green-600"
//                         : "bg-gray-500"
//                     }  font-semibold  px-3 py-2 rounded`}
//                   >
//                     {blogData?.status}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* {isThemeEditModalOpen ? (
//         // <EditThemeModal
//         //   isThemeEditModalOpen={isThemeEditModalOpen}
//         //   close={oncloseEditModal}
//         //   editId={editId}
//         // />
//       ) : null} */}
//       <ConformationPopup
//         open={confirmPopup}
//         close={() => setConfirmPopup(false)}
//         text={constants.CHANGEDELETEPOPUPTEXT}
//         heading={constants.DELETESTATUS}
//         submitHandler={confirmStatusHandler}
//       />
//     </>
//   );
// };

// export default BlogView;


// import { useEffect, useState } from "react";
// import FixedSidebar from "../../../general-components/FixedSidebar";
// import BreadCrumbs from "../../../general-components/Breadcrumbs";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
// import { config } from "../../../../utils/configUtils";
// import { MdOutlineEditNote } from "react-icons/md";
// import { FaRegTrashCan } from "react-icons/fa6";
// import EditBlogModal from "../../../Modals/EditBlogModal"; // Ensure you have this modal or create it
// import ConformationPopup from "../../../general-components/ConfirmationPopup";
// import constants from "../../../../json/constants.json";
// import responseUtils from "../../../../utils/responseUtils.js";

// const BlogView = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [cookies] = useCookies();

//   const [blogData, setBlogData] = useState({});
//   const [invokeBlogs, setInvokeBlogs] = useState(true);

//   const [isBlogEditModalOpen, setIsBlogEditModalOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [confirmPopup, setConfirmPopup] = useState(false);

//   const oncloseEditModal = () => {
//     setIsBlogEditModalOpen(false);
//   };

//   useEffect(() => {
//     const getBlogDetail = async () => {
//       let params = {
//         _id: location?.state,
//       };
//       let response = await invokeApi(
//         config.baseUrl + apiList.getBlogDetail,
//         params,
//         cookies
//       );
//       if (response.customcode === 200) {
//         setBlogData(response.data);
//       } else if (response.customcode === 201) {
//         navigate("/logout");
//       } else {
//         alert("Something went wrong in Blog View");
//       }
//     };
//     if (invokeBlogs) {
//       setInvokeBlogs(false);
//       getBlogDetail();
//     }
//   }, [cookies, invokeBlogs, location?.state, navigate]);

//   const archiveBlog = async () => {
//     let params = {
//       id: [blogData._id],
//     };
//     try {
//       let response = await invokeApi(
//         config.baseUrl + apiList.deleteBlog,
//         params,
//         cookies
//       );
//       responseUtils.showToster(response);
//       if (response.customcode === 200) {
//         navigate("/blogs");
//       } else if (response.customcode === 201) {
//         navigate("/logout");
//       } else {
//         console.error("Error deleting blog:", response);
//         alert("Something went wrong while deleting Blog");
//       }
//     } catch (error) {
//       console.error("Exception deleting blog:", error);
//       alert("Something went wrong while deleting Blog");
//     }
//   };
//   const confirmStatusHandler = (confirmStatus) => {
//     if (confirmStatus) {
//       archiveBlog();
//     } else {
//       return null;
//     }
//   };

//   return (
//     <>
//       <FixedSidebar />
//       <div className="section overflow-y-auto">
//         <div className="m-10 flex flex-col space-y-8 ">
//           <BreadCrumbs nav1="Blogs" nav2="Blog View" />
//           <div className=" relative w-full h-[500px] image-shade">
//           <img
//               src={blogData.url || blogData.docs}
//               alt=""
//               className="w-full bg-no-repeat h-96 object-cover rounded-3xl"
//             />
//             <div className=" flex z-10 flex-row space-x-4  items-center justify-center bg-white absolute rounded-lg p-3 top-6 right-6">
//               <MdOutlineEditNote
//                 size={30}
//                 className="hover:text-green-600 cursor-pointer"
//                 onClick={() => {
//                   setIsBlogEditModalOpen(true);
//                   setEditId(blogData._id);
//                 }}
//               />
//               {/* <FaRegTrashCan
//                 size={20}
//                 className="hover:text-red-600 cursor-pointer"
//                 onClick={() => {
//                   setConfirmPopup(true);
//                 }}
//               /> */}
//             </div>
//           </div>
//           <div className=" z-10 flex  justify-start ps-10 space-x-10 w-full items-center bottom-7 text-white">
//             {/* <div className="flex flex-row space-x-6  items-start">
//               <img
//                 src={blogData?.url || blogData?.docs}
//                 className="w-44 h-44 object-cover rounded-lg"
//               />
//             </div> */}
//             <div>
//               <div className="flex flex-col space-y-3">
//                 <div className="flex  space-x-4 items-center">
//                   <p className="font-normal">Title </p>
//                   <p className="font-semibold">{blogData?.title}</p>
//                 </div>
//                 <div className="flex  space-x-4 items-center">
//                   <p className="font-normal">URL </p>
//                   <p className="font-semibold">{blogData?.url || blogData?.docs}</p>
//                 </div>
//                 <div className="flex  space-x-4 items-center">
//                   <p className="font-normal">Status </p>
//                   <button
//                     className={`${
//                       blogData?.status === "ACTIVE"
//                         ? "bg-green-600"
//                         : "bg-gray-500"
//                     }  font-semibold  px-3 py-2 rounded`}
//                   >
//                     {blogData?.status}
//                   </button>
//                 </div>
//                 <div className="flex space-x-4 items-center">
//                   <p className="font-normal">Description </p>
//                   <p className="font-semibold">{blogData?.description}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isBlogEditModalOpen ? (
//         <EditBlogModal
//           isBlogEditModalOpen={isBlogEditModalOpen}
//           close={oncloseEditModal}
//           editId={editId}
//         />
//       ) : null}
//       <ConformationPopup
//         open={confirmPopup}
//         close={() => setConfirmPopup(false)}
//         text={constants.CHANGEDELETEPOPUPTEXT}
//         heading={constants.DELETESTATUS}
//         submitHandler={confirmStatusHandler}
//       />
//     </>
//   );
// };

// export default BlogView;


import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";
import FixedSidebar from "../../../general-components/FixedSidebar";
import BreadCrumbs from "../../../general-components/Breadcrumbs";

const BlogView = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [cookies] = useCookies();

	const [blogData, setBlogData] = useState({});
	const [invokeBlog, setInvokeBlog] = useState(true);

	// Get blog data
	useEffect(() => {
		const getBlogDetail = async () => {
			let params = {
				_id: location?.state,
			};
			let response = await invokeApi(
				config.baseUrl + apiList.getBlogDetail,
				params,
				cookies
			);
			if (response.customcode === 200) {
				setBlogData(response.data);
			} else if (response.customcode === 201) {
				navigate("/logout");
			} else {
				alert("Something went wrong in blog view");
			}
		};
		if (invokeBlog) {
			setInvokeBlog(false);
			getBlogDetail();
		}
	}, [cookies, invokeBlog, location?.state, navigate]);

	const renderStatusButton = (status) => {
		const baseClasses = "px-4 py-2 rounded-full text-white font-semibold";
		return status === "ACTIVE" ? (
			<span className={`${baseClasses} bg-green-500`}>Active</span>
		) : (
			<span className={`${baseClasses} bg-red-500`}>Inactive</span>
		);
	};

	const styles = {
		card: {
			backgroundColor: '#27272a', // Tailwind's indigo-900
			color: 'white',
			padding: '20px',
			borderRadius: '8px',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		},
		image: {
			width: '100%',
			height: '256px',
			objectFit: 'cover',
			borderRadius: '8px',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		},
		link: {
			color: '#60A5FA', // Tailwind's blue-300
			textDecoration: 'underline',
		},
	};

	return (
		<>
			<FixedSidebar />
      <div className="section overflow-y-auto">
        <div className="m-10 flex flex-col space-y-8 ">
					<BreadCrumbs nav1="Blog View" nav2={blogData?.title} />
					<div style={styles.card}>
						<h1 className="text-3xl font-bold mb-4">{blogData?.title}</h1>
						<div className="flex space-x-10 mb-4">
							<p className="font-semibold">
								<span className="font-normal">Status: </span>{renderStatusButton(blogData?.status)}
							</p>
						</div>
						{blogData?.image && (
							<div className="mb-8">
								<img
									src={blogData?.image}
									alt="Blog"
									style={styles.image}
								/>
							</div>
						)}
						<div className="mb-8">
							{blogData?.type === 'URL' ? (
								<p>
									<span className="font-semibold">URL: </span>
									<a href={blogData?.url} target="_blank" rel="noopener noreferrer" style={styles.link}>{blogData?.url}</a>
								</p>
							) : (
								<p>
									<span className="font-semibold">Docs: </span>
									{/* <a href={blogData?.docs} target="_blank" rel="noopener noreferrer" style={styles.link}>View Document</a> */}
                  <p>{blogData?.docs}</p>
								</p>
							)}
						</div>
						<div>
							<h2 className="text-xl font-semibold mb-2">Description</h2>
							<p>{blogData?.description}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogView;
