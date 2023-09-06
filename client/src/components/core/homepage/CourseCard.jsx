import React from 'react';
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
    <div
    className={`w-[360px] lg:w-[30%] shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${
      currentCard === cardData?.heading
        ? "bg-white  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] shadow-coral-pink-400 scale-95"
        : "bg-richblack-800 hover:scale-95 transition-all duration-200"
    }  text-richblack-25 h-[300px] box-border cursor-pointer rounded-md`}
    onClick={() => setCurrentCard(cardData?.heading)}
  >
    <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
      <div
        className={` ${
          currentCard === cardData?.heading && "text-richblack-800"
        } font-semibold text-[20px]`}
      >
        {cardData?.heading}
      </div>

      <div className="text-richblack-400">{cardData?.description}</div>
    </div>

    <div
      className={`flex justify-between ${
        currentCard === cardData?.heading ? "text-coral-pink-500" : "text-richblack-300"
      } px-6 py-3 font-medium`}
    >
      {/* Level */}
      <div className="flex items-center gap-2 text-[16px]">
        <HiUsers />
        <p>{cardData?.level}</p>
      </div>

      {/* Flow Chart */}
      <div className="flex items-center gap-2 text-[16px]">
        <ImTree />
        <p>{cardData?.lessionNumber} Lession</p>
      </div>
    </div>
  </div>
  )
}

export default CourseCard;