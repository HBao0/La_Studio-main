import React, { useState } from 'react';

const RegistrationForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Other');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    alert('Registration submitted!');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Register Account</h2>
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
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Phone Number</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone number" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Date of Birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
            <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginRight: 8 }} required />
            I am over 16 years old and agree to the Terms & Conditions
          </label>
        </div>
        <button type="submit" style={{ width: '100%', background: '#88001b', color: '#fff', border: 'none', borderRadius: 6, padding: 12, fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Create New Account</button>
      </form>
      <hr />
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>Already have an account?</div>
        <button onClick={onSwitch} style={{ border: '1px solid #88001b', color: '#88001b', background: '#fff', borderRadius: 6, padding: '10px 0', width: '100%', fontWeight: 600 }}>Login Now</button>
      </div>
    </div>
  );
};

export default RegistrationForm;
