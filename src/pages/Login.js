import React, { useEffect, useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  return (
    <form>
      <h1>Login</h1>
      <input
        type="email"
        data-testid="email-input"
        name="email"
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ btnDisabled }
      >
        Login

      </button>
    </form>
  );
}

export default Login;
