import React, { useEffect, useState } from 'react';
import {Swiper, SwiperSlide} from "swiper/react"
import ReactStars from "react-rating-stars-component"
import { FaStar } from "react-icons/fa"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'
import {ratingsEndpoints} from "../../services/api";
import {apiConnector} from '../../services/apiConnector'
const ReviewSlider = () => {

  const [reviews,setReviews]=useState([]);
  const truncatedWord=15;

  useEffect(()=>{
    const fetchAllReviews= async()=>{
      const {data}= await apiConnector('GET',ratingsEndpoints.REVIEWS_DETAILS_API);
      console.log("ratings-->",data);

      if (data?.success) {
        setReviews(data?.data)
      }

    }
    fetchAllReviews();
  },[])


  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: {
              slidesPerView:4,
              
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-[#f0f0f0] lg:h-[200px] rounded-md p-3 text-[14px] text-richblack-800 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-800">
                    {review?.review.split(" ").length > truncatedWord
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncatedWord)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-pink-400">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#EF476F"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider