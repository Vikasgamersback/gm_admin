// @import dependencies
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

// @import files
import constants from "../../json/constants.json";
import SidebarDrawer from "./SidebarDrawer";
import SidebarHeadingsWithArrow from "./SidebarHeadingsWithArrow";
import SidebarHeadingWithoutArrow from "./SidebarHeadingWithoutArrow";
import { MdOutlineFeedback } from "react-icons/md";
import PropTypes from 'prop-types';

const FixedSidebar = ({setSelectedType}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies();
  const [openSidebarDrawer, setOpenSidebarDrawer] = useState(false);

  const onCloseDrawer = () => {
    setOpenSidebarDrawer(false);
  };
  
  const [sideBarElem , setSideBarElem] = useState("");

  return (
    <>
      <div className="fixed-sidebar-card">
        {cookies["services"] === "Social Media" && (
          <>
            {/* Dashbaord */}
            {/* <SidebarHeadingsWithArrow */}
            <SidebarHeadingWithoutArrow
              // id="Dashboard"
              // path={constants.PATH.NAVIGATESOCIALDASHBOARD}
              onClick={() => navigate(constants.PATH.NAVIGATESOCIALDASHBOARD)}
              iconSrc="/assets/png/dashboard.png"
              label={constants.DASHBOARD}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATESOCIALDASHBOARD
              }
              // openSidebarDrawer={openSidebarDrawer}
              // setOpenSidebarDrawer={setOpenSidebarDrawer}
              // setSideBarElem={setSideBarElem}
            />

            {/* Workplace */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.WORKPLACE}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEWORKPLACES
              }
              onClick={() => navigate(constants.PATH.NAVIGATEWORKPLACES)}
              iconSrc="/assets/png/briefcase.png"
            /> */}

            {/* Analytics */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.ANALYTICS}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEANALYTICS
              }
              onClick={() => navigate(constants.PATH.NAVIGATEANALYTICS)}
              iconSrc="/assets/png/data-analytics.png"
            /> */}

            {/* Users */}
            <SidebarHeadingWithoutArrow
              label={constants.USERS}
              isSelected={location?.pathname === constants.PATH.NAVIGATEUSERS}
              onClick={() => navigate(constants.PATH.NAVIGATEUSERS)}
              iconSrc="/assets/png/man.png"
            />
            {/* Games */}
            <SidebarHeadingWithoutArrow
              label={constants.GAMESMANAGEMENT}
              isSelected={location?.pathname === constants.PATH.NAVIGATEGAMES}
              onClick={() => navigate(constants.PATH.NAVIGATEGAMES)}
              iconSrc="/assets/png/man.png"
            />

            {/* Posts */}
            <SidebarHeadingWithoutArrow
              label={constants.POSTS}
              isSelected={location?.pathname === constants.PATH.NAVIGATEPOSTS}
              onClick={() => navigate(constants.PATH.NAVIGATEPOSTS)}
              iconSrc="/assets/png/icons-posts.png"
            />

            {/* Reports */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.REPORTS}
              isSelected={location?.pathname === constants.PATH.NAVIGATEREPORTS}
              onClick={() => navigate(constants.PATH.NAVIGATEREPORTS)}
              iconSrc="/assets/png/icons-spam.png"
            /> */}

             <SidebarHeadingsWithArrow
              id="Reports"
              path={constants.PATH.NAVIGATEREPORTS}
              iconSrc="/assets/png/icons-spam.png"
              label={constants.REPORTS}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEREPORTS
              }
              openSidebarDrawer={openSidebarDrawer}
              setOpenSidebarDrawer={setOpenSidebarDrawer}
              setSideBarElem={setSideBarElem}
            />

            {/* Jobs */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.JOBSMANAGEMENT}
              isSelected={location?.pathname === constants.PATH.NAVIGATEJOBS}
              onClick={() => navigate(constants.PATH.NAVIGATEJOBS)}
              iconSrc="/assets/png/icons-spam.png"
            /> */}
            {/* Feedback */}
            <SidebarHeadingWithoutArrow
              label={constants.FEEDBACKMANAGEMENT}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEFEEDBACK
              }
              onClick={() => navigate(constants.PATH.NAVIGATEFEEDBACK)}
              // iconSrc={<MdOutlineFeedback />}
              iconSrc="/assets/png/icons-feedback.png"
            />

            {/* Moderation */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.MODERATION}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEMODERATIONS
              }
              onClick={() => navigate(constants.PATH.NAVIGATEMODERATIONS)}
              iconSrc="/assets/png/icon-defender.png"
            /> */}

            {/* Training */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.TRAINING}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATETRAINING
              }
              onClick={() => navigate(constants.PATH.NAVIGATETRAINING)}
              iconSrc="/assets/png/icons-tutorial.png"
            /> */}

            {/* Rewards */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.REWARDS}
              isSelected={location?.pathname === constants.PATH.NAVIGATEREWARDS}
              onClick={() => navigate(constants.PATH.NAVIGATEREWARDS)}
              iconSrc="/assets/png/icons-rewards.png"
            /> */}

            {/* Themes */}
            <SidebarHeadingWithoutArrow
              label={constants.THEMES}
              isSelected={location?.pathname === constants.PATH.NAVIGATETHEMES}
              onClick={() => navigate(constants.PATH.NAVIGATETHEMES)}
              iconSrc="/assets/png/icons-theme.png"
            />

            {/* Wallet */}
            <SidebarHeadingWithoutArrow
              label={constants.WALLET}
              isSelected={location?.pathname === constants.PATH.NAVIGATEWALLETS}
              onClick={() => navigate(constants.PATH.NAVIGATEWALLETS)}
              iconSrc="/assets/png/icons-wallet.png"
            />

            {/* Referral */}
            <SidebarHeadingWithoutArrow
              label={constants.REFERRAL}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEREFERRALS
              }
              onClick={() => navigate(constants.PATH.NAVIGATEREFERRALS)}
              iconSrc="/assets/png/icons-referral.png"
            />

            {/* Challenges */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.CHALENGES}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATECHALLENGES
              }
              onClick={() => navigate(constants.PATH.NAVIGATECHALLENGES)}
              iconSrc="/assets/png/icons-challenge.png"
            /> */}

            {/* Token */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.TOKEN}
              isSelected={location?.pathname === constants.PATH.NAVIGATETOKENS}
              onClick={() => navigate(constants.PATH.NAVIGATETOKENS)}
              iconSrc="/assets/png/icons-token.png"
            /> */}

            {/* Guidelines */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.GUIDELINES}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEGUIDELINES
              }
              onClick={() => navigate(constants.PATH.NAVIGATEGUIDELINES)}
              iconSrc="/assets/png/icons-guidelines.png"
            /> */}

            {/* Gamepedia */}
            <SidebarHeadingWithoutArrow
              label={constants.GAMEPEDIA}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEGAMEPEDIAS
              }
              onClick={() => navigate(constants.PATH.NAVIGATEGAMEPEDIAS)}
              iconSrc="/assets/png/icons-game.png"
            />

            {/* Notification */}
            <SidebarHeadingWithoutArrow
              label={constants.NOTIFICATION}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATENOTIFICATIONS
              }
              onClick={() => navigate(constants.PATH.NAVIGATENOTIFICATIONS)}
              iconSrc="/assets/png/notification.png"
            />

            {/* settings */}
            {/* <SidebarHeadingWithoutArrow
              label={constants.SETTINGS}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATESETTINGS
              }
              onClick={() => navigate(constants.PATH.NAVIGATESETTINGS)}
              iconSrc="/assets/png/icons-setting.png"
            /> */}
          </>
        )}

        {cookies["services"] === "Employees" && (
          <>
            {/* Dashbaord */}
            <SidebarHeadingWithoutArrow
              label={constants.DASHBOARD}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEEMPLOYEEDASHBOARD
              }
              onClick={() => navigate(constants.PATH.NAVIGATEEMPLOYEEDASHBOARD)}
              iconSrc="/assets/png/briefcase.png"
            />

            {/* Employee list */}
            <SidebarHeadingWithoutArrow
              label={constants.EMPLOYEELIST}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEEMPLOYEELIST
              }
              onClick={() => navigate(constants.PATH.NAVIGATEEMPLOYEELIST)}
              iconSrc="/assets/png/briefcase.png"
            />
            {/* Blogs */}
            <SidebarHeadingWithoutArrow
              label={constants.BLOGS}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEBLOGS
              }
              onClick={() => navigate(constants.PATH.NAVIGATEBLOGS)}
              iconSrc="/assets/png/icons-game.png"
            />
          </>
        )}
        {cookies["services"] === "Landing Page" && (
          <>
          {/* Blogs */}
          <SidebarHeadingWithoutArrow
              label={constants.BLOGS}
              isSelected={
                location?.pathname === constants.PATH.NAVIGATEBLOGS
              }
              onClick={() => navigate(constants.PATH.NAVIGATEBLOGS)}
              iconSrc="/assets/svg/blogs.svg"
            />
            {/* Jobs */}
            <SidebarHeadingWithoutArrow
              label={constants.JOBSMANAGEMENT}
              isSelected={location?.pathname === constants.PATH.NAVIGATEJOBS}
              onClick={() => navigate(constants.PATH.NAVIGATEJOBS)}
              iconSrc="/assets/png/icons-spam.png"
            />
            </>
        )}
      </div>
      <SidebarDrawer open={openSidebarDrawer} close={onCloseDrawer} sideBarElem={sideBarElem} setSelectedType={setSelectedType}/>
    </>
  );
};

FixedSidebar.propTypes = {
  setSelectedType: PropTypes.func
};

export default FixedSidebar;
