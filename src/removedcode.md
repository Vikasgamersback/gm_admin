components/general-components/FixedSidebar.jsx

==> dashboard/socialmedia  
            <div
              className={`fixed-sidebar-button  justify-between  ${
                location?.pathname === constants.PATH.NAVIGATESOCIALDASHBOARD
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATESOCIALDASHBOARD)}
              onMouseEnter={() => setOpenSidebarDrawer(true)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/briefcase.png" />
                <h5 className="text-[18px]">{constants.DASHBOARD}</h5>
              </div>
              <div
                className={`flex justify-end w-fit cursor-pointer ${
                  openSidebarDrawer ? "rotate-180" : ""
                }`}
              >
                <BiSolidChevronRight className="h-5 w-5" />
              </div>
              </div> 
 ==> workplace
   <div className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEWORKPLACES
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEWORKPLACES)}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/briefcase.png" />
                <h5 className="text-[18px]">{constants.WORKPLACE}</h5>
              </div>
     </div> 

==> Analytics
     <div className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEANALYTICS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEANALYTICS)}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/data-analytics.png" />
                <h5 className="text-[18px]">{constants.ANALYTICS}</h5>
              </div>
            </div>

==> Users
  <div    className={`fixed-sidebar-button flex justify-between items-center ${
                location?.pathname === constants.PATH.NAVIGATEUSERS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEUSERS)}
              // onMouseEnter={() => {
              //   setOpenSidebarDrawer(true);
              // }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/man.png" />
                <h5 className="text-[18px]">{constants.USERS}</h5>
              </div>
              {/* <div
                className={`flex justify-end w-fit cursor-pointer ${
                  openSidebarDrawer ? "rotate-180" : ""
                }`}
              >
                <BiSolidChevronRight className="h-5 w-5" />
              </div> */}
            </div>

==> Posts  
<div className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEPOSTS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEPOSTS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-posts.png" />
                <h5 className="text-[18px]">{constants.POSTS}</h5>
              </div>
            </div>

==> Reports 
            <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEREPORTS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEREPORTS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-spam.png" />
                <h5 className="text-[18px]">{constants.REPORTS}</h5>
              </div>
            </div>
==> Moderations
        <div className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEMODERATIONS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEMODERATIONS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icon-defender.png" />
                <h5 className="text-[18px]">{constants.MODERATION}</h5>
              </div>
            </div>

==> Training  <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATETRAINING
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATETRAINING);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-tutorial.png" />
                <h5 className="text-[18px]">{constants.TRAINING}</h5>
              </div>
            </div>
 ==> Rewards
             <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEREWARDS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEREWARDS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-rewards.png" />
                <h5 className="text-[18px]">{constants.REWARDS}</h5>
              </div>
            </div>
==> themes  <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATETHEMES
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATETHEMES);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-theme.png" />
                <h5 className="text-[18px]">{constants.THEMES}</h5>
              </div>
            </div>
==> wallets
     <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEWALLETS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEWALLETS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-wallet.png" />
                <h5 className="text-[18px]">{constants.WALLET}</h5>
              </div>
            </div>
==>Referrals  <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEREFERRALS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEREFERRALS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-referral.png" />
                <h5 className="text-[18px]">{constants.REFERRAL}</h5>
              </div>
            </div>
 ==> Challenges
 <div    className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATECHALLENGES
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATECHALLENGES);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img
                  className="h-5 w-5"
                  src="/assets/png/icons-challenge.png"
                />
                <h5 className="text-[18px]">{constants.CHALENGES}</h5>
              </div>
            </div>
==> Token<div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATETOKENS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATETOKENS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-token.png" />
                <h5 className="text-[18px]">{constants.TOKEN}</h5>
              </div>
            </div>
==> Guidelines  <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEGUIDELINES
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEGUIDELINES);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img
                  className="h-5 w-5"
                  src="/assets/png/icons-guidelines.png"
                />
                <h5 className="text-[18px]">{constants.GUIDELINES}</h5>
              </div>
            </div>
==> Gamepedia  <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATEGAMEPEDIAS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATEGAMEPEDIAS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-game.png" />
                <h5 className="text-[18px]">{constants.GAMEPEDIA}</h5>
              </div>
            </div>
==> notification <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATENOTIFICATIONS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATENOTIFICATIONS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/notification.png" />
                <h5 className="text-[18px]">{constants.NOTIFICATION}</h5>
              </div>
            </div>
