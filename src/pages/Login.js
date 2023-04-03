import React, { useEffect, useState } from 'react';

function Login() {
  return (
    <form>
      <h1>Login</h1>
      <input 
      type='email'
      data-testid="email-input"
      name='email'
      ></input>
      <input 
      type='password'
      data-testid="password-input"
      name='password'
      >
      </input>
      <button 
      type='submit'
      data-testid="login-submit-btn"
      >Login</button>
    </form>
  );
}

export default Login;
