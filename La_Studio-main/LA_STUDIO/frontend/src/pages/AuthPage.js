import React, { useState } from 'react';
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {showLogin ? (
        <LoginForm onSwitch={() => setShowLogin(false)} />
      ) : (
        <RegistrationForm onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default AuthPage;
