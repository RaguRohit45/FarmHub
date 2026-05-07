import { memo, useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const UserLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const password = String(pass);
            const res = await axios.post('https://farmhub-tnfz.onrender.com/api/user/login', { email, password });
            if (window.Swal) {
                await Swal.fire({ icon: 'success', title: 'Logged in', text: 'User logged in successfully' });
            }
            localStorage.setItem("token", res.data.token);
            if (res?.data?.user?.name) {
                localStorage.setItem("userName", res.data.user.name);
            }
            window.dispatchEvent(new Event('auth-changed'));
            console.log('token saved');
            navigate('/');
            setEmail('');
            setPassword('');
        } catch (error) {
            if (window.Swal) {
                Swal.fire({ icon: 'error', title: 'Login failed', text: error?.response?.data?.message || error.message || 'Login failed' });
            }
        }
    };
    return (
        <div className="login-page no-navbar">
            <div className="auth-wrap">
                <div
                    className="auth-hero"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1564417947365-8dbc9d0e718e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI3fHxmYXJtfGVufDB8fDB8fHww')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="auth-hero-inner">
                        <h1 className="display-5 fw-bold">Welcome Back to FarmHub</h1>
                        <p className="lead mt-2">"Your seamless farm-to-market journey begins with a simple login"</p>
                        <ul className="auth-bullets p-0 mt-3">
                            <li>
                                <span className="auth-badge">🌱</span>
                                <span>Explore fresh produce from trusted farmers</span>
                            </li>
                            <li>
                                <span className="auth-badge">🚚</span>
                                <span>Direct farm-to-home delivery options</span>
                            </li>
                            <li>
                                <span className="auth-badge">💬</span>
                                <span>Connect and chat with sellers</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="auth-form-pane">
                    <div className="auth-card">
                        <h2 className="auth-title">Login to Your Account</h2>
                        <p className="auth-sub">Enter your credentials to access your account</p>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input id="password" type="password" className="form-control" value={pass} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button className="auth-btn w-100" type="submit">Login</button>
                        </form>
                        <div className="text-center mt-3">
                            <span className="text-muted">Don't have an account? </span>
                            <Link to="/signup/user">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(UserLogin);
