import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Gọi API backend để lấy thông tin user hiện tại
  axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => setUser(null));
  }, []);

  if (!user) return <p>Chưa đăng nhập hoặc không lấy được thông tin người dùng.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Thông tin tài khoản</h2>
      <p><b>ID:</b> {user.id || user.userId || user.admin_id}</p>
      <p><b>Email:</b> {user.email || "Không có dữ liệu"}</p>
      <p><b>Vai trò:</b> {user.role || user.username || "Không có dữ liệu"}</p>
    </div>
  );
};

export default ProfilePage;
