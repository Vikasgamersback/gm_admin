import PropTypes from 'prop-types';
const SidebarHeadingWithoutArrow = ({
  label,
  isSelected,
  onClick,
  iconSrc,
}) => {
  return (
    <div
      className={`fixed-sidebar-button ${
        isSelected ? "pathname-selected" : "pathname-not-selected"
      }`}
      onClick={onClick}
    >
      <div className="sidebar-heading">
        <img className="h-5 w-5" src={iconSrc} alt={label} />
        <h5 className="text-[18px]">{label}</h5>
      </div>
    </div>
  );
};

SidebarHeadingWithoutArrow.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  iconSrc: PropTypes.string,
};


export default SidebarHeadingWithoutArrow;
