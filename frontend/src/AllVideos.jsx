import { memo, useEffect, useMemo, useState } from 'react';
import NavbarHome from './NavbarHome';

const AllVideos = () => {
  const API_BASE = useMemo(() => 'https://farmhub-tnfz.onrender.com/api', []);
  const token = useMemo(() => sessionStorage.getItem('token'), []);

  const [videos, setVideos] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [commentText, setCommentText] = useState({});
  const [replyOpen, setReplyOpen] = useState({});
  const [replyText, setReplyText] = useState({});
  const [query, setQuery] = useState('');

  const fetchAll = async () => {
    try {
      const res = await fetch(`${API_BASE}/videos`, {
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
    fetchAll();
    const onAuth = () => fetchAll();
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

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter(v =>
      (v.title && v.title.toLowerCase().includes(q)) ||
      (v.farmerName && v.farmerName.toLowerCase().includes(q))
    );
  }, [videos, query]);

  return (
    <>
      <NavbarHome />
      <div style={{ paddingTop: '80px' }}>
        <div className="container">
          <h2 className="mb-3">All Farmer Videos</h2>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by video title or farmer name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="row g-3 mt-2">
            {filteredVideos.length === 0 && (
              <div className="text-muted">No videos available.</div>
            )}
            {filteredVideos.map((vid) => (
              <div className="col-12 col-md-6 col-lg-4" key={vid._id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0">{vid.title}</h5>
                      <span className="badge text-bg-success">{vid.farmerName || 'Farmer'}</span>
                    </div>
                    <p className="card-text text-muted mb-2">{vid.description}</p>
                    <div className="ratio ratio-16x9 mb-2">
                      <video src={`https://farmhub-tnfz.onrender.com${vid.filePath}`} controls className="w-100" />
                    </div>
                    <div className="mt-auto">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => toggleComments(vid._id)}>
                        {expanded[vid._id] ? 'Hide Comments' : 'Show Comments'} ({vid.comments?.length || 0})
                      </button>
                      {expanded[vid._id] && (
                        <div className="mt-3">
                          <div className="list-group mb-3">
                            {(vid.comments || []).map((c) => (
                              <div key={c._id || c.createdAt} className="list-group-item">
                                <div className="fw-semibold">
                                  {c.authorName}{' '}
                                  <span className="text-muted" style={{ fontSize: '0.85em' }}>({c.authorType})</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>{c.text}</div>
                                  <button className="btn btn-link btn-sm" onClick={() => toggleReply(c._id)}>
                                    Reply
                                  </button>
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
                                    <button className="btn btn-outline-primary" onClick={() => handlePostReply(vid._id, c._id)}>
                                      Reply
                                    </button>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AllVideos);
