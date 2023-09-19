import React from 'react';
import logo from '../../assets/PWSkills-white.png';
import {HiMail} from "react-icons/hi";
import {BsTelephoneFill,BsFacebook,BsInstagram,BsTelegram,BsYoutube,BsTwitter,BsLinkedin,BsDiscord} from "react-icons/bs"
import isoLogo from '../../assets/svgviewer-png-output.png';
import {useNavigate} from 'react-router-dom';
const Footer = () => {
  const navigate=useNavigate();
  return (
    <div >
      <div className='bg-richblack-800 w-full  flex lg:flex-row items-center justify-evenly flex-col gap-11'>
        {/* section-1 */}
      <div className='flex flex-col gap-8 w-[1/3] mt-20'>
        <img src={logo} alt='' className='w-[150px]'/>
        <div className='flex flex-row items-center gap-2 text-white'>
          <HiMail style={{fontSize:"22px"}}/>
          <p>pwlms6@gmail.com</p>
        </div>

        <div className='flex flex-row items-center gap-2 text-white'>
          <BsTelephoneFill style={{fontSize:"22px"}}/>
          <p>7908801276</p>
        </div>

        <div className='flex flex-row gap-5 items-center text-white font-[16px]'>
            <BsFacebook style={{fontSize:"25px"}}/>
            <BsInstagram style={{fontSize:"25px"}}/>
            <BsTelegram style={{fontSize:"25px"}}/>
            <BsYoutube style={{fontSize:"25px"}}/>
            <BsTwitter style={{fontSize:"25px"}}/>
            <BsLinkedin style={{fontSize:"25px"}}/>
            <BsDiscord style={{fontSize:"25px"}}/>
        </div>

        <img src={isoLogo} alt='' className='w-[70px] h-[70px]'/>
        

      </div>

      
      {/* section-2 */}
      <div className='flex flex-col gap-5  w-[1/3]'>
        <h1 className='text-[20px] font-bold text-white'>Company</h1>

        <div className='h-1 rounded-sm bg-coral-pink-400 w-[80%]'></div>

        <div className='flex flex-row items-center gap-12'>
          <div className='flex flex-col gap-10 text-white'>
            <p className='cursor-pointer' onClick={()=>navigate("/about")}>About Us</p>
            <p className='cursor-pointer'>FAQ</p>
            <p className='cursor-pointer'>Privacy Policy</p>
          </div>
          <div className='flex flex-col gap-10 text-white'>
            <p className='cursor-pointer' onClick={()=>navigate("/contact")}>Contact Us</p>
            <p className='cursor-pointer'>Job Assurance</p>
            <p className='cursor-pointer'>Terms And Conditions</p>
          </div>
        </div>

      </div>
      
      {/* section-3 */}
      <div className='flex flex-col gap-5 p-10 w-[1/3]'>
        <h1 className='text-[20px] font-bold text-white'>Products</h1>

        <div className='h-1 rounded-sm bg-coral-pink-400 w-[80%]'></div>

        <div className='flex flex-row items-center gap-12'>
          <div className='flex flex-col gap-10 text-white'>
            <p className='cursor-pointer'>Lms lab</p>
            <p className='cursor-pointer'>Experience Portal</p>
            <p className='cursor-pointer'>Hall of Fame</p>
          </div>
          <div className='flex flex-col gap-10 text-white'>
            <p className='cursor-pointer'>Job Portal</p>
            <p className='cursor-pointer'>Become an affiliate</p>
            <p className='cursor-pointer'>Love pwLms</p>
          </div>
        </div>

      </div>
        
      </div> 
      
    </div>
  )
}

export default Footer