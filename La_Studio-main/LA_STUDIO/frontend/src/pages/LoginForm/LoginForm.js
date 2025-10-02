import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
        window.location.reload();
      } else {
        setError(data.message || 'Login failed!');
      }
    } catch (err) {
      setError('Server error!');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Member Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Email Address <span style={{ color: 'red' }}>*</span></label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Password <span style={{ color: 'red' }}>*</span></label>
          <div style={{ position: 'relative' }}>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
            <span onClick={() => setShowPassword(s => !s)} style={{ position: 'absolute', right: 12, top: 14, cursor: 'pointer', color: '#888' }}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </div>
        <button type="submit" style={{ width: '100%', background: '#88001b', color: '#fff', border: 'none', borderRadius: 6, padding: 12, fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Login</button>
        {error && (
          <div style={{ color: 'red', marginTop: 8, textAlign: 'center', fontWeight: 500 }}>{error}</div>
        )}
      </form>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <button type="button" style={{ color: '#88001b', textDecoration: 'underline', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          Forgot Password?
        </button>
      </div>
      <hr />
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>New to our shop?</div>
        <button onClick={onSwitch} style={{ border: '1px solid #88001b', color: '#88001b', background: '#fff', borderRadius: 6, padding: '10px 0', width: '100%', fontWeight: 600 }}>Register a new account</button>
      </div>
    </div>
  );
};

export default LoginForm;
