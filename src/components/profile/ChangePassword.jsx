import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../general-components/Breadcrumbs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
export default function ChangePassword() {
    const[passwordVisible,setPasswordVisible]=useState(false)
    const handleVisibilityToggle=()=>{
      setPasswordVisible(prevPasswordVisible=>!prevPasswordVisible)
    }
    const navigate = useNavigate();
  return (
    <div className="section">
       <div className="border bg-white m-4 p-2 py-4 rounded-lg">
        <div className="flex gap-x-5">
        <div
            className={"flex gap-1 cursor-pointer"}
            onClick={() => {
              navigate("/profile");
            }}
          >
            Personal Info
          </div>
          <div
            className={
              location.pathname === "/changepassword"
                ? "font-semibold flex gap-1"
                : "flex gap-1"
            }
          >
           Change password
          </div>
         
        </div>
      </div>

            <div className="h-screen bg-white mx-4  p-2 rounded-lg">
      <div className="mx-2  flex flex-row justify-between border-b-2 bg-white ">
        <BreadCrumbs nav1="Users" nav2="Change password" />

        <button className="border bg-blue-400 p-2 m-2 rounded-lg text-white">
          Submit
        </button>
        
      </div>

     <div className="flex flex-row m-6 p-2">
      <div className="w-1/3">
          <div className="flex flex-col gap-2">
            <div>Password</div>
            <div className="input-wrapping-div">
              <input
                className="form-input-text border rounded-lg p-2 absolute"
                type={passwordVisible?"password":"text"}
                placeholder="Password"
              
              
              />
              {passwordVisible?(<AiFillEyeInvisible onClick={handleVisibilityToggle} className="relative ml-44 text-xl mt-3 "/>):( <AiFillEye onClick={handleVisibilityToggle} className="relative ml-44 text-xl mt-3 "/>)}
                
            </div>
          </div>
        </div>
        

      

        <div className="w-1/3">
          <div className="flex flex-col gap-2">
            <div>Confirm Password</div>
            <div className="input-wrapping-div">
          
              <input
                className="form-input-text border rounded-lg p-2 absolute"
                type={passwordVisible?"password":"text"}
                placeholder=" Confirm Password"
              
              
              />

              
{passwordVisible?<AiFillEyeInvisible onClick={handleVisibilityToggle} className="relative ml-44 text-xl mt-3 "/>: <AiFillEye onClick={handleVisibilityToggle} className="relative ml-44 text-xl mt-3 "/>}
            </div>
          </div>
        </div>
        </div>
      </div>

     
    </div>
  )
}
