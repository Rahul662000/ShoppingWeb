import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import OpenRoute from "./components/core/OpenRoute";
import PrivateRoute from "./components/core/PrivateRoute";
import DashBoard from './pages/DashBoard';
import NavBar from './components/common/NavBar';
import MyProfile from './components/core/DashBoard/MyProfile';
import Setting from './components/core/DashBoard/Setting'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails } from "./services/Operations/profileAPI"
import { ACCOUNT_TYPE } from "./utils/constants";
import Cart from "./components/core/DashBoard/Cart";

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const token = JSON.parse(localStorage.getItem("jwt"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <NavBar/>
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        <Route 
          path="signup" 
          element={
              <OpenRoute>
                <SignUp />
              </OpenRoute>
          } />
          
          <Route 
          path="login" 
          element={
            <OpenRoute>
              <LogIn />
            </OpenRoute>
          } />
          
          <Route element={<PrivateRoute>
                <DashBoard />
          </PrivateRoute>}>

            <Route path="dashboard/my-profile" element={
                <MyProfile />
            } />

            <Route path="dashboard/settings" element={
                <Setting />
            } />

            {
              user?.accountType === ACCOUNT_TYPE.BUYER && (
                <>
                  <Route path="dashboard/cart" element={
                    <Cart />
                  } />

                  {/* <Route path="dashboard/enrolled-courses" element={
                    <EnrolledCourses />
                  } /> */}
                </>
              )
            } 

          </Route>

      </Routes>
    </div>
  );
}

export default App;
