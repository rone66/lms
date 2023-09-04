import React from 'react';
import instructor from "../../../assets/hero-bg.png";
import HighlightText from './HighlightText';
import CTAButton from './Button';
import { FaArrowRight } from 'react-icons/fa';

const InstructorSection = () => {
  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-20 items-center'>

            <div className='lg:w-[50%] w-[90%]'>
                <img src={instructor} alt=''/>
            </div>

            <div className='lg:w-[50%] flex flex-col gap-10 items-center w-[80%]'>
                <div className='lg:text-4xl font-semibold text-3xl'>
                    Become a
                    <HighlightText text={"Student"}/>                
                </div>

                <p className='font-medium text-[16px] w-[90%] text-pure-greys-200'>
                Joining our pwLms is your key to knowledge, where learning meets convenience. Access a world of wisdom at your fingertips!
                </p>

                <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                </div>
            
            </div>

        </div>
    </div>
  )
}

export default InstructorSection