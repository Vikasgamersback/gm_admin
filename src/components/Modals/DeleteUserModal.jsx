import { BsTrash } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import PropTypes from 'prop-types';

export default function DeleteUserModal({ open, close }) {
  return (
    <>
      {open && (
        <div
          className="fixed z-10 inset-0  bg-opacity-60 bg-black flex flex-col justify-center items-center"
          onClick={close}
        >
          <div className="bg-white dark:bg-[#121212] border w-full max-w-3xl rounded-2xl  m-2 text-grey-800">
            <div className="flex justify-between items-center m-2 p-3 flex-row text-xl">
              <div className="flex flex-row items-center space-x-5">
                <BsTrash className="m-1 mr-3 " />
                <h5 className="text-black font-semibold">Delete Users</h5>
              </div>
              <MdClose
                color="#242424"
                className="cursor-pointer"
                size={25}
                onClick={close}
              />
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-zinc-100 font-bold text-zinc-700 ">
                  <th className="px-10 py-2">User Info</th>
                  <th className="px-10 py-2">Last active</th>
                  <th className="px-10 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-zinc-500">
                  <td className="m-6 p-6">
                    <div className="flex flex-row space-x-4">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
                        className=" w-[80px] h-[80px]  rounded-lg "
                      />
                      <div className="mt-7  pl-2">Arvinth Kumar</div>
                    </div>
                  </td>
                  <td className="p-10 m-10 text-center">2hrs ago</td>
                  <td className="p-10 m-10 text-center">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center w-full max-w-3xl space-x-4">
            <button className="rounded-lg w-1/2 text-white bg-blue-500 py-2  outline-none">
              Cancel
            </button>
            <button className="rounded-lg w-1/2  text-white bg-red-500 py-2 outline-none">
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

DeleteUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func,
};
