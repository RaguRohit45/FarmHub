import { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarHome from './NavbarHome';
import './css/Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [occupation, setOccupation] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserName = localStorage.getItem("userName");
        
        if (!storedToken) {
            navigate('/login');
            return;
        }
        
        setToken(storedToken);
        setUserName(storedUserName || '');
        
        // Fetch user profile data
        fetchUserProfile(storedToken);
    }, [navigate]);

    const fetchUserProfile = async (authToken) => {
        try {
            const response = await axios.get('https://farmhub-tnfz.onrender.com/api/user/profile', {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            
            const userData = response.data.user;
            setUserName(userData.name || '');
            setEmail(userData.email || '');
            setPhone(userData.phone || '');
            setDateOfBirth(userData.dateOfBirth || '');
            setGender(userData.gender || '');
            setOccupation(userData.occupation || '');
        } catch (error) {
            console.error('Error fetching profile:', error);
            
            // Check if authentication failed and logout is required
            if (error.response?.data?.logoutRequired) {
                // Clear local storage and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                localStorage.removeItem('userEmail');
                
                // Show message to user
                if (window.Swal) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Session Expired',
                        text: 'Your session has expired. Please login again.',
                        confirmButtonText: 'Login Now'
                    }).then(() => {
                        navigate('/login');
                    });
                } else {
                    navigate('/login');
                }
                return;
            }
            
            // If profile doesn't exist, just use stored data
            const storedEmail = localStorage.getItem("userEmail");
            if (storedEmail) {
                setEmail(storedEmail);
            }
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.put(
                'https://farmhub-tnfz.onrender.com/api/user/profile',
                { name: userName, phone, dateOfBirth, gender, occupation },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            if (window.Swal) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    text: 'Your profile has been updated successfully'
                });
            }
            
            // Update localStorage
            localStorage.setItem("userName", userName);
            window.dispatchEvent(new Event('auth-changed'));
            setIsEditing(false);
        } catch (error) {
            // Check if authentication failed and logout is required
            if (error.response?.data?.logoutRequired) {
                // Clear local storage and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                localStorage.removeItem('userEmail');
                
                // Show message to user
                if (window.Swal) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Session Expired',
                        text: 'Your session has expired. Please login again.',
                        confirmButtonText: 'Login Now'
                    }).then(() => {
                        navigate('/login');
                    });
                } else {
                    navigate('/login');
                }
                return;
            }
            
            if (window.Swal) {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: error?.response?.data?.message || error.message || 'Failed to update profile'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const calculateProfileCompletion = () => {
        const fields = [userName, email, phone, dateOfBirth, gender, occupation];
        const filledFields = fields.filter(field => field && field.trim() !== '').length;
        return Math.round((filledFields / fields.length) * 100);
    };

    const getCompletionColor = (percentage) => {
        if (percentage >= 80) return '#28a745';
        if (percentage >= 60) return '#ffc107';
        return '#dc3545';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original values
        fetchUserProfile(token);
    };

    return (
        <>
            <NavbarHome />
            <div className="profile-page">
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card shadow-lg profile-card">
                                <div className="card-header profile-header">
                                    <div className="d-flex align-items-center">
                                        <div className="profile-avatar">
                                            <i className="bi bi-person-circle"></i>
                                        </div>
                                        <div className="ms-3">
                                            <h4 className="mb-0">{userName || 'User Name'}</h4>
                                            <p className="mb-0 text-white-50">{occupation || 'Professional Profile'}</p>
                                        </div>
                                    </div>
                                </div>
                            <div className="card-body">
                                {!isEditing ? (
                                    <div className="profile-view">
                                        <div className="profile-section">
                                            <h6 className="section-title">Personal Information</h6>
                                            <div className="info-grid">
                                                <div className="info-item">
                                                    <div className="info-label">
                                                        <i className="bi bi-person me-2"></i>Full Name
                                                    </div>
                                                    <div className="info-value">{userName || 'Not set'}</div>
                                                </div>
                                                <div className="info-item">
                                                    <div className="info-label">
                                                        <i className="bi bi-envelope me-2"></i>Email Address
                                                    </div>
                                                    <div className="info-value">{email || 'Not set'}</div>
                                                </div>
                                                <div className="info-item">
                                                    <div className="info-label">
                                                        <i className="bi bi-geo-alt me-2"></i>Phone Number
                                                    </div>
                                                    <div className="info-value">{phone || 'Not set'}</div>
                                                </div>
                                                <div className="info-item">
                                                    <div className="info-label">
                                                        <i className="bi bi-calendar me-2"></i>Date of Birth
                                                    </div>
                                                    <div className="info-value">{formatDate(dateOfBirth) || 'Not set'}</div>
                                                </div>
                                                <div className="info-item">
                                                    <div className="info-label">
                                                        <i className="bi bi-gender-ambiguous me-2"></i>Gender
                                                    </div>
                                                    <div className="info-value">{gender || 'Not set'}</div>
                                                </div>
                                                <div className="info-item">
                                                    <div className="info-label">
                                                        <i className="bi bi-briefcase me-2"></i>Occupation
                                                    </div>
                                                    <div className="info-value">{occupation || 'Not set'}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="profile-actions">
                                            <button 
                                                className="btn btn-primary btn-lg"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                <i className="bi bi-pencil-square me-2"></i>Edit Profile
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleUpdateProfile} className="profile-form">
                                        <div className="form-section">
                                            <h6 className="section-title">Edit Personal Information</h6>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="name" className="form-label">
                                                        <i className="bi bi-person me-2"></i>Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        id="name"
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                        required
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="email" className="form-label">
                                                        <i className="bi bi-envelope me-2"></i>Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg"
                                                        id="email"
                                                        value={email}
                                                        disabled
                                                    />
                                                    <small className="text-muted">Email cannot be changed</small>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="phone" className="form-label">
                                                        <i className="bi bi-telephone me-2"></i>Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        className="form-control form-control-lg"
                                                        id="phone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="Enter your phone number"
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="dateOfBirth" className="form-label">
                                                        <i className="bi bi-calendar me-2"></i>Date of Birth
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control form-control-lg"
                                                        id="dateOfBirth"
                                                        value={dateOfBirth}
                                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="gender" className="form-label">
                                                        <i className="bi bi-gender-ambiguous me-2"></i>Gender
                                                    </label>
                                                    <select
                                                        className="form-control form-control-lg"
                                                        id="gender"
                                                        value={gender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                        <option value="Prefer not to say">Prefer not to say</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="occupation" className="form-label">
                                                        <i className="bi bi-briefcase me-2"></i>Occupation
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg"
                                                        id="occupation"
                                                        value={occupation}
                                                        onChange={(e) => setOccupation(e.target.value)}
                                                        placeholder="Enter your occupation"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-actions">
                                            <button 
                                                type="submit" 
                                                className="btn btn-success btn-lg"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-check-circle me-2"></i>Save Changes
                                                    </>
                                                )}
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary btn-lg"
                                                onClick={handleCancel}
                                                disabled={loading}
                                            >
                                                <i className="bi bi-x-circle me-2"></i>Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Profile);
