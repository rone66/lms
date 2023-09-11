import React from 'react'

const Iconbtn = ({text,onclick,children,disabled,outline = false,customClasses,type}) => {
  return (
    <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-coral-pink-400 bg-transparent" : "bg-coral-pink-400"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-coral-pink-400"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
  )
}

export default Iconbtn