import { memo, useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FarmerLogin = () => {
    const navigate = useNavigate();
    const [femail, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const fpassword = String(password);
            const res = await axios.post('https://farmhub-tnfz.onrender.com/api/farmer/login', { femail, fpassword });
            if (window.Swal) {
                await Swal.fire({ icon: 'success', title: 'Logged in', text: 'Farmer logged in successfully' });
            }
            localStorage.setItem("token", res.data.token);
            if (res?.data?.farmer?.fname) {
                localStorage.setItem("userName", res.data.farmer.fname);
            }
            window.dispatchEvent(new Event('auth-changed'));
            console.log(res.data.token);
            navigate('/farmerupload');
            setEmail('');
            setPassword('');
        } catch (error) {
            if (window.Swal) {
                Swal.fire({ icon: 'error', title: 'Login failed', text: error?.response?.data?.message || error.message || 'Login failed' });
            }
        }
    }

    return (
        <div className="login-page no-navbar">
            <div className="auth-wrap">
                <div
                    className="auth-hero"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1536147116438-62679a5e01f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQzfHxmYXJtfGVufDB8fDB8fHww')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="auth-hero-inner">
                        <h1 className="display-5 fw-bold">Welcome Back, Farmer</h1>
                        <p className="lead mt-2">"Grow your network, manage listings, and reach more customers"</p>
                        <ul className="auth-bullets p-0 mt-3">
                            <li>
                                <span className="auth-badge">🌾</span>
                                <span>Post your harvests and manage inventory</span>
                            </li>
                            <li>
                                <span className="auth-badge">📦</span>
                                <span>Organize orders and deliveries easily</span>
                            </li>
                            <li>
                                <span className="auth-badge">📈</span>
                                <span>Reach new buyers and grow your business</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="auth-form-pane">
                    <div className="auth-card">
                        <h2 className="auth-title">Login to Your Account</h2>
                        <p className="auth-sub">Enter your credentials to access your farmer dashboard</p>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input id="email" type="email" className="form-control" value={femail} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button className="auth-btn w-100" type="submit">Login</button>
                        </form>
                        <div className="text-center mt-3">
                            <span className="text-muted">Don't have an account? </span>
                            <a href="/signup/farmer">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(FarmerLogin);
