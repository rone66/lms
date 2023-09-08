import React from 'react'
import ContactusForm from '../../commons/ContactusForm'




const ContactFormSection = () => {
  return (
    <div className='flex flex-row items-center justify-center'>
      <div className=" lg:w-[45%] w-[97%] border border-coral-pink-400 bg-richblack-800 text-richblack-100 rounded-xl p-7 lg:p-14 flex gap-3 flex-col place-content-center">
      <h1 className="text-center text-4xl font-semibold text-coral-pink-400 ">Get in Touch</h1>
      <p className="text-center text-richblack-800 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-7">
        <ContactusForm />
      </div>
      
    </div>
    </div>
    
    
  )
}

export default ContactFormSection