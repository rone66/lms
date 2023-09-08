import React from 'react'
import ContactDetails from '../components/commons/contact/ContactDetails'
import ContactForm from '../components/commons/contact/ContactForm'
import Footer from '../components/commons/Footer';
const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* datails about company address */}
        <div className="lg:w-[40%]">
          <ContactDetails/>
        </div>

        {/* contact form */}
        <div className="lg:w-[60%]">
          <ContactForm/>
        </div>
      </div> 

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* ReviewSlider */}
      </div> 

      <Footer/>  
    </div>
  )
}

export default Contact