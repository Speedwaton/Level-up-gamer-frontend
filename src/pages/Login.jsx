import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    if (!form.correo || !form.password) {
      setMessage({ type: 'danger', text: '⚠️ Completa todos los campos' });
      return;
    }

    if (!form.correo.includes('@') || !form.correo.includes('.')) {
      setMessage({ type: 'warning', text: '⚠️ Ingresa un correo válido' });
      return;
    }

    try {
      const result = await login({ email: form.correo, password: form.password });
    if (!result.ok) {
      if (
        window.confirm(
          'Usuario no encontrado. ¿Deseas crear una cuenta?'
        )
      ) {
        navigate('/registro');
      } else {
        setMessage({
          type: 'info',
          text: 'Si ya tienes cuenta, intenta nuevamente con otro correo.'
        });
      }
      return;
    }

    if (result.admin) {
      setMessage({
        type: 'success',
        text: '✅ Bienvenido Administrador, accediendo al panel...'
      });
      setTimeout(() => {
        navigate('/admin');
      }, 1200);
      return;
    }

    setMessage({
      type: 'success',
      text: '✅ Has iniciado sesión correctamente'
    });
    setTimeout(() => {
      navigate('/');
    }, 1200);
    } catch (error) {
      console.error('Error en login:', error);
      setMessage({
        type: 'danger',
        text: '❌ Error al iniciar sesión. Intenta nuevamente.'
      });
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="correo">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  minLength={4}
                  maxLength={15}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {message && (
                <div className={`alert alert-${message.type}`}>{message.text}</div>
              )}

              <button className="btn btn-primary w-100" type="submit">
                Entrar
              </button>

              <div className="mt-4 p-3 bg-dark text-light rounded">
                <h6 className="text-info">🔐 Acceso de Administrador:</h6>
                <small>
                  <strong>Email:</strong> admin@levelupgamer.com
                  <br />
                  <strong>Contraseña:</strong> admin123
                </small>
              </div>
            </form>

            <p className="text-center mt-3">
              ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
