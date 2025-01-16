import { useState } from "react";

const DashboardAdmin = () => {
  const [trendingTabs, setTrendingTabs] = useState(0);
  return (
    <div className="section overflow-y-auto">
      <div className="m-10 flex flex-col space-y-8">
        {/* Card */}
        <div className="relative h-[170px] w-full card card-shadow p-10">
          {/* Calender */}
          <div className="absolute right-10 flex flex-row items-center  justify-end space-x-3">
            {/* Img */}
            <img className="h-7 w-7" src="/assets/png/calendar.png" />
            <h5 className="text-lg dark:text-[#ffffff]">
              18 Aug 2023 08:00 PM
            </h5>
          </div>
          <div className="flex flex-row items-center space-x-8">
            <img src="/assets/png/icons-avatar.png" className="h-24 w-24" />
            <div className="flex flex-col space-y-1">
              <h3 className="text-3xl dark:text-[#ffffff] font-bold">
                Good Morning, Shiva!
              </h3>
              <h6 className="text-[#707070] text-lg">
                Rise and shine! Its a brand new day full of possibilities.
              </h6>
            </div>
          </div>
        </div>

        {/* Row 1 card */}
        <div className="flex flex-row space-x-5">
          {/* Task card */}
          <div className="card flex flex-col space-y-4.5  card-shadow h-[370px] w-[33.3%]">
            {/* Card Header */}
            <div className="flex flex-col space-y-2 border-b-[1px] border-gray-300 px-5 py-3">
              <div className="flex flex-row space-x-4 items-center justify-between">
                <h5 className="text-xl font-semibold dark:text-[#ffffff]">
                  Tasks
                </h5>

                <div className="flex flex-row items-center space-x-5">
                  <img
                    className="h-4 w-4"
                    src="/assets/png/fullscreen-enter.png"
                  />
                  <img className="h-4 w-4" src="/assets/png/add.png" />
                </div>
              </div>

              <p className="text-md text-[#707070]">
                Small steps Big wins: Mastering each Tasks
              </p>
            </div>
          </div>
          {/* Notes card */}
          <div className="card flex flex-col space-y-4.5  card-shadow h-[370px] w-[33.3%]">
            {/* Card Header */}
            <div className="flex flex-col space-y-2 border-b-[1px] border-gray-300 px-5 py-3">
              <div className="flex flex-row space-x-4 items-center justify-between">
                <h5 className="text-xl font-semibold dark:text-[#ffffff]">
                  Notes
                </h5>

                <div className="flex flex-row items-center space-x-5">
                  <img
                    className="h-4 w-4"
                    src="/assets/png/fullscreen-enter.png"
                  />
                  <img className="h-4 w-4" src="/assets/png/add.png" />
                </div>
              </div>

              <p className="text-md text-[#707070]">
                Small steps Big wins: Mastering each Tasks
              </p>
            </div>
          </div>
          {/* Reminders card */}
          <div className="card flex flex-col space-y-4.5  card-shadow h-[370px] w-[33.3%]">
            {/* Card Header */}
            <div className="flex flex-col space-y-2 border-b-[1px] border-gray-300 px-5 py-3">
              <div className="flex flex-row space-x-4 items-center justify-between">
                <h5 className="text-xl font-semibold dark:text-[#ffffff]">
                  Reminders
                </h5>

                <div className="flex flex-row items-center space-x-5">
                  <img
                    className="h-4 w-4"
                    src="/assets/png/fullscreen-enter.png"
                  />
                  <img className="h-4 w-4" src="/assets/png/add.png" />
                </div>
              </div>

              <p className="text-md text-[#707070]">
                Small steps Big wins: Mastering each Tasks
              </p>
            </div>
          </div>
        </div>

        {/* Row 2 card */}
        <div className="flex flex-row space-x-5">
          {/* Task card */}
          <div className="card flex flex-col space-y-4.5  card-shadow h-[370px] w-[33.3%]">
            {/* Card Header */}
            <div className="flex flex-col space-y-2 border-b-[1px] border-gray-300 px-5 py-3">
              <div className="flex flex-row space-x-4 items-center justify-between">
                <h5 className="text-xl font-semibold dark:text-[#ffffff]">
                  Calender
                </h5>

                <div className="flex flex-row items-center space-x-5">
                  <img
                    className="h-4 w-4"
                    src="/assets/png/fullscreen-enter.png"
                  />
                  <img className="h-4 w-4" src="/assets/png/add.png" />
                </div>
              </div>

              <p className="text-md text-[#707070]">
                Small steps Big wins: Mastering each Tasks
              </p>
            </div>
          </div>
          {/* Notes card */}
          <div className="card flex flex-col space-y-4.5  card-shadow h-[370px] w-[33.3%]">
            {/* Card Header */}
            <div className="flex flex-col space-y-2 border-b-[1px] border-gray-300 px-5 py-3">
              <div className="flex flex-row space-x-4 items-center justify-between">
                <h5 className="text-xl font-semibold dark:text-[#ffffff]">
                  Drive
                </h5>

                <div className="flex flex-row items-center space-x-5">
                  <img
                    className="h-4 w-4"
                    src="/assets/png/fullscreen-enter.png"
                  />
                  <img className="h-4 w-4" src="/assets/png/add.png" />
                </div>
              </div>

              <p className="text-md text-[#707070]">
                Small steps Big wins: Mastering each Tasks
              </p>
            </div>
          </div>
          {/* Reminders card */}
          <div className="card flex flex-col space-y-4.5  card-shadow h-[370px] w-[33.3%]">
            {/* Card Header */}
            <div className="flex flex-col space-y-2 border-b-[1px] border-gray-300 px-5 py-3">
              <div className="flex flex-row space-x-4 items-center justify-between">
                <h5 className="text-xl font-semibold dark:text-[#ffffff]">
                  Upcoming Meetings
                </h5>

                <div className="flex flex-row items-center space-x-5">
                  <img
                    className="h-4 w-4"
                    src="/assets/png/fullscreen-enter.png"
                  />
                  <img className="h-4 w-4" src="/assets/png/add.png" />
                </div>
              </div>

              <p className="text-md text-[#707070]">
                Small steps Big wins: Mastering each Tasks
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="card flex flex-col space-y-3 card-shadow w-full h-[500px]">
          {/* Card Header */}
          <div className="flex flex-col space-y-2 border-b-[1px] border-gray-300 px-5 py-3">
            <div className="flex flex-row space-x-4 items-center justify-between">
              <h5 className="text-xl font-semibold dark:text-[#ffffff]">
                Calender
              </h5>

              <div className="flex flex-row items-center space-x-5">
                <img
                  className="h-4 w-4"
                  src="/assets/png/fullscreen-enter.png"
                />
                <img className="h-4 w-4" src="/assets/png/add.png" />
              </div>
            </div>

            <p className="text-md text-[#707070]">
              Small steps Big wins: Mastering each Tasks
            </p>
          </div>
          {/* Popular tab */}
          <div className="flex flex-row space-x-10 dark:text-[#ffffff] px-5 font-semibold border-b-[2px] border-gray-300">
            <p
              onClick={() => setTrendingTabs(0)}
              className={`cursor-pointer  ${
                trendingTabs === 0 && "border-b-[4px] border-[#1492E6]"
              } pb-3`}
            >
              Popular User
            </p>
            <p
              onClick={() => setTrendingTabs(1)}
              className={`cursor-pointer  ${
                trendingTabs === 1 && "border-b-[4px] border-[#1492E6]"
              } pb-3`}
            >
              Trending User
            </p>
            <p
              onClick={() => setTrendingTabs(2)}
              className={`cursor-pointer  ${
                trendingTabs === 2 && "border-b-[4px] border-[#1492E6]"
              } pb-3`}
            >
              Popular Post
            </p>
            <p
              onClick={() => setTrendingTabs(3)}
              className={`cursor-pointer  ${
                trendingTabs === 3 && "border-b-[4px] border-[#1492E6]"
              } pb-3`}
            >
              Trending Post
            </p>
          </div>

          {/* user list table */}
          <table className="w-full text-sm text-left">
            <thead className="sticky top-0 z-10 text-md border-b dark:text-[#ffffff]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Followers
                </th>
                <th scope="col" className="px-6 py-3">
                  Verification
                </th>
                <th scope="col" className="px-6 py-3">
                  Registered Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3">
                  Profile
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {gameSingleData?.awards.awards.map((el, index) => {
                return ( */}
              <tr className="font-semibold text-[#707070]">
                <td className="px-6 py-4 text-[#707070] dark:text-white">1.</td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  Shiva
                </td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  50k
                </td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  Yes
                </td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  20 Aug 2020
                </td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  2 hours ago
                </td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  view
                </td>
              </tr>
              <tr className="font-semibold text-[#707070]">
                <td className="px-6 py-4 text-[#707070] dark:text-white">2.</td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  Mahesh
                </td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  10.65k
                </td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">No</td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  20 Aug 2020
                </td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  2 hours ago
                </td>
                <td className="px-6 py-4 text-[#707070] dark:text-white">
                  view
                </td>
              </tr>
              {/* );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
