import { BiSolidChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const SidebarHeadingsWithArrow = ({
  id,
  path,
  iconSrc,
  label,
  isSelected,
  openSidebarDrawer,
  setOpenSidebarDrawer,
  setSideBarElem
}) => {
  const navigate = useNavigate();

  const handleMouseOver = () => {
    setSideBarElem(id);
    setOpenSidebarDrawer(id);
  };

  const handleMouseLeave = () => {
    setSideBarElem("");
    // setOpenSidebarDrawer(false);
    setOpenSidebarDrawer(false);
  };
  return (
    <div
      className={`fixed-sidebar-button  justify-between  ${
        isSelected ? "pathname-selected" : "pathname-not-selected"
      } `}
      onClick={() => navigate(path)}
      onMouseEnter={handleMouseOver}
      onMouseLeave={() => handleMouseLeave}
    >
      <div className="sidebar-heading">
        <img className="h-5 w-5" src={iconSrc} alt={label} />
        <h5 className="text-[18px]">
        {label}
        
        </h5>
      </div>
      <div
        className={`flex justify-end w-fit cursor-pointer ${
          openSidebarDrawer === id ? "rotate-180" : ""
        }`}
      >
        <BiSolidChevronRight className="h-5 w-5" />
      </div>
    </div>
  );
};


SidebarHeadingsWithArrow.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  path: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  openSidebarDrawer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setOpenSidebarDrawer: PropTypes.func.isRequired,
  setSideBarElem:PropTypes.func
  
};

export default SidebarHeadingsWithArrow;

 