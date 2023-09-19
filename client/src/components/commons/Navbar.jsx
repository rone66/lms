import React, { useEffect, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import logo from "../../assets/PWSkills-logo.png";
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { BsChevronDown } from "react-icons/bs";
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';
import menuBarImg from '../../assets/burger-bar.png';
import cancelImg from '../../assets/cancel.png';
import ProfileDropDownMini from '../core/auth/ProfileDropDownMini';

// const subLinks=[
//     {
//         title:"python",
//         link:"/catalog/python",
//     },
//     {
//         title:"webdev",
//         link:"/catalog/webdev",
//     }
// ]

const Navbar = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(false);


  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    const fetchSublinks = async () => {
      setLoading(true);
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        console.log("printing sublinks-->", result);
        setLoading(false);
        setSubLinks(result.data.data);

      } catch (error) {
        console.log("could not fetch category list");
      }
    }
    fetchSublinks();
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }

  const activeHandler= ()=>{
    //console.log("i am clicked");
    if(active){
      setActive(false)
    }
    if(!active){
      setActive(true);
    }
   
  }


  return (
    <div className='relative'>
      <div className='sm:flex hidden h-14 items-center justify-center bg-[#F0F0F0] '>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
          <Link to="/">
            <img src={logo} alt='' className='w-[160px] h-[60px]' loading='lazy' />
          </Link>

          {/* navlinks */}
          <nav>
            <ul className='flex gap-x-6 text-richblack-800'>
              {
                NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {
                      link.title === 'Catalog' ? (
                        <>
                          <div
                            className={`group relative flex cursor-pointer font-semibold items-center gap-1 ${matchRoute("/catalog/:catalogName")
                                ? "text-coral-pink-400"
                                : "text-richblack-800"
                              }`}
                          >
                            <p>{link.title}</p>
                            <BsChevronDown />
                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-700 p-4 text-richblack-5 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                              <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-700"></div>
                              {loading ? (
                                <p className="text-center">Loading...</p>
                              ) : (subLinks && subLinks.length) ? (
                                <>
                                  {subLinks
                                    ?.map((subLink, i) => (
                                      <Link
                                        to={`/catalog/${subLink.name
                                          .split(" ")
                                          .join("-")
                                          .toLowerCase()}`}
                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-coral-pink-400"
                                        key={i}
                                      >
                                        <p>{subLink.name}</p>
                                      </Link>
                                    ))}
                                </>
                              ) : (
                                <p className="text-center">No Courses Found</p>
                              )}
                            </div>
                          </div>
                        </>

                      )
                        :
                        (<Link to={link?.path}>
                          <p className={`${matchRoute(link?.path) ? "text-coral-pink-400" : "text-richblack-800"} font-semibold`}>{link.title}</p>
                        </Link>)
                    }
                  </li>
                ))
              }
            </ul>
          </nav>

          {/* login-signup section */}

          <div className='flex gap-x-4 items-center'>
            {
              user && user?.accountType !== "Instructor" && (
                <Link to="/dashboard/cart" className='relative'>
                  <AiOutlineShoppingCart fontSize="1.5rem" />
                  {
                    totalItems > 0 && (
                      <span className="absolute bottom-3 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-richblack-5">
                        {totalItems}
                      </span>
                    )
                  }
                </Link>
              )
            }
            {
              token === null && (
                <Link to="/login">
                  <button className='text-white bg-coral-pink-400 px-[12px] py-[8px] rounded-md hover:scale-95 hover:bg-coral-pink-500 transition-all duration-200'>
                    Login
                  </button>
                </Link>
              )
            }
            {
              token === null && (
                <Link to="/signup">
                  <button className='text-white bg-coral-pink-400 px-[12px] py-[8px] rounded-md hover:scale-95 hover:bg-coral-pink-500 transition-all duration-200'>
                    Sign up
                  </button>
                </Link>
              )
            }
            {
              token !== null && <ProfileDropDown />
            }
          </div>

        </div>
      </div>

      {/* mobile responsive */}
      <div className=" sticky sm:hidden flex flex-row justify-between items-center py-1 px-4 z-[100]">
        <img src={logo} alt='' className='w-[160px] h-[60px]' loading='lazy' />
        <img
          src={toggle ? cancelImg : menuBarImg}
          alt="menu"
          className="w-[28px] h-[28px] object-contain "
          onClick={() => setToggle(!toggle)}
        />

        {/* Sidebar */}
        <div
          className={`${!toggle ? "hidden" : "flex flex-col"
            }  absolute top-16 p-6 left-0 z-[10] r-[4] w-[100%] bg-pure-greys-25 items-center gap-5`}
        >
          <ul className="list-none flex justify-center items-center flex-1 flex-col gap-3 z-10 bg-pure-greys-25">
            {
              NavbarLinks.map((link, index) => (
                <li key={index}>
                  {
                    link.title === 'Catalog' ? (
                      <>
                        <div
                          className={`group relative flex cursor-pointer font-semibold items-center gap-1 ${matchRoute("/catalog/:catalogName")
                              ? "text-coral-pink-400"
                              : "text-richblack-800"
                            }`}
                            onClick={() => activeHandler()}
                        >
                          <p onClick={() => activeHandler()}>{link.title}</p>
                          <BsChevronDown />
                          {
                            active === true ? 
                              (
                                <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[380px] translate-x-[-50%] translate-y-[3em] flex-col rounded-md bg-richblack-700 p-4 text-richblack-5 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 ">
                                  <div className="absolute left-[50%] top-0 z-[1000] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-700"></div>
                                  {loading ? (
                                    <p className="text-center">Loading...</p>
                                  ) : (subLinks && subLinks.length) ? (
                                    <>
                                      {subLinks
                                        ?.map((subLink, i) => (
                                          <Link
                                            to={`/catalog/${subLink.name
                                              .split(" ")
                                              .join("-")
                                              .toLowerCase()}`}
                                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-coral-pink-400"
                                            key={i}
                                            onClick={()=>setToggle(false)}
                                          >
                                            {subLink.name}
                                          </Link>
                                        ))}
                                    </>
                                  ) : (
                                    <p className="text-center">No Courses Found</p>
                                  )}
                                </div>
                              ):(<div className='invisible'></div>)
                          }

                        </div>
                      </>

                    )
                      :
                      (<Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "text-coral-pink-400" : "text-richblack-800"} font-semibold`}
                        onClick={()=>{setToggle(!toggle)}}
                        >{link.title}</p>
                      </Link>)
                  }
                </li>
              ))
            }
          </ul>

          <div className='border-b-[2px] border-b-coral-pink-400 w-[75%]'></div>

          {/* login section */}

          <div className='flex flex-col gap-2 items-center w-[90%] '>
            {
              user && user?.accountType !== "Instructor" && (
                <Link to="/dashboard/cart" className='absolute mt-2'>
                  <AiOutlineShoppingCart fontSize="1.5rem" onClick={()=>setToggle(!toggle)}/>
                  {
                    totalItems > 0 && (
                      <span className="absolute bottom-3 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-richblack-5">
                        {totalItems}
                      </span>
                    )
                  }
                </Link>
              )
            }
            {
              token === null && (
                <Link to="/login">
                  <button className='text-white bg-coral-pink-400 px-[12px] py-[8px] rounded-md hover:scale-95 hover:bg-coral-pink-500 transition-all duration-200'
                  onClick={()=>setToggle(!toggle)}
                  >
                    Login
                  </button>
                </Link>
              )
            }
            {
              token === null && (
                <Link to="/signup">
                  <button className='text-white bg-coral-pink-400 px-[12px] py-[8px] rounded-md hover:scale-95 hover:bg-coral-pink-500 transition-all duration-200'
                  onClick={()=>setToggle(!toggle)}
                  >
                    Sign up
                  </button>
                </Link>
              )
            }
            {
              token !== null && <ProfileDropDownMini setToggle={setToggle}/>
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default Navbar