==> settings  <div
              className={`fixed-sidebar-button cursor-pointer ${
                location?.pathname === constants.PATH.NAVIGATESETTINGS
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => {
                setOpenSidebarDrawer(false);
                navigate(constants.PATH.NAVIGATESETTINGS);
              }}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/icons-setting.png" />
                <h5 className="text-[18px]">{constants.SETTINGS}</h5>
              </div>
            </div>

==> Dashboard // Employees  <div
              className={`fixed-sidebar-button  ${
                location?.pathname === constants.PATH.NAVIGATEEMPLOYEEDASHBOARD
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEEMPLOYEEDASHBOARD)}
              onMouseEnter={() => {
                setOpenSidebarDrawer(false);
              }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/briefcase.png" />
                <h5 className="text-[18px]">{constants.DASHBOARD}</h5>
              </div>
            </div>

==> Employees <div
              className={`fixed-sidebar-button  ${
                location?.pathname === constants.PATH.NAVIGATEEMPLOYEELIST
                  ? "pathname-selected"
                  : "pathname-not-selected"
              } `}
              onClick={() => navigate(constants.PATH.NAVIGATEEMPLOYEELIST)}
              // onMouseEnter={() => {
              //   setOpenSidebarDrawer(false);
              // }}
            >
              <div className="sidebar-heading">
                <img className="h-5 w-5" src="/assets/png/briefcase.png" />
                <h5 className="text-[18px]">{constants.EMPLOYEELIST}</h5>
              </div>
            </div>
          

==> table / employess

 {
                    /* <div className="h-full overflow-y-auto" ref={listInnerRef}>
                    <table className="w-full text-sm text-left">
                      <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                        <tr>
                          <th scope="col" className="text-center px-4 py-3">
                            <input
                              type="checkbox"
                              checked={employeeData?.every(
                                (check) => check.isChecked
                              )}
                              onChange={() => {
                                let tempData = [...employeeData];
                                let allChecked = tempData.every(
                                  (el) => el.isChecked
                                );
                                if (allChecked) {
                                  tempData.map((el) => (el.isChecked = false));
                                } else {
                                  tempData.map((el) => (el.isChecked = true));
                                }
                                setEmployeeData(tempData);
                              }}
                            />
                          </th>
                          <th scope="col" className="text-center px-2 py-3">
                            No
                          </th>
                          <th scope="col" className="text-center px-3 py-3">
                            Name
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Phone
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Email
                          </th>
                          <th scope="col" className="text-center px-3 py-3">
                            Employee&nbsp;ID
                          </th>
                          <th scope="col" className="text-center px-3 py-3">
                            Type
                          </th>
                          <th scope="col" className="text-center px-3 py-3">
                            DOJ
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Status
                          </th>
                          <th scope="col" className="text-center px-6 py-3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeData?.map((el, index) => {
                          return (
                            <tr
                              key={index}
                              className="font-semibold text-[#707070]"
                            >
                              <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                                <input
                                  type="checkbox"
                                  checked={el?.isChecked ? true : false}
                                  onChange={() => {
                                    let tempData = [...employeeData];
                                    tempData[index].isChecked =
                                      !tempData[index].isChecked;
                                    setEmployeeData(tempData);
                                  }}
                                />
                              </td>
                              <td className="text-center px-2 py-4 text-[#707070] dark:text-white">
                                {index + 1}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {el.firstName}&nbsp;{el.lastName}
                                <br />
                                <p className="text-gray-400">({el.nickName})</p>
                              </td>
                              <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                                {el.phone.code}&nbsp;{el.phone.number}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {el.email}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {el.employeeId}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {el.employeeType}
                              </td>
                              <td className="text-center px-3 py-4 text-[#707070] dark:text-white">
                                {utils.getDateFormat(
                                  el.dateOfJoining,
                                  "dd/mm/yyyy"
                                )}
                              </td>
                              <td className="text-center px-4 py-4 text-[#707070] dark:text-white cursor-default">
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
                                <div className="flex flex-row space-x-3 items-center">
                                  <RxEyeOpen
                                    size={25}
                                    className="text-black dark:text-white cursor-pointer"
                                    onClick={() =>
                                      navigate("/employee-view", {
                                        state: el._id,
                                      })
                                    }
                                  />
                                  <MdOutlineEditNote
                                    size={25}
                                    className="text-black dark:text-white cursor-pointer"
                                    onClick={() => {
                                      setIsEmployeeEditModalOpen(true);
                                      setEditId(el._id);
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                      </div> */
                  }