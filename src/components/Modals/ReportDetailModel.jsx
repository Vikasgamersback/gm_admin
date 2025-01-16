import  { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaEye } from "react-icons/fa6";
import statusGreen from '../../../public/assets/png/status-green.png'
import PropTypes from 'prop-types';

const ReportDetailModel = ({ SetReportDetailModalOpener}) => {

    const [selectedValue, setSelectedValue] = useState('Select');

    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
      
    };

    return (
        <div className="fixed z-10  inset-0 bg-opacity-80 bg-black  flex justify-center items-center rounded-lg ">
            <div className=" relative text-white   w-[80vw]   justify-center    py-5 gap-[1px] flex items-start  rounded-2xl   ">
                <div className='w-[80vw] rounded-lg text-sm h-[40vw] text-black dark:text-white bg-white dark:bg-[#121212] border'>
                    {/* Heading */}
                    <div className='w-[100%] h-[10%] flex items-center justify-start gap-2 pl-5  border-b-[1px] border-[#707070]'>
                        <FaEye />
                        <h2 className='font-semibold'>View Reports</h2>
                    </div>
                    {/* Moderator Detail */}
                    <div className='w-[100%] h-[13%] border-b-[1px] flex flex-col justify-center pl-5 text-sm border-[#707070]'>
                        <div className='flex gap-1'>
                            <div className='font-semibold'>Moderator :</div>
                            <div>Arvinth Kumar</div>
                        </div>
                        <div className='flex gap-1'>
                            <div className='font-semibold'>Employee Id :</div>
                            <div>ddvoindndf92e9</div>
                        </div>

                    </div>
                    {/* Reported Item Detail */}
                    <div className='w-[100%] h-[25%] border-b-[1px] pl-5 border-[#707070] flex justify-between font-semibold'>
                    {/* Post */}
                    {
                          <div className='w-[15%]  flex items-center justify-center'>
                            <img src="https://api.dicebear.com/7.x/initials/svg/user3-avatar.svg" width={'70%'} alt='profileImg' />
                        </div>
                    }
                     {/* User */}
                    {
                        <div className='w-[15%]  flex items-center justify-center'>
                            <img src="https://api.dicebear.com/7.x/initials/svg/user3-avatar.svg" width={'70%'} alt='profileImg' />
                        </div>
                    }  
                        <div className='w-[30%]  flex items-center justify-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                        <div className='w-[10%] flex items-center justify-center'>akgsys</div>
                        <div className='w-[10%]  flex items-center justify-center'>40</div>
                        <div className='w-[10%]  flex items-center justify-center gap-2'>
                            <img src={statusGreen} />
                            Pending</div>
                        <div className='w-[15%] flex items-center justify-center'>
                            <select id="safetySelect" value={selectedValue} onChange={handleSelectChange} className='p-2  text-black rounded-md'>
                                <option value="" className='p-2'>Select</option>
                                <option value="safe" className='p-2'>Safe</option>
                                <option value="notSafe" className='p-2'>Action Required</option>
                            </select>
                        </div>
                    </div>
                    {/* Table */}
                    <div className='w-[100%] h-[50%]  overflow-y-auto '>
                        <table className="w-full text-sm text-left">
                            <thead className="sticky top-0 z-10 border-b dark:text-[#ffffff] bg-[#242424] text-[#ffffff]">
                                <tr>
                                    <th scope="col" className="text-center px-6 py-3">
                                        S.No
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        User
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Report Type
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Comment
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-800 cursor-pointer font-semibold text-[#707070]" >
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        1
                                    </td>
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        userName
                                    </td>
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        PROFILEREPORT
                                    </td>
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        loredvondsvodinsvoidnoier  rvvio nbvoib vdiobveoivb
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-800 cursor-pointer font-semibold text-[#707070]" >
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        1
                                    </td>
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        userName
                                    </td>
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        PROFILEREPORT
                                    </td>
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        loredvondsvodinsvoidnoier  rvvio nbvoib vdiobveoivb
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-800 cursor-pointer font-semibold text-[#707070]" >
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        1
                                    </td>
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        userName
                                    </td>
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        PROFILEREPORT
                                    </td>
                                    <td className="text-center px-6 py-4 text-[#707070] dark:text-white">
                                        loredvondsvodinsvoidnoier  rvvio nbvoib vdiobveoivb
                                    </td>
                                </tr>
                              
                                

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='w-[50px] rounded-lg h-[50px] flex items-center justify-center bg-white hover:bg-gray-500 cursor-pointer text-black' onClick={() => { SetReportDetailModalOpener(false) }}>
                    <RxCross2 size={30} />
                </div>
            </div>
        </div>
    )
}

ReportDetailModel.propTypes = {
    SetReportDetailModalOpener: PropTypes.func
  };


export default ReportDetailModel