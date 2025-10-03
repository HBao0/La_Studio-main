import React, { useEffect, useState } from 'react';

function UserProfilePage() {
  // giả sử userId lấy từ localStorage (hoặc từ auth)
  const userId = localStorage.getItem('userId') || '1';
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, [userId]);

  if (!user) return <div>Đang tải hồ sơ...</div>;

  const onChange = (k, v) => setUser(prev => ({...prev, [k]: v}));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const json = await res.json();
      if (res.ok) {
        alert('Cập nhật thành công');
        setUser(json.user || user);
      } else {
        alert('Lỗi: ' + (json.error || json.message));
      }
    } catch (e) { alert('Lỗi mạng'); }
    setSaving(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Thông tin người dùng</h2>
      <div>
        <label>Họ tên</label><br />
        <input value={user.name || ''} onChange={e => onChange('name', e.target.value)} /><br />
        <label>Email</label><br />
        <input value={user.email || ''} onChange={e => onChange('email', e.target.value)} /><br />
        <label>Phone</label><br />
        <input value={user.phone || ''} onChange={e => onChange('phone', e.target.value)} /><br />
        <label>Địa chỉ</label><br />
        <textarea value={user.address || ''} onChange={e => onChange('address', e.target.value)} /><br />
        <button onClick={handleSave} disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
      </div>
    </div>
  );
}

export default UserProfilePage;
