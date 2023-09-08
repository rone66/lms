import React from 'react';
import ContactusForm from '../ContactusForm';

const ContactForm = () => {
  return (
    <div className="border border-coral-pink-400 bg-richblack-800 text-richblack-100 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
    <h1 className="text-4xl leading-10 font-semibold text-coral-pink-400">
      Got a Idea? We&apos;ve got the skills. Let&apos;s team up
    </h1>
    <p className="">
      Tell us more about yourself and what you&apos;re got in mind.
    </p>

    <div className="mt-7">
      <ContactusForm />
    </div>
  </div>
  )
}

export default ContactForm