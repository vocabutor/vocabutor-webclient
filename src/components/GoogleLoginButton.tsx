import React, { useEffect } from 'react';

interface GoogleLoginButtonProps {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onFailure }) => {
  useEffect(() => {
    // Initialize Google Sign-in button after the component loads
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "215570659379-5ut1gitmhcjso6h4vp2p6vjktgjtb183.apps.googleusercontent.com", // Replace with your client ID
        callback: handleGoogleLoginResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" } // Customize the button style
      );
    }
  }, []);

  const handleGoogleLoginResponse = (response: any) => {
    if (response.credential) {
      onSuccess(response);
    } else {
      onFailure("Google login failed.");
    }
  };

  return <div id="google-signin-button"></div>;
};

export default GoogleLoginButton;
