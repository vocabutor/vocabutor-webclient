
import React from 'react';
import './Login.css';
import GoogleLoginButton from '../GoogleLoginButton';
import { setAuthCookie } from '../../helpers/Cookies';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const navigate = useNavigate();

    const handleGoogleSuccess = async (response: any) => {
        console.log("Google login successful:", response);
        try {
            const res = await fetch("/api/v1/auth/login/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                { 'clientId': response.clientId, 'credential': response.credential }
            ),
            });
        
            if (res.ok) {
              const data = await res.json();
              const jwtToken = data.token; // Assume backend returns a JWT token
              console.log("Logged in successfully!");
              console.log(jwtToken);
              setAuthCookie(jwtToken)
              navigate("/")
            } else {
              console.error("Google login verification failed.");
            }
          } catch (error) {
            console.error("An error occurred during login:", error);
          }
      };
    
      const handleGoogleFailure = (error: any) => {
        console.error("Google login failed:", error);
        // Handle login error
      };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form className="login-form">
        <label>
          Email
          <input type="email" placeholder="Enter your email" required />
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter your password" required />
        </label>
        <button type="submit">Login</button>
      </form>
      <div className="divider">or</div>
      <GoogleLoginButton
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
      />
    </div>
  );
};

export default Login;