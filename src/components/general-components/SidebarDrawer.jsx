// @import dependencies
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from 'prop-types';

// @import files
import constants from "../../json/constants.json";

const SidebarDrawer = ({ open, close, sideBarElem ,setSelectedType }) => {
  //   const [open, cycleOpen] = useCycle(false, true);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed left-[20%]  z-10 inset-0" onClick={close}>
          <div className="sidebar-drawer ">
            <motion.aside
              initial={{ width: 0 }}
              animate={{
                width: 250,
              }}
              exit={{
                width: 0,
                transition: { delay: 0, duration: 0.1 },
              }}
            >

            {/* Dashboard */}
            { 
              sideBarElem === "Dashboard"  &&   <div
                className={`fixed-sidebar-button  cursor-pointer ${location?.pathname === constants.NAVIGATEHOME
                  ? "bg-white text-[#242424]"
                  : "text-[#ffffff] hover:bg-[#999999] hover:opacity-80 hover:text-[#242424]"
                  } `}
                onClick={() => {
                navigate(constants.NAVIGATEHOME)
                }}
              > 
               <img className="h-7 w-7" src="/assets/png/briefcase.png" />
                <h5 className="text-lg">    
                  {constants.DASHBOARD}
                </h5>
              </div>
            }
            {/* Reports then Show the buttons */}
            { 
              sideBarElem === "Reports"  &&   
               <>
              <div className="fixed-sidebar-button  cursor-pointer text-[#ffffff] hover:bg-[#999999] hover:opacity-80 hover:text-[#242424]"
                onClick={() => {
                  navigate(constants.PATH.NAVIGATEREPORTS)
                  setSelectedType(constants.POSTREPORT)
                  console.log("Hello")
                }
                  }> 
               <img className="h-7 w-7" src="/assets/png/icons-posts.png" />
                <h5 className="text-[16px]">{constants.POSTREPORT.toLowerCase().replace("report"," report")}</h5>
              </div>

              <div className="fixed-sidebar-button  cursor-pointer text-[#ffffff] hover:bg-[#999999] hover:opacity-80 hover:text-[#242424]"
                onClick={() => {
                  navigate(constants.PATH.NAVIGATEREPORTS)
                  setSelectedType(constants.PROFILEREPORT)
                }
                  }> 
               <img className="h-7 w-7" src="/assets/png/profile2.jpg" />
                <h5 className="text-[16px]">{constants.PROFILEREPORT.toLowerCase().replace("report"," report")}</h5>
              </div>

              <div className="fixed-sidebar-button  cursor-pointer text-[#ffffff] hover:bg-[#999999] hover:opacity-80 hover:text-[#242424]"
               onClick={() => {
                  navigate(constants.PATH.NAVIGATEREPORTS)
                  setSelectedType(constants.STORYREPORT)
                }
                  }> 
               <img className="h-7 w-7" src="/assets/png/briefcase.png" />
                <h5 className="text-[16px]">{constants.STORYREPORT.toLowerCase().replace("report"," report")}</h5>
              </div>

              <div className="fixed-sidebar-button  cursor-pointer text-[#ffffff] hover:bg-[#999999] hover:opacity-80 hover:text-[#242424]"
                 onClick={() => {
                  navigate(constants.PATH.NAVIGATEREPORTS)
                  setSelectedType(constants.COMMENTREPORT)
                }
                  }> 
               <img className="h-7 w-7" src="/assets/png/briefcase.png" />
                <h5 className="text-[16px]">{constants.COMMENTREPORT.toLowerCase().replace("report"," report")}</h5>
              </div>
              </>
            }
            
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};


SidebarDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
  sideBarElem: PropTypes.string, 
  setSelectedType: PropTypes.func, 
};

export default SidebarDrawer;



