import { memo, useState } from 'react';
import './css/Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FarmerSignup = () => {
  const navigate = useNavigate();
  const [fname, setName] = useState('');
  const [femail, setEmail] = useState('');
  const [fpass, setPassword] = useState('');
  const [fconfirm, setConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (fpass !== fconfirm) {
        if (window.Swal) {
          await Swal.fire({ icon: 'warning', title: 'Check input', text: 'Passwords do not match' });
        }
        return;
      }
      const fpassword = String(fpass);
      const res = await axios.post('http://localhost:5050/api/farmer/signup', { fname, femail, fpassword });
      if (window.Swal) {
        await Swal.fire({ icon: 'success', title: 'Signed up', text: 'Farmer signed up successfully' });
      }
      navigate('/login/farmer');
      setName('');
      setEmail('');
      setPassword('');
      setConfirm('');
    } catch (error) {
      if (window.Swal) {
        Swal.fire({ icon: 'error', title: 'Signup failed', text: error?.response?.data?.message || error.message || String(error) });
      }
    }
  };

  return (
    <div className="login-page no-navbar">
      <div className="auth-wrap">
        <div className="auth-form-pane">
          <div className="auth-card">
            <h2 className="auth-title">Create Farmer Account</h2>
            <p className="auth-sub">Join FarmHub to showcase your harvests and reach more buyers</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" className="form-control" value={fname} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="form-control" value={femail} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="form-control" value={fpass} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="confirm">Confirm Password</label>
                <input id="confirm" name="confirm" type="password" className="form-control" value={fconfirm} onChange={(e) => setConfirm(e.target.value)} required />
              </div>
              <button className="auth-btn w-100" type="submit">Sign Up</button>
            </form>

            <div className="text-center mt-3">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login/farmer">Log in</Link>
            </div>
          </div>
        </div>

        <div
          className="auth-hero"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjUwfHxmYXJtfGVufDB8fDB8fHww')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="auth-hero-inner">
            <h1 className="display-5 fw-bold">Grow With FarmHub</h1>
            <p className="lead mt-2">"Promote your produce and connect with local buyers"</p>
            <ul className="auth-bullets p-0 mt-3">
              <li>
                <span className="auth-badge">🌾</span>
                <span>List crops and track orders</span>
              </li>
              <li>
                <span className="auth-badge">🤝</span>
                <span>Build relationships with nearby customers</span>
              </li>
              <li>
                <span className="auth-badge">📣</span>
                <span>Share offers and seasonal harvests</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FarmerSignup);
