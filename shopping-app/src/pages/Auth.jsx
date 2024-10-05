import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <div className={`form-container ${isLogin ? '' : 'right-panel-active'}`}>
        {/* Sign Up Form */}
        <div className="form sign-up-form">
          <h2>Create Account</h2>
          <form>
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Login Form */}
        <div className="form sign-in-form">
          <h2>Sign In</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay to switch between forms */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Welcome Back!</h2>
              <p>To keep connected with us, please login with your personal info</p>
              <button className="ghost" onClick={toggleForm}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={toggleForm}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;