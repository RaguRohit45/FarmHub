import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Global fetch interceptor to handle expired sessions (401)
if (typeof window !== 'undefined' && !window.__fetchPatched) {
  const originalFetch = window.fetch.bind(window);
  let isHandlingLogout = false;
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    if (response && response.status === 401 && !isHandlingLogout) {
      try {
        isHandlingLogout = true;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userEmail');
        window.dispatchEvent(new Event('auth-changed'));
        if (window.Swal && typeof window.Swal.fire === 'function') {
          await window.Swal.fire({
            icon: 'warning',
            title: 'Session expired',
            text: 'Your session has expired. Please log in again.',
            confirmButtonText: 'OK'
          });
        }
      } finally {
        isHandlingLogout = false;
        // Redirect to login route
        window.location.href = '/login';
      }
    }
    return response;
  };
  window.__fetchPatched = true;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
