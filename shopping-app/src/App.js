import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import OpenRoute from "./components/core/OpenRoute";
import PrivateRoute from "./components/core/PrivateRoute";
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
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
          <Route path='Profile' element={<PrivateRoute>
                <Profile />
              </PrivateRoute>}/>

      </Routes>
    </div>
  );
}

export default App;
