import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Pagination}  from 'swiper/modules'

import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          //loop={true}
          modules={[FreeMode, Pagination,Autoplay]}
          autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
          pagination={{
          clickable: true,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-800">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
