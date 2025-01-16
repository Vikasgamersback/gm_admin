import utils from "../../utils/responseUtils";
import { useNavigate } from "react-router-dom";
import { MdOutlineEditNote } from "react-icons/md";
import { RxEyeOpen } from "react-icons/rx";
import PropTypes from 'prop-types';

const TableComponent = ({
  employeeData,
  listInnerRef,
  setEmployeeData,
  setIsEmployeeEditModalOpen,
  setEditId,
}) => {
  const navigate = useNavigate();
  return (
    <div className="h-full overflow-y-auto" ref={listInnerRef}>
      <table className="w-full text-sm text-left">
        <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
          <tr>
            <th scope="col" className="text-center px-4 py-3">
              <input
                type="checkbox"
                checked={employeeData?.every((check) => check.isChecked)}
                onChange={() => {
                  let tempData = [...employeeData];
                  let allChecked = tempData.every((el) => el.isChecked);
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
              <tr key={index} className="font-semibold text-[#707070]">
                <td className="text-center px-4 py-4 text-[#707070] dark:text-white">
                  <input
                    type="checkbox"
                    checked={el?.isChecked ? true : false}
                    onChange={() => {
                      let tempData = [...employeeData];
                      tempData[index].isChecked = !tempData[index].isChecked;
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
                  {utils.getDateFormat(el.dateOfJoining, "dd/mm/yyyy")}
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
    </div>
  );
};


TableComponent.propTypes = {
  employeeData: PropTypes.arrayOf(
    PropTypes.shape({
      isChecked: PropTypes.bool,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      nickName: PropTypes.string,
      phone: PropTypes.shape({
        code: PropTypes.string,
        number: PropTypes.string,
      }),
      email: PropTypes.string,
      employeeId: PropTypes.string,
      employeeType: PropTypes.string,
      dateOfJoining: PropTypes.string,
      status: PropTypes.string,
      _id: PropTypes.string,
    })
  ),
  listInnerRef: PropTypes.object,
  setEmployeeData: PropTypes.func,
  setIsEmployeeEditModalOpen: PropTypes.func,
  setEditId: PropTypes.func,
};


export default TableComponent;
