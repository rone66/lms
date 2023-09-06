import React from 'react';
import { Link } from 'react-router-dom';
import {FaArrowRight} from "react-icons/fa";
import HighlightText from '../components/core/homepage/HighlightText';
import CTAButton from '../components/core/homepage/Button';
import Banner from '../assets/production.mp4'
import CodeBlocks from "../components/core/homepage/CodeBlocks";
import TimelineSection from '../components/core/homepage/TimelineSection ';
import LearningLanguageSection from '../components/core/homepage/LearningLanguageSection';
import InstructorSection from '../components/core/homepage/InstructorSection';
import ExploreMore from "../components/core/homepage/ExploreMore"
import { TypeAnimation } from 'react-type-animation';
import Footer from '../components/commons/Footer';


const Home = () => {
 
  return (
    <div>
        {/* section-1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center justify-between max-w-maxContent '>
            <Link to={"/signup"}>
                <div className=' group mx-auto mt-16 p-1 rounded-md bg-coral-pink-400 font bold transition-all duration-200  text-white hover:scale-95 hover:bg-coral-pink-500 w-fit'>
                    <div className='flex flex-row items-center gap-2 px-10 py-[5px] transition-all duration-200 group-hover:bg-coral-pink-500'>
                        <p>Become a instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7 block'>
                {`Start a coding Journey with `}  
                {/* <HighlightText text={text}/> */}
                <TypeAnimation 
                sequence={[" pwLms",5000,""]}
                repeat={Infinity}
                cursor={true}
                style={{
                  color:"#E97862",
                }}

                />
            </div>

            <div className='w-[90%] mt-4 text-center text-lg font-semiBold text-pure-greys-200 '>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>
            </div>

            <div className='mx-3 my-12 w-11/12 '>
                <video muted loop autoPlay className='shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-md'>
                    <source src={Banner} type="Video/mp4"/>
                </video>
            </div>

            {/* animation coding section */}
            {/* section1 */}

            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HighlightText text={" coding potential "}/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={{
                        btnText:"Explore",
                        linkto:"/signup",
                        active:true,
                    }}
                    ctabtn2={{
                        btnText:"Learn more",
                        linkto:"/login",
                        active:false,
                    }}
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    codeColor={`text-pure-greys-200`}
                />
            </div>

            {/* section2 */}

            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                           Start
                            <HighlightText text={" coding in seconds "}/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={{
                        btnText:"Continue Lesson",
                        linkto:"/signup",
                        active:true,
                    }}
                    ctabtn2={{
                        btnText:"Learn more",
                        linkto:"/login",
                        active:false,
                    }}
                    codeblock={`import React from "react";\n import Button from "./Button";\nimport TypeAnimation from "react-type-animation";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    codeColor={`text-pure-greys-200`}
                />
            </div>
            
            <ExploreMore/>
        </div>

        {/* animation section-2 */}
        <div className=" text-richblack-700">
        <div className="bg-pure-greys-100 h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore full website
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] mt-5">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern <HighlightText text={"pwLms"}/> is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Know More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
           <LearningLanguageSection /> 
        </div>
      </div>
        {/* section-3 */}
        <div className='w-11/12 relative my-20 mx-auto max-w-maxContent flex-col items-center justify-between gap-8'>
                    <InstructorSection/>
                    <h2 className='text-center text-4xl font-semibold mt-10 '>Our Achievers Reviews</h2>
        </div>

        {/* footer */}

        <Footer/>

    </div>
  )
}

export default Home