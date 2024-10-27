import React, { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../utils/constants'
import { logout } from '../../services/Operations/authAPI'
import ProfileDropDown from '../core/ProfileDropDown'

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {totalItems} = useSelector((state) => state.cart)
    const [loading , setLoading] = useState(false);

    const handleLogout = () => {
        dispatch(logout(navigate))
        navigate('/login')
    }


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

            {/* Logo */}
            <Link to="/">
                <h1 className='text-white font-bold'>Shopping App</h1>
            </Link>
            
            {/* Login / SignUp / DashBoard */}

            <div className='gap-x-4 items-center md:flex hidden'>

                {
                    user && user?.accountType !== ACCOUNT_TYPE.SELLER && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart className='text-2xl text-richblack-100'/>
                            {
                                 totalItems > 0 && (
                                    <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                        {totalItems}
                                    </span>
                                ) 
                                
                            }

                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to="/login" >
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md pointer'>
                                 Log in  
                            </button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to="/Signup">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md pointer'>
                                 Sign Up  
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
  )
}

export default NavBar