import { useState } from "react";
import FixedSidebar from "../../../general-components/FixedSidebar";
import AddEmployeesModal from "../../../Modals/AddEmployeesModal";

const EmployeeList = () => {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const onCloseEmpModal = () => {
    setIsEmployeeModalOpen(false);
  };
  return (
    <>
      <FixedSidebar />
      <div className="section overflow-y-auto">
        <div className="m-10 flex flex-col space-y-8">
          <div className="flex flex-row items-center justify-between">
            <h5 className="text-2xl">Employee List</h5>
            <button
              className="px-5 py-3 bg-blue-500 rounded-full text-white font-semibold"
              onClick={() => setIsEmployeeModalOpen(true)}
            >
              Add Employees
            </button>
          </div>
        </div>
      </div>
      <AddEmployeesModal open={isEmployeeModalOpen} close={onCloseEmpModal} />
    </>
  );
};

export default EmployeeList;
