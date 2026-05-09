import { memo, useEffect, useMemo, useRef, useState } from 'react';
import NavbarFarmer from './NavbarFarmer';

const Ask = () => {
  const API_BASE = useMemo(() => 'https://farmhub-tnfz.onrender.com/api', []);
  const token = useMemo(() => sessionStorage.getItem('token'), []);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const pollRef = useRef(null);
  const [replyOpen, setReplyOpen] = useState({});
  const [replyText, setReplyText] = useState({});

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to load messages');
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    pollRef.current = setInterval(fetchMessages, 6000);
    const onAuth = () => fetchMessages();
    window.addEventListener('auth-changed', onAuth);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      window.removeEventListener('auth-changed', onAuth);
    };
  }, []);

  const handleSend = async () => {
    const t = text.trim();
    if (!t) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: t }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to send');
      }
      setText('');
      await fetchMessages();
    } catch (err) {
      if (window.Swal) {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Something went wrong' });
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleReply = (id) => setReplyOpen((p) => ({ ...p, [id]: !p[id] }));

  const handlePostReply = async (id) => {
    const rt = (replyText[id] || '').trim();
    if (!rt) return;
    try {
      const res = await fetch(`${API_BASE}/chat/${id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: rt }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to reply');
      }
      setReplyText((p) => ({ ...p, [id]: '' }));
      setReplyOpen((p) => ({ ...p, [id]: false }));
      await fetchMessages();
    } catch (err) {
      if (window.Swal) {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message || 'Something went wrong' });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSend();
    }
  };

  return (
    <>
      <NavbarFarmer />
      <div style={{ paddingTop: '80px' }}>
        <div className="container">
          <h2 className="mb-3">Ask the Community</h2>
          <p className="text-muted">A global chat visible to all users and farmers. Be respectful and helpful.</p>

          <div className="card shadow-sm">
            <div className="card-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {messages.length === 0 && (
                <div className="text-muted">No messages yet. Start the conversation!</div>
              )}
              <div className="list-group list-group-flush">
                {messages.map((m) => (
                  <div key={m._id || m.createdAt} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fw-semibold">
                        {m.authorName}{' '}
                        <span className="text-muted" style={{ fontSize: '0.85em' }}>({m.authorType})</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.85em' }}>
                        {m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <div>{m.text}</div>
                      <button className="btn btn-link btn-sm" onClick={() => toggleReply(m._id)}>
                        Reply
                      </button>
                    </div>
                    {(m.replies && m.replies.length > 0) && (
                      <div className="mt-2 ms-3">
                        {m.replies.map((r) => (
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
                    {replyOpen[m._id] && (
                      <div className="input-group mt-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Write a reply..."
                          value={replyText[m._id] || ''}
                          onChange={(e) => setReplyText((p) => ({ ...p, [m._id]: e.target.value }))}
                        />
                        <button className="btn btn-outline-primary" onClick={() => handlePostReply(m._id)}>
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <div className="input-group">
                <textarea
                  className="form-control"
                  placeholder="Type your question or message..."
                  rows={2}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="btn btn-primary" onClick={handleSend} disabled={loading}>
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default memo(Ask);
