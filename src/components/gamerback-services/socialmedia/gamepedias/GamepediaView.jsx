import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";
import FixedSidebar from "../../../general-components/FixedSidebar";
import BreadCrumbs from "../../../general-components/Breadcrumbs";
import { MdOutlineEditNote } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import helperUtils from "../../../../utils/helperUtils";

const GamepediaView = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [cookies] = useCookies();

	const [gameData, setGameData] = useState(0);
	const [invokeGame, setInvokeGame] = useState(true);

	const tabItems = [
		"Plot",
		"Awards",
		"Ratings & Reviews",
		"Gallary",
		"Creators",
	];

	const [activeTab, setActiveTab] = useState(tabItems[0]);
	//get game data
	useEffect(() => {
		const getGamepediaDetail = async () => {
			let params = {
				_id: location?.state,
			};
			let response = await invokeApi(
				config.baseUrl + apiList.getGamepediaDetail,
				params,
				cookies
			);
			console.log("response by vikas",	response);
			if (response.customcode === 200) {
				console.log(response.data);
				setGameData(response.data);
			} else if (response.customcode === 201) {
				navigate("/logout");
			} else {
				alert("Something went wrong in gameview");
			}
		};
		if (invokeGame) {
			setInvokeGame(false);
			getGamepediaDetail();
		}
	}, [cookies, invokeGame, location?.state, navigate]);

	return (
		<>
			<FixedSidebar />
			<div className="overflow-y-auto section">
				<div className="flex flex-col m-10 space-y-8">
					<BreadCrumbs
						nav1="Gamepedia"
						nav2 = {gameData?.gameName}
						// nav2={
						// 	activeTab === 0
						// 		? "Plot"
						// 		: activeTab === 1
						// 			? "Awards"
						// 			: activeTab === 2
						// 				? "Ratings & Reviews"
						// 				: activeTab === 3
						// 					? "Gallary"
						// 					: activeTab === 4
						// 						? "Creators"
						// 						: ""
						// }
					/>
					{/**Game Banner */}
					<div className="relative w-full image-shade">
						{/**Banner */}
						<img
							src={gameData.gameBanner}
							alt=""
							className="object-cover w-full bg-no-repeat h-96 rounded-3xl"
						/>
						{/**Right */}
						<div className="absolute z-10 flex flex-row items-center justify-center p-3 space-x-4 bg-white rounded-lg top-6 right-6">
							<MdOutlineEditNote
								size={30}
								className="cursor-pointer hover:text-green-600"
							/>
							<FaRegTrashCan
								size={20}
								className="cursor-pointer hover:text-red-600"
							/>
						</div>
						<div className="absolute z-10 flex items-center justify-start w-full space-x-10 text-white ps-10 bottom-7">
							<div className="flex flex-row items-start space-x-6">
								<img
									src={gameData?.gameLogo}
									className="object-cover rounded-lg w-44 h-44"
								/>

								<div className="flex flex-col items-start space-y-2">
									<h5 className="text-xl font-semibold uppercase ">
										{gameData?.gameName}
									</h5>
									<div className="flex space-x-10">
										<p className="font-semibold">
											<span className="font-normal">
												Developers :{" "}
											</span>
											{gameData?.developers}
										</p>
										<p className="font-semibold">
											<span className="font-normal">
												Publishers :{" "}
											</span>
											{gameData?.publishers}
										</p>
										<p className="font-semibold">
											<span className="font-normal">
												Age :{" "}
											</span>
											{gameData?.age}
										</p>
									</div>
									<div className="flex space-x-10">
										<p className="font-semibold">
											<span className="font-normal">
												Gerne :{" "}
											</span>
											{gameData?.genre?.map(
												(item, index) => (
													<span
														key={index}
														className="px-2"
													>
														{item}
													</span>
												)
											)}
										</p>
										<p className="font-semibold">
											<span className="font-normal">
												Release Date :{" "}
											</span>
											{helperUtils.getDateFormat(
												gameData?.releseDate,
												"dd/mm/yyyy"
											)}
										</p>
										<p className="font-semibold">
											<span className="font-normal">
												Users :{" "}
											</span>
											{gameData?.totalUsers}
										</p>
									</div>
									<div>
										<div className="flex items-center space-x-2 font-semibold">
											<span className="font-normal">
												platform :{" "}
											</span>
											{gameData?.platform?.length > 0
												? gameData.platform.map(
														(item, index) => (
															<span key={index}>
																{item}
															</span>
															// <img
															//   key={index}
															//   className="object-contain w-10 h-10 px-2"
															//   src={item}
															//   alt={item}
															// />
														)
													)
												: null}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<section className="m-10 ">
					<div className="">
						{/**tab header */}
						<nav className=" dark:text-white">
							<ul className="flex my-3 space-x-10">
								{tabItems.map((tab) => (
									<li
										key={tab}
										className={`  space-x-2 text-center font-montserrat py-1 cursor-pointer border-b-4 ${
											activeTab === tab
												? "border-blue-500 text-blue-500  font-bold"
												: "border-transparent"
										} hover:border-blue-300 transition duration-300`}
										onClick={() => setActiveTab(tab)}
									>
										{tab}
									</li>
								))}
							</ul>
						</nav>
					</div>
					{activeTab === "Plot" && (
						<div className="px-5 py-5 card card-shadow text-start">
							<h3 className="font-semibold uppercase dark:text-white">
								Plot
							</h3>
							<p className="py-3 font-normal dark:text-gray-400">
								{gameData?.plotDescription}
							</p>
						</div>
					)}
					{activeTab === "Awards" && (
						<div className="px-5 py-5 card card-shadow text-start">
							<table className="w-full font-semibold dark:text-white">
								<thead>
									<tr className=" flex items-center justify-center text-center font-semibold py-2 border-[#242424] border-[1px]  rounded-xl">
										<th className="flex-1">Nameiiiii</th>
										<th className="flex-1">Category</th>
										<th className="flex-1">Year</th>
									</tr>
								</thead>
								<tbody>
									{gameData?.awards?.map((item, id) => (
										<tr
											className="flex items-center justify-center space-y-3 font-normal text-center "
											key={id}
										>
											<td className="flex-1">
												{item?.name}
											</td>
											<td className="flex-1">
												{item?.category}
											</td>
											<td className="flex-1">
												{helperUtils.getDateFormat(
													item?.date,
													"dd/mm/yyyy"
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}

					{activeTab === "Ratings & Reviews" && (
						<div className="px-5 py-5 card card-shadow text-start dark:text-white">
							<div className="flex flex-col justify-between">
								<div className="px-3 mt-4">
									<h2 className="mb-2 text-xl font-semibold">
										Ratings
									</h2>
									<div className="flex space-x-10">
										<div className="flex flex-col">
											<p>Overall Ratings</p>
											<p className="text-4xl font-semibold">
												{gameData?.rating?.rating}
											</p>
											<p>{`(${gameData?.rating?.totalRatingCount} ratings)`}</p>
										</div>
									</div>
								</div>
								<div className="px-3 mt-4">
									<h2 className="mb-2 text-xl font-semibold">
										User Comments
									</h2>
									{gameData?.rating?.comments.map(
										(comment) => (
											<div
												key={comment._id}
												className="flex items-center space-x-12 space-y-6"
											>
												<div className="flex flex-col items-center">
													<img
														src={comment.userImage}
														alt={comment.userName}
														className="w-10 h-10 mr-2 rounded-full"
													/>
													<p className="font-semibold">
														{comment.userName}
													</p>
												</div>
												<div>
													<p className="text-xs text-gray-400">
														{helperUtils.getDateFormat(
															comment.createdAt,
															"dd/mm/yyyy"
														)}
													</p>
													<p className="text-start">
														{comment.comments}
													</p>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						</div>
					)}
					{activeTab === "Gallary" && (
						<div className="flex flex-col px-5 py-5 gap-x-4 card card-shadow">
							<div>
								<h1 className="my-3 text-xl font-bold dark:text-white">
									Videos
								</h1>
								<div className="flex flex-wrap gap-y-2 gap-x-2">
									{gameData?.gallery?.videos?.map(
										(item, index) => {
											const isYouTube = item.includes("youtube.com");

  return isYouTube ? (
    <div key={index} className="rounded-lg">
      {/* YouTube embed */}
      <iframe
      
        src={`https://www.youtube.com/embed/${new URL(item).searchParams.get('v')}`}
     
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        
        title="YouTube video"
      ></iframe>
    </div>
  ) : (
    <video key={index} className="rounded-lg" controls >
      <source src={item} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
  									}									)
									}
								</div>
							</div>
							<div>
								<h1 className="my-3 text-xl font-bold dark:text-white">
									Images
								</h1>
								<div className="flex flex-wrap gap-y-2 gap-x-2">
									{gameData?.gallery?.images?.map(
										(item, index) => (
											<img
												key={index}
												src={item}
												className="object-cover w-56 h-56 rounded-lg"
											/>
										)
									)}
								</div>
							</div>
						</div>
					)}
					{activeTab === "Creators" && (
						<div className="px-5 py-5 card card-shadow">
							<div className="flex flex-wrap gap-x-3 gap-y-3">
								{gameData?.founders?.map((founder, index) => (
									<div
										key={index}
										className=" border dark:border-[#242424] dark:bg-[#242424]  rounded px-3 py-3 dark:text-white space-y-2 text-center"
									>
										<img
											src={founder?.image}
											className="object-cover rounded-full w-36 h-36 "
										/>
										<p className="text-center">
											{founder?.name}
										</p>
										<p className="text-center">
											{founder?.designation}
										</p>
										<a
											href="#"
											className="text-blue-500 underline"
										>
											View Profile
										</a>
									</div>
								))}
							</div>
						</div>
					)}
				</section>
			</div>
		</>
	);
};

export default GamepediaView;
