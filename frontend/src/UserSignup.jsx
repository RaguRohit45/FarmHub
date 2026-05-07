import { memo, useState } from 'react';
import './css/Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserSignup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (pass !== confirm) {
                if (window.Swal) {
                    await Swal.fire({ icon: 'warning', title: 'Check input', text: 'Passwords do not match' });
                }
                return;
            }
            const password = String(pass);
            const res = await axios.post('https://farmhub-tnfz.onrender.com/api/user/signup', { name, email, password });
            if (window.Swal) {
                await Swal.fire({ icon: 'success', title: 'Signed up', text: 'User signed up successfully' });
            }
            navigate('/login/user');
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
                {/* Left form panel */}
                <div className="auth-form-pane">
                    <div className="auth-card">
                        <h2 className="auth-title">Create User Account</h2>
                        <p className="auth-sub">Join FarmHub to discover fresh produce and more</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Full Name</label>
                                <input id="name" name="name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input id="email" name="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input id="password" name="password" type="password" className="form-control" value={pass} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="confirm">Confirm Password</label>
                                <input id="confirm" name="confirm" type="password" className="form-control" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                            </div>
                            <button className="auth-btn w-100" type="submit">Sign Up</button>
                        </form>
                        <div className="text-center mt-3">
                            <span className="text-muted">Already have an account? </span>
                            <Link to="/login/user">Log in</Link>
                        </div>
                    </div>
                </div>

                {/* Right hero panel */}
                <div
                    className="auth-hero"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1728725045728-60c0beb17c02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGZhcm1pbmclMjA0a3xlbnwwfHwwfHx8MA%3D%3D')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="auth-hero-inner">
                        <h1 className="display-5 fw-bold">Shop Fresh, Eat Better</h1>
                        <p className="lead mt-2">"Discover seasonal produce directly from local farms"</p>
                        <ul className="auth-bullets p-0 mt-3">
                            <li>
                                <span className="auth-badge">🧺</span>
                                <span>Curated farmer listings and offers</span>
                            </li>
                            <li>
                                <span className="auth-badge">⭐</span>
                                <span>Quality produce from trusted sources</span>
                            </li>
                            <li>
                                <span className="auth-badge">📍</span>
                                <span>Find farms near you</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(UserSignup);
