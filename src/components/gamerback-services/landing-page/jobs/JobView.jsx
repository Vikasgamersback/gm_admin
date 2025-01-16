import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi } from "../../../../utils/apiServiceUtils";
import { config } from "../../../../utils/configUtils";
import FixedSidebar from "../../../general-components/FixedSidebar";
import BreadCrumbs from "../../../general-components/Breadcrumbs";

const JobView = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [cookies] = useCookies();

	const [jobData, setJobData] = useState({});
	const [invokeJob, setInvokeJob] = useState(true);

	// Get job data
	useEffect(() => {
		const getJobDetail = async () => {
			let params = {
				_id: location?.state,
			};
			let response = await invokeApi(
				config.baseUrl + apiList.getJobDetail,
				params,
				cookies
			);
			if (response.customcode === 200) {
				setJobData(response.data);
			} else if (response.customcode === 201) {
				navigate("/logout");
			} else {
				alert("Something went wrong in job view");
			}
		};
		if (invokeJob) {
			setInvokeJob(false);
			getJobDetail();
		}
	}, [cookies, invokeJob, location?.state, navigate]);

	return (
		<>
			<FixedSidebar />
      <div className="section overflow-y-auto">
        <div className="m-10 flex flex-col space-y-8 ">
					<BreadCrumbs nav1="Job View" nav2={jobData?.title} />
					<div className="card card-shadow px-5 py-5 bg-white dark:bg-gray-800 rounded-lg">
						<h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{jobData?.title}</h1>
						<p className="text-gray-700 dark:text-gray-300 mb-4">{jobData?.description}</p>
						<div className="flex space-x-10 mb-4">
							<p className="font-semibold text-gray-900 dark:text-gray-100">
								<span className="font-normal text-gray-700 dark:text-gray-300">Status: </span>{jobData?.status}
							</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">
								<span className="font-normal text-gray-700 dark:text-gray-300">Job Type: </span>{jobData?.jobType}
							</p>
							<p className="font-semibold text-gray-900 dark:text-gray-100">
								<span className="font-normal text-gray-700 dark:text-gray-300">Work Type: </span>{jobData?.workType}
							</p>
						</div>
						<div className="mb-8">
							<h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">About the Job</h2>
							<p className="text-gray-700 dark:text-gray-300">{jobData?.aboutJob}</p>
						</div>
						<div className="mb-8">
							<h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Responsibilities</h2>
							<div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: jobData?.resposibilities }} />
						</div>
						<div>
							<h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Requirements</h2>
							<div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: jobData?.requirements }} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default JobView;
