import PropTypes from 'prop-types';


const ViewTabs = ({
  heading,
  text1,
  text2,
  text3,
  textDetails1,
  textDetails2,
  textDetails3,
  text4,
  textDetails4,
}) => {
  return (
    <div className="flex flex-col space-y-5 text-[#242424] card card-shadow w-full h-[350px] mt-20 p-8">
      <h5 className="font-semibold text-xl dark:text-white">{heading}</h5>
      {/* inside card */}
      <div className="card w-full h-[250px] border-[1px] border-gray-300 p-5">
        {/* Edit button */}
        <div className="flex justify-end">
          <div className="flex flex-row items-center space-x-3 px-3 py-2 rounded-full border-[1px] border-gray-300">
            <img src="/assets/png/edit.png" />
            <h5 className="dark:text-white">Edit</h5>
          </div>
        </div>

        <div className="flex flex-col space-y-6 space-x-2 w-3/4 h-full flex-wrap ">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col space-y-1">
              <h4 className="dark:text-gray-400">{text1}</h4>
              <h6 className="font-semibold dark:text-white">{textDetails1}</h6>
            </div>
            <div className="flex flex-col space-y-1">
              <h4 className="dark:text-gray-400">{text2}</h4>
              <h6 className="font-semibold dark:text-white">{textDetails2}</h6>
            </div>
            <div className="flex flex-col space-y-1">
              <h4 className="dark:text-gray-400">{text3}</h4>
              <h6 className="font-semibold dark:text-white">{textDetails3}</h6>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="dark:text-gray-400">{text4}</h4>
            <h6 className="font-semibold dark:text-white">{textDetails4}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};



ViewTabs.propTypes = {
  heading: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  text3: PropTypes.string.isRequired,
  textDetails1: PropTypes.string.isRequired,
  textDetails2: PropTypes.string.isRequired,
  textDetails3: PropTypes.string.isRequired,
  text4: PropTypes.string.isRequired,
  textDetails4: PropTypes.string.isRequired,
};

export default ViewTabs;
