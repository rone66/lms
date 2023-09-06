import React from 'react'
import ContactusForm from '../../commons/ContactusForm'




const ContactFormSection = () => {
  return (
    <div className="mx-auto rounded-md lg:shadow-[0_8px_30px_rgb(0,0,0,0.12)] lg:p-5  lg:bg-pure-greys-50 ">
      <h1 className="text-center text-4xl font-semibold text-coral-pink-400 ">Get in Touch</h1>
      <p className="text-center text-richblack-800 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 mx-auto">
        <ContactusForm />
      </div>
      
    </div>
    
  )
}

export default ContactFormSection