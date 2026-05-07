import { memo, useEffect, useMemo, useRef, useState } from 'react';
import NavbarFarmer from './NavbarFarmer';

const FarmerUploads = () => {
    const [form, setForm] = useState({ title: '', description: '', file: null });
    const closeBtnRef = useRef(null);
    const [videos, setVideos] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [commentText, setCommentText] = useState({});
    const [replyOpen, setReplyOpen] = useState({});
    const [replyText, setReplyText] = useState({});

    const API_BASE = useMemo(() => 'http://localhost:5050/api', []);
    const token = useMemo(() => localStorage.getItem('token'), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = async (videoId) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Delete this video permanently?',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel'
        });
        if (!result.isConfirmed) return;
        try {
            const res = await fetch(`${API_BASE}/videos/${videoId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Failed to delete video');
            }
            await fetchMyVideos();
        } catch (err) {
            if (window.Swal) {
                Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Something went wrong' });
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
        setForm((prev) => ({ ...prev, file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.file) {
            if (window.Swal) {
                Swal.fire({ icon: 'warning', title: 'Missing file', text: 'Please select a video file' });
            }
            return;
        }
        try {
            const fd = new FormData();
            fd.append('title', form.title);
            fd.append('description', form.description);
            fd.append('video', form.file);

            const res = await fetch(`${API_BASE}/videos`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: fd,
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Upload failed');
            }
            await fetchMyVideos();
            setForm({ title: '', description: '', file: null });
            if (closeBtnRef.current) closeBtnRef.current.click();
        } catch (err) {
            if (window.Swal) {
                Swal.fire({ icon: 'error', title: 'Upload failed', text: err.message || 'Please try again' });
            }
        }
    };

    const fetchMyVideos = async () => {
        try {
            const res = await fetch(`${API_BASE}/videos/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Failed to load videos');
            const data = await res.json();
            setVideos(data.videos || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMyVideos();
        const onAuth = () => fetchMyVideos();
        window.addEventListener('auth-changed', onAuth);
        return () => window.removeEventListener('auth-changed', onAuth);
    }, []);

    const toggleComments = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAddComment = async (videoId) => {
        const text = (commentText[videoId] || '').trim();
        if (!text) return;
        try {
            const res = await fetch(`${API_BASE}/videos/${videoId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Failed to add comment');
            }
            const updated = await res.json();
            setVideos((prev) => prev.map(v => v._id === videoId ? { ...v, comments: updated.comments } : v));
            setCommentText((p) => ({ ...p, [videoId]: '' }));
        } catch (err) {
            if (window.Swal) {
                Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Something went wrong' });
            }
        }
    };

    const toggleReply = (commentId) => {
        setReplyOpen((p) => ({ ...p, [commentId]: !p[commentId] }));
    };

    const handlePostReply = async (videoId, commentId) => {
        const text = (replyText[commentId] || '').trim();
        if (!text) return;
        try {
            const res = await fetch(`${API_BASE}/videos/${videoId}/comments/${commentId}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Failed to add reply');
            }
            const updated = await res.json();
            setVideos((prev) => prev.map(v => v._id === videoId ? { ...v, comments: updated.comments } : v));
            setReplyText((p) => ({ ...p, [commentId]: '' }));
            setReplyOpen((p) => ({ ...p, [commentId]: false }));
        } catch (err) {
            if (window.Swal) {
                Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Something went wrong' });
            }
        }
    };

    return (
        <>
            <NavbarFarmer />
            <div className="FarmerUploads" style={{ paddingTop: '80px' }}>
                <div className="container">
                    <h2 className="mb-3">Farmer Uploads</h2>
                    <p className="text-muted">Use the button below to upload a new video.</p>

                    <div className="row g-3 mt-2">
                        {videos.length === 0 && (
                            <div className="text-muted">No videos uploaded yet.</div>
                        )}
                        {videos.map((vid) => (
                            <div className="col-12 col-md-6 col-lg-4" key={vid._id}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{vid.title}</h5>
                                        <p className="card-text text-muted mb-2">{vid.description}</p>
                                        <div className="ratio ratio-16x9 mb-2">
                                            <video src={`http://localhost:5050${vid.filePath}`} controls className="w-100" />
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-outline-secondary btn-sm" onClick={() => toggleComments(vid._id)}>
                                                {expanded[vid._id] ? 'Hide Comments' : 'Show Comments'} ({vid.comments?.length || 0})
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(vid._id)}>
                                                Delete
                                            </button>
                                        </div>
                                        {expanded[vid._id] && (
                                            <div className="mt-3">
                                                <div className="list-group mb-3">
                                                    {(vid.comments || []).map((c) => (
                                                        <div key={c._id || c.createdAt} className="list-group-item">
                                                            <div className="fw-semibold">{c.authorName} <span className="text-muted" style={{ fontSize: '0.85em' }}>({c.authorType})</span></div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div>{c.text}</div>
                                                                <button className="btn btn-link btn-sm" onClick={() => toggleReply(c._id)}>Reply</button>
                                                            </div>
                                                            {(c.replies && c.replies.length > 0) && (
                                                                <div className="mt-2 ms-3">
                                                                    {c.replies.map((r) => (
                                                                        <div key={r._id || r.createdAt} className="border-start ps-2 mb-2">
                                                                            <div className="fw-semibold">
                                                                                {r.authorName}{' '}
                                                                                <span className="text-muted" style={{ fontSize: '0.8em' }}>({r.authorType})</span>
                                                                                <span className="text-muted ms-2" style={{ fontSize: '0.75em' }}>
                                                                                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}
                                                                                </span>
                                                                            </div>
                                                                            <div>{r.text}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {replyOpen[c._id] && (
                                                                <div className="input-group mt-2">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Write a reply..."
                                                                        value={replyText[c._id] || ''}
                                                                        onChange={(e) => setReplyText((p) => ({ ...p, [c._id]: e.target.value }))}
                                                                    />
                                                                    <button className="btn btn-outline-primary" onClick={() => handlePostReply(vid._id, c._id)}>Reply</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {(vid.comments || []).length === 0 && (
                                                        <div className="text-muted">No comments yet.</div>
                                                    )}
                                                </div>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Write a comment..."
                                                        value={commentText[vid._id] || ''}
                                                        onChange={(e) => setCommentText((p) => ({ ...p, [vid._id]: e.target.value }))}
                                                    />
                                                    <button className="btn btn-primary" onClick={() => handleAddComment(vid._id)}>Post</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="btn btn-primary shadow-lg"
                style={{ position: 'fixed', bottom: '24px', right: '24px', borderRadius: '9999px' }}
                data-bs-toggle="modal"
                data-bs-target="#uploadVideoModal"
            >
                <i className="bi bi-cloud-arrow-up me-2"></i>
                Upload Video
            </button>

            <div className="modal fade" id="uploadVideoModal" tabIndex="-1" aria-labelledby="uploadVideoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="uploadVideoModalLabel">Upload Video</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtnRef}></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="videoTitle" className="form-label">Video Name</label>
                                    <input
                                        id="videoTitle"
                                        name="title"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter video name"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="videoDescription" className="form-label">Description</label>
                                    <textarea
                                        id="videoDescription"
                                        name="description"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Describe your video"
                                        value={form.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="videoFile" className="form-label">Video File</label>
                                    <input
                                        id="videoFile"
                                        name="file"
                                        type="file"
                                        className="form-control"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        required
                                    />
                                    {form.file && (
                                        <div className="form-text">Selected: {form.file.name}</div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(FarmerUploads);