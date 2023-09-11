import React from 'react';
import { useSelector } from 'react-redux';
import Iconbtn from '../../../commons/Iconbtn';

const RenderTotalAmount = () => {
    const {total}=useSelector((state)=>state.cart);
    const {cart}=useSelector((state)=>state.cart);

    const handleBuyCourse=()=>{
        const courses = cart.map((course)=>course._id);
        console.log("bought these courses",courses);
    }
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p  className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
        <p className="mb-6 text-3xl font-medium text-coral-pink-400">₹  {total}</p>
        <Iconbtn
            text="Buy Now"
            onClick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmount