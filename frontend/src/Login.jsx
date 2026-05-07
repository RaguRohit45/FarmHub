import { memo, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavbarHome from './NavbarHome';
import './css/Login.css';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (location.state && location.state.msg) {
      setNotice(location.state.msg);
      navigate('/login', { replace: true, state: {} });
    }
  }, [location.state, navigate]);
  return (
    <div className="login-page">
      <NavbarHome />

      <div className="container mt-5">
        {notice && (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {notice}
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setNotice(null)}></button>
          </div>
        )}
        <h1 className="h3 fw-bold text-center mb-4">Choose how you want to continue</h1>
        <div className="row g-4 justify-content-center">
          <div className="col-md-5">
            <div className="card h-100 shadow-sm card-hover">
              <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="icon-box bg-success-subtle text-success">🎓</div>
                  <h2 className="h5 mb-0">I want to Learn</h2>
                </div>
                <p className="text-muted flex-grow-1">Access farming video lessons, ask doubts, and follow expert tips curated for learners.</p>
                <Link to="/login/user" className="btn btn-success mt-auto">Continue as Learner</Link>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card h-100 shadow-sm card-hover">
              <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="icon-box bg-primary-subtle text-primary">🚜</div>
                  <h2 className="h5 mb-0">I am a Farmer</h2>
                </div>
                <p className="text-muted flex-grow-1">Upload videos, answer community questions, and share your farming experience.</p>
                <Link to="/login/farmer" className="btn btn-primary mt-auto">Continue as Farmer</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
