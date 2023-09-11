import React from 'react';
import RenderCartCourses from '../Cart/RenderCartCourses';
import RenderTotalAmount from '../Cart/RenderTotalAmount';
import { useSelector } from 'react-redux';

const Cart = () => {
    const {total,totalItems}= useSelector((state)=>state.cart);
  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-coral-pink-400">My Wishlist</h1>
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-800">{totalItems} Courses in Cart</p>

        {total > 0 ? 
        (<div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
            <RenderCartCourses/>
            <RenderTotalAmount/>
        </div>) : 
        (<p className="mt-14 text-center text-3xl text-richblack-800">Your cart is Empty</p>)

        }
    </div>
  )
}

export default Cart