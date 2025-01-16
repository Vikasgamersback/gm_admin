/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";

//React icons
import { useNavigate } from "react-router-dom";
import {
	MdOpenInFull,
	MdOutlineEditNote,
	MdOutlineFilterAlt,
} from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";

// @import components
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import FullScreenModal from "../../../Modals/FullScreenModal";
import FixedSidebar from "../../../general-components/FixedSidebar";
import Spinner from "../../../general-components/Spinner";
import FilterModal from "../../../Modals/FilterModal";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";
import ReportDetailModel from "../../../Modals/ReportDetailModel";

import constants from "../../../../json/constants.json";
const Reports = () => {
	const navigate = useNavigate();
	const listInnerRef = useRef(null);
	const [innerRef, setInnerRef] = useState(null);
	const [selectedType, setSelectedType] = useState(constants.PROFILEREPORT);
	const [cookies] = useCookies();
	const [reportsTabList, setReportsTabList] = useState(0);
	const [isFullscreenModalOpen, setISFullscreenModalOpen] = useState(false);
	const [invokeGames, setInvokeGames] = useState(true);
	const [openFilterModal, setOpenFilterModal] = useState(false);
	const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("0-10");
	const [searchQuary] = useState("");
	const [reportsData, setReportsData] = useState(null);
	const [totalReports, setTotalReports] = useState(null);
	const [skip, setSkip] = useState(0);
	const [filterType, setFilterType] = useState("");
	const [maxDistReached, setMaxDistReached] = useState(false);
	const [statusType, setStatusType] = useState("");
	const itemsPerPage = parseInt(selectedItemsPerPage.split("-")[1]);
	const [isLoading, setIsLoading] = useState(true);
	const [isFetching, setIsFetching] = useState(false);
	const [reportDetailModalOpener, SetReportDetailModalOpener] =
		useState(false);
	const [reportDetail, setReportDetail] = useState(null);
	const [reportDetailLoading, setReportDetailLoading] = useState(false);

	// Infinite ScrollBar....Logic
	const onScroll = () => {
		if (innerRef) {
			const { scrollTop, scrollHeight, clientHeight } =
				listInnerRef.current;
			const isNearBottom = scrollTop + clientHeight >= scrollHeight - 1;
			if (isNearBottom && !isLoading && !maxDistReached) {
				setSkip(skip + 10);
				setInvokeGames(true);
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

	const getReportsList = async () => {
		setIsFetching(true);
		let params = {
			skip: skip,
			limit: itemsPerPage,
			search: searchQuary,
			type: selectedType,
			statusType: statusType,
		};

		let response = await invokeApi(
			config.baseUrl + apiList.getReportsList,
			params,
			cookies
		);

		if (response.customcode === 200) {
			setReportsData(response.data);
			setTotalReports(response.total);
			if (response.data.length < itemsPerPage) {
				setMaxDistReached(true);
				setIsFetching(false);
			} else {
				setMaxDistReached(false);
			}
			if (skip > 0) {
				setReportsData([...reportsData, ...response.data]);
			} else {
				setReportsData(response.data);
			}
			setTotalReports(response.total);
			setIsLoading(false);
			setIsFetching(false);
		} else if (response.customcode === 201) {
			navigate("/logout");
		} else {
			alert("Something went wrong while fetching reports");
		}
	};

	useEffect(() => {
		setInvokeGames(true);
		setMaxDistReached(false);
		setSkip(0);
	}, [selectedType]);

	useEffect(() => {
		if (invokeGames) {
			setInvokeGames(false);
			getReportsList();
		}
	}, [
		cookies,
		navigate,
		skip,
		itemsPerPage,
		invokeGames,
		searchQuary,
		selectedType,
		statusType,
	]);

	const closeFullScreenUserModal = () => {
		setISFullscreenModalOpen(false);
	};

	const fetchReportDetail = async (id, type) => {
		setReportDetailLoading(true);
		let params = {
			id: id,
			type: type,
		};

		let response = await invokeApi(
			config.baseUrl + apiList.getReportDetail,
			params,
			cookies
		);

		if (response.customcode === 200) {
			setReportDetail(response.data[0]);
		} else if (response.customcode === 201) {
			navigate("/logout");
		} else {
			alert("Something went wrong while fetching reports");
		}
		setReportDetailLoading(false);
	};

	// Report Detail Model Opener ...
	const OpenReportDetailPage = (id, type) => {
		fetchReportDetail(id, type);
		SetReportDetailModalOpener(true);
	};

	return (
		<>
			<FixedSidebar setSelectedType={setSelectedType} />
			<div className="section">
				<div className="m-7 flex flex-col space-y-6">
					<BreadCrumbs
						nav1="Reports"
						nav2={`${
							reportsTabList === 0
								? "All Reports"
								: reportsTabList === 1
									? "Pending"
									: reportsTabList === 2
										? "In-progress"
										: reportsTabList === 3
											? "Resolved"
											: ""
						}`}
					/>

					<div className="flex flex-col ">
						<div className="text-3xl text-[#949495] font-semibold">
							{selectedType === constants.POSTREPORT
								? "Post "
								: selectedType === constants.PROFILEREPORT
									? "Users "
									: selectedType === constants.STORYREPORT
										? "Story "
										: selectedType ===
											constants.COMMENTREPORT
											? "Comments "
											: "All"}{" "}
							Reports
						</div>
						<div className="text-lg text-[#949495]">
							Rise and shine! It's a brand new day full of
							possibilities.
						</div>
					</div>

					<div className="flex flex-row items-center space-x-20">
						<h5
							className={`${
								reportsTabList === 0
									? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
									: "text-[#949495] font-semibold cursor-pointer"
							}`}
							onClick={() => {
								setReportsTabList(0);
								setStatusType("");
								setInvokeGames(true);
							}}
						>
							All Reports
						</h5>
						<h5
							className={`${
								reportsTabList === 1
									? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
									: "text-[#949495] font-semibold cursor-pointer"
							}`}
							onClick={() => {
								setReportsTabList(1);
								setStatusType(constants.NEW);
								setInvokeGames(true);
							}}
						>
							Pending
						</h5>
						<h5
							className={`${
								reportsTabList === 2
									? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
									: "text-[#949495] font-semibold cursor-pointer"
							}`}
							onClick={() => {
								setReportsTabList(2);
								setStatusType(constants.PROGRESS);
								setInvokeGames(true);
							}}
						>
							In-progress
						</h5>
						<h5
							className={`${
								reportsTabList === 3
									? "py-2 px-3 bg-[#242424] text-white rounded-xl dark:px-3 dark:py-2 dark:bg-white dark:text-black dark:font-bold"
									: "text-[#949495] font-semibold cursor-pointer"
							}`}
							onClick={() => {
								setReportsTabList(3);
								setStatusType(constants.RESOLVED);
								setInvokeGames(true);
							}}
						>
							Resolved
						</h5>
					</div>

					<div className="flex flex-col space-y-5 card card-shadow w-full h-[520px]">
						<div className="flex flex-row items-center justify-between px-7 pt-5">
							<div className="flex flex-row items-center space-x-5">
								<img
									src="/assets/png/icons-spam.png"
									className="h-10 w-10"
								/>
								<h5 className="font-semibold dark:text-white">
									Reports
								</h5>
								<p className="dark:text-gray-400">
									(Total Reports: {totalReports})
								</p>
							</div>
							<div className="flex flex-row items-center space-x-7">
								<div className="flex flex-row space-x-5 items-center">
									<MdOutlineFilterAlt
										size={30}
										className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
										onClick={() => setOpenFilterModal(true)}
									/>
									<BiRefresh
										size={30}
										className="cursor-pointer dark:text-white hover:dark:text-blue-400 hover:text-blue-400"
										onClick={() => {
											setIsLoading(true);
											setInvokeGames(true);
										}}
									/>
								</div>
								<div className="flex flex-row space-x-5 h-5 items-center p-5 border-[1px] border-[#707070] w-[250px] rounded-full">
									<IoSearchOutline
										size={30}
										className="dark:text-white"
									/>
									<input
										className="outline-none bg-transparent dark:text-[#FFFFFF] w-full me-5"
										placeholder="Search..."
									/>
								</div>
								<MdOpenInFull
									size={30}
									onClick={() =>
										setISFullscreenModalOpen(true)
									}
									className="dark:text-white cursor-pointer"
								/>
							</div>
						</div>
						{isLoading ? (
							<div className="h-full w-full flex items-center justify-center">
								<Spinner />
							</div>
						) : (
							<>
								{reportsData?.length > 0 ? (
									<div
										className="h-full  overflow-y-auto "
										ref={listInnerRef}
									>
										<table className="w-full text-sm text-left">
											<thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
												<tr>
													<th
														scope="col"
														className="text-center px-6 py-3"
													>
														No
													</th>
													<th
														scope="col"
														className="text-center px-6 py-3 w-[35%]"
													>
														{selectedType ===
															constants.POSTREPORT &&
															"Post Details"}
														{selectedType ===
															constants.COMMENTREPORT &&
															"Comments Details"}
														{selectedType ===
															constants.PROFILEREPORT &&
															"User Details"}
														{selectedType ===
															constants.STORYREPORT &&
															"Story Details"}
													</th>
													<th
														scope="col"
														className="text-center px-6 py-3"
													>
														User
													</th>
													<th
														scope="col"
														className="text-center px-6 py-3"
													>
														No of reports
													</th>
													<th
														scope="col"
														className="text-center px-6 py-3"
													>
														Status
													</th>
													<th
														scope="col"
														className="text-center px-6 py-3"
													>
														Action
													</th>
												</tr>
											</thead>
											<tbody>
												{reportsData?.map(
													(data, index) => {
														return (
															<tr
																key={index}
																className="hover:bg-gray-800 cursor-pointer font-semibold text-[#707070]"
																onClick={() =>
																	OpenReportDetailPage(
																		data?._id,
																		data?.reportType
																	)
																}
															>
																<td className="text-center px-6 py-4 text-[#707070] dark:text-white">
																	{index + 1}
																</td>
																<td className="text-center px-6 py-4 text-[#707070] dark:text-white  flex w-full items-center justify-center gap-5 ">
																	{selectedType ===
																		constants.POSTREPORT && (
																		<>
																			<img
																				src={
																					data
																						?.postDetail
																						?.files[0]
																						?.fileUrl
																				}
																				alt="postImg"
																				width={
																					"90px"
																				}
																			/>
																			<div className="w-[40%]">
																				{
																					data
																						?.postDetail
																						?.title
																				}
																			</div>
																		</>
																	)}
																	{selectedType ===
																		constants.COMMENTREPORT && (
																		<>
																			<img
																				src={
																					data
																						?.postDetail
																						?.files[0]
																						?.fileUrl
																				}
																				alt="postImg"
																			/>
																			<div>
																				{
																					data
																						?.postDetail
																						?.title
																				}
																			</div>
																		</>
																	)}
																	{selectedType ===
																		constants.PROFILEREPORT && (
																		<>
																			<img
																				src={
																					data?.reportedUserAvatar
																				}
																				alt="postImg"
																				width={
																					"90px"
																				}
																			/>
																			<div>
																				id:
																				{
																					data?.reportedUserId
																				}
																			</div>
																		</>
																	)}
																</td>
																<td className="text-center px-6 py-4 text-[#707070] dark:text-white">
																	{
																		data?.userName
																	}
																</td>
																<td className="text-center px-6 py-4 text-[#707070] dark:text-white">
																	{
																		data?.totalReports
																	}
																</td>
																<td className="text-center px-6 py-4 text-[#707070] dark:text-white">
																	{
																		data?.statusType
																	}
																</td>
																<td className="text-center px-6 py-4 text-[#707070] dark:text-white">
																	<div className="flex flex-row space-x-4 items-center justify-center">
																		<RxEyeOpen
																			size={
																				25
																			}
																			className="dark:text-white"
																		/>
																		<MdOutlineEditNote
																			size={
																				25
																			}
																		/>
																	</div>
																</td>
															</tr>
														);
													}
												)}
												{isFetching ? (
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
					</div>
				</div>
			</div>
			{reportDetailModalOpener && (
				<ReportDetailModel
					SetReportDetailModalOpener={SetReportDetailModalOpener}
					reportDetail={reportDetail}
					reportDetailLoading={reportDetailLoading}
				/>
			)}
			{openFilterModal && (
				<FilterModal
					setOpenFilterModal={setOpenFilterModal}
					filterType={filterType}
					setFilterType={setFilterType}
					setIsLoading={setIsLoading}
					setInvokeFunction={setInvokeGames}
					selectedItemsPerPage={selectedItemsPerPage}
					setSelectedItemsPerPage={setSelectedItemsPerPage}
					data={reportsData}
				/>
			)}
			<FullScreenModal
				open={isFullscreenModalOpen}
				close={closeFullScreenUserModal}
			/>
		</>
	);
};

export default Reports;
