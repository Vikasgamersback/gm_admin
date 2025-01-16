import { MdCancel } from "react-icons/md";
import PropTypes from 'prop-types';
const FilterModal = ({
  setOpenFilterModal,
  filterType,
  setFilterType,
  setInvokeFunction,
  setIsLoading,
  setSelectedItemsPerPage,
  selectedItemsPerPage,
  data,
}) => {
  const uniqueOptions = data ? Array.from(new Set(data.map(item => item.status))) : [];

  const handleFilterType = (e) => {
    e.preventDefault();
    const selectedFilter = e.target.value;
    setFilterType(selectedFilter);
  };

  const handleItemsPerPageChange = (e) => {
    setSelectedItemsPerPage(e.target.value);
  };

  const handleConfirm = () => {
    handleFilterType({
      preventDefault: () => {},
      target: { value: filterType },
    });
    // console.log(filterType);
    handleItemsPerPageChange({
      target: { value: selectedItemsPerPage },
    });

    setIsLoading(true);
    setInvokeFunction(true);
    setOpenFilterModal(false);
  };
  return (
    <div className="fixed z-10  inset-0 bg-opacity-80 bg-black  flex justify-center items-center rounded-lg ">
      <div className=" relative text-white bg-white  w-full max-w-md dark:bg-[#121212]  justify-evenly space-x-5  px-4 py-5   items-center  space-y-5 flex  rounded-2xl flex-col border ">
        <button onClick={() => setOpenFilterModal(false)}>
          <MdCancel
            className=" absolute top-1 right-1 dark:text-white text-black"
            size={30}
          />
        </button>
        <p className="font-semibold text-center dark:text-white text-black text-2xl uppercase underline">
          choose filters
        </p>
        <div className="flex items-center justify-between space-x-10">
          <div className="flex items-center flex-col">
            <p className="text-xs dark:text-white text-black font-semibold">
              STATUS
            </p>
            <select
              value={filterType}
              onChange={handleFilterType}
              className="px-2 py-1 rounded  dark:bg-[#545151] bg-blue-500 text-white dark:text-white outline-none text-md my-2 cursor-pointer"
            >
              {/* Dynamically generate status options */}
              <option value="all">All</option>
              {uniqueOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center flex-col">
            <p className="text-xs dark:text-white text-black font-semibold">
              ITEMS FOR PAGE
            </p>
            <select
              value={selectedItemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-2 py-1 rounded my-1 dark:bg-[#545151] bg-blue-500 text-white dark:text-white outline-none text-md cursor-pointer"
            >
              <option value="0-10">10</option>
              <option value="0-20">20</option>
              <option value="0-30">30</option>
              <option value="0-40">40</option>
              <option value="0-50">50</option>
            </select>
          </div>
        </div>
        <div className="space-x-2 flex justify-end items-end">
          <button
            className="button dark:bg-green-700  bg-black hover:bg-white hover:text-black "
            onClick={handleConfirm}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};


FilterModal.propTypes = {
  setOpenFilterModal: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired,
  setFilterType: PropTypes.func.isRequired,
  setInvokeFunction: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setSelectedItemsPerPage: PropTypes.func.isRequired,
  selectedItemsPerPage: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      // Add other properties of the 'data' object if necessary
    })
  ),
};


export default FilterModal;
