import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { LogoMark } from '../components/icons';
import logo from '../assets/logo.png';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PASSWORD_LENGTH = 6;

function Login() {
  const { user, login } = useContext(AppContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailIsValid = EMAIL_PATTERN.test(email);
  const passwordIsValid = password.length >= MIN_PASSWORD_LENGTH;
  const canSubmit = emailIsValid && passwordIsValid;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!canSubmit) return;
    login(email);
    history.push('/meals');
  };

  if (user) return <Redirect to="/meals" />;

  return (
    <div className="auth">
      <aside className="auth__brand">
        <img src={ logo } alt="RecEITA! logo" className="auth__logo" />
        <p className="auth__tagline">
          Real recipes, real fast. Thousands of meals and cocktails in one tidy place.
        </p>
        <ul className="auth__highlights">
          <li>Search by name, ingredient or first letter</li>
          <li>Follow the steps, tick ingredients off as you go</li>
          <li>Keep your favourites and finished dishes forever</li>
        </ul>
      </aside>

      <section className="auth__panel">
        <div className="auth__mobile-brand">
          <LogoMark size={ 34 } />
          <span className="auth__mobile-word">RecEITA!</span>
        </div>

        <div className="card auth__card">
          <h1 className="auth__title">Welcome back</h1>
          <p className="auth__subtitle">
            Sign in to start cooking. This is a demo app, so any valid email and a
            6&nbsp;character password will do.
          </p>

          <form onSubmit={ handleSubmit } noValidate>
            <label className="field" htmlFor="email">
              <span className="field__label">Email</span>
              <input
                id="email"
                type="email"
                data-testid="email-input"
                name="email"
                value={ email }
                onChange={ (event) => setEmail(event.target.value) }
                placeholder="you@example.com"
                autoComplete="email"
              />
              {submitted && !emailIsValid ? (
                <span className="field__error">Enter a valid email address.</span>
              ) : null}
            </label>

            <label className="field" htmlFor="password">
              <span className="field__label">Password</span>
              <input
                id="password"
                type="password"
                data-testid="password-input"
                name="password"
                value={ password }
                onChange={ (event) => setPassword(event.target.value) }
                placeholder="••••••"
                autoComplete="current-password"
              />
              {submitted && !passwordIsValid ? (
                <span className="field__error">
                  Your password needs at least {MIN_PASSWORD_LENGTH} characters.
                </span>
              ) : null}
            </label>

            <button
              type="submit"
              className="btn btn--primary btn--block"
              data-testid="login-submit-btn"
              disabled={ !canSubmit }
            >
              Sign in
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
