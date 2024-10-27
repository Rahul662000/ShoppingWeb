import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logout } from "../../services/Operations/authAPI"
import { AiOutlineCaretDown } from 'react-icons/ai'

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)

  // Handle mouse enter and leave events to toggle the dropdown

    function useOnClickOutside(ref,handler){
        useEffect(()=>{
            // Define the listener function to be called on click/touch events
    
            const listener = (event) => {
                // If the click/touch event originated inside the ref element, do nothing
                if(!ref.current || ref.current.contains(event.target)){
                    return;
                }
                // Otherwise, call the provided handler function
                handler(event);
            };
    
            // Add event listeners for mousedown and touchstart events on the document
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
    
            // Cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change
    
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
              };
    
    
        },[ref,handler]);
    }

    useOnClickOutside(ref , () => setOpen(false))

  
  if(!user) return null

  return (
    <button className='relative' onClick={() => setOpen(true)}>

      <div className='flex items-center gap-x-1'>
        <img src={user?.image}
          alt={`profile-${user?.firstName}`}
          className='aspect-square w-[30px] rounded-full object-cover'
        />
        <AiOutlineCaretDown className='text-sm text-richblack-100'/>
      </div>

    {open && (
        <div onClick={(e) => e.stopPropagation()}
        className='absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800' ref={ref}>
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
            </Link>
            <div
            onClick={() => {
                dispatch(logout(navigate))
                navigate('/login')
                setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>

        </div>
    )}

    </button>
  );
};

export default ProfileDropDown;