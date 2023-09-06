import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
  const [formData, setFormData]=useState({password:"",confirmPassord:""})
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const {loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const location=useLocation();
  const {password,confirmPassword}=formData;

  const handleOnChange=(e)=>{
    setFormData((prevData)=>(
      {
        ...prevData,
        [e.target.name]:e.target.value,
      }
    ))
  }  

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    const token=location.pathname.split('/').at(-1);
    dispatch(resetPassword(password,confirmPassword,token))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center ">
        { 
            loading ? (
              <div className='spinner'></div>
            ) 
            : 
            (<div className="max-w-[500px] p-4 lg:p-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
              <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-coral-pink-400">Choose New Password</h1>
              <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-800">Almost done. Enter new password and you are all set</p>
              <form onSubmit={handleOnSubmit}>

                <label className="relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800">New Password<sup className="text-pink-200">*</sup></p>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name='password'
                    value={password}
                    onChange={handleOnChange}
                    placeholder='Enter Password'
                    className="form-style w-full !pr-10  bg-richblack-800 text-richblack-5 px-[8px] py-[12px] rounded-md"
                  />
                  <span
                  onClick={()=>setShowPassword((prev)=>!prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {
                      showPassword ? <AiOutlineEyeInvisible fontSize={24} color='#ffff'/> 
                      : 
                      <AiOutlineEye fontSize={24} color='#ffff'/>
                    }
                  </span>
                </label>

                <label className="relative mt-3 block">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800">Confirm New Password<sup>*</sup></p>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder='Confirm Password'
                    className="form-style w-full !pr-10 bg-richblack-800 text-richblack-5 px-[8px] py-[12px] rounded-md"
                  />
                  <span
                  onClick={()=>setShowConfirmPassword((prev)=>!prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {
                      showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} color='#ffff'/> 
                      : 
                      <AiOutlineEye fontSize={24} color='#ffff'/>
                    }
                  </span>
                </label>

                <button
                type='submit'
                className="mt-6 w-full rounded-[8px] bg-coral-pink-400 py-[12px] px-[12px] font-medium text-richblack-5 hover:scale-95 hover:bg-coral-pink-500 transition-all duration-200"
                >
                  Reset Password
                </button>


              </form>

              <div className="mt-6 flex items-center justify-between">
                <Link to="/login">
                    <p className="flex items-center gap-x-2 text-pink-200">Back to Login</p>
                </Link>
              </div>
            </div>
            )
        }
    </div>
  )
}

export default UpdatePassword