import React from 'react';
import errorImg from "../assets/error.png"

const Error = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-5'>
        <img src={errorImg} alt='' className='w-8/12 object-cover'/>
        <p className='text-3xl font-semibold'>Check the url !!!..<span className='text-3xl font font-semibold text-coral-pink-400'>Please</span></p>
    </div>
  )
}

export default Error