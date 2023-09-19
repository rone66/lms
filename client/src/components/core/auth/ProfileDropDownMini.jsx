import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../commons/ConfirmationModal"
import { matchPath, useLocation, useNavigate } from 'react-router-dom';


const ProfileDropDownMini = ({setToggle}) => {
    const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
      )
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [confirmationModal, setConfirmationModal] = useState(null)

    if (profileLoading || authLoading) {
        return (
        <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800 ">
            <div className="spinner"></div>
        </div>
        )
    }
    const deactiveToggle=()=>{
        setToggle(false);
    }
    
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }


    return (
        <>
            <div className=" w-[90%] flex items-center justify-between ">
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[45px] rounded-full border-2 border-solid border-coral-pink-500 object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                />
               <button
                onClick={() =>{
                   
                setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
                })
                
                }
                }
                className="px-8 py-2 text-sm font-medium text-richblack-5 bg-coral-pink-400 rounded-md"
               >
               <span>Logout</span>
               </button>

            </div>

            <div className='border-b-[2px] border-b-coral-pink-400 w-[85%] m-3'></div>


            <div>
            <div className="flex flex-col gap-2">
                {sidebarLinks.map((link) => {
                 if (link.type && user?.accountType !== link.type) return null
                return (
                <div key={link.id}>
                    <p onClick={()=>{
                        navigate(`${link.path}`)
                        deactiveToggle()
                    }}
                    className={`font-semibold ${
                            matchRoute(link.path)
                            ? "text-coral-pink-400"
                            : "text-richblack-500"
                            }`}
                    >
                    {link.name}</p>
                </div>

                )
                })}
            </div>

            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>

    )
}

export default ProfileDropDownMini