// utils/auth.js
export const isUserAuthenticated = () => {
    const token = localStorage.getItem('auth-token');
    return token !== null; // Check if the token exists in local storage to determine if the user is authenticated.
  };
  