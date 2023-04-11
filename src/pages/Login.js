import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import logotipo from '../images/cd801da56823450284fdd14af4c8473b.png';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [btnDesabilitado, setBtnDesabilitado] = useState(true);

  useEffect(() => {
    const habilitaBotao = () => {
      const senhaMin = 6;
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      if (emailRegex.test(email) && senha.length > senhaMin) {
        setBtnDesabilitado(false);
      } else {
        setBtnDesabilitado(true);
      }
    };
    habilitaBotao();
  }, [email, senha]);

  const salvarDados = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="login">
      <img src={ logotipo } className="logotipoLogin" alt="logotipo" />
      <form>
        <h4>Email:</h4>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Digite seu email"
        />
        <h4 className="senha">Senha:</h4>
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ senha }
          onChange={ (e) => setSenha(e.target.value) }
          placeholder="Digite sua senha"
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ btnDesabilitado }
          onClick={ salvarDados }
        >
          Login
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
