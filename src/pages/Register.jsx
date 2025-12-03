import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { regionesYComunas } from '../data/regions.js';

const initialState = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  password: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: ''
};

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [messages, setMessages] = useState([]);

  const comunasDisponibles = useMemo(() => regionesYComunas[form.region] ?? [], [form.region]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'region') {
      setForm((prev) => ({ ...prev, comuna: '' }));
    }
  };

  const validate = () => {
    const errores = [];
    const runRegex = /^\d{1,9}[Kk]?$/;

    if (!runRegex.test(form.run.trim())) {
      errores.push('El RUN debe contener máximo 9 dígitos, sin puntos ni guion.');
    }
    if (!form.nombre.trim()) {
      errores.push('El nombre no puede estar vacío.');
    }
    if (!form.apellidos.trim()) {
      errores.push('Los apellidos no pueden estar vacíos.');
    }
    if (!form.correo.includes('@') || !form.correo.includes('.')) {
      errores.push('El correo electrónico no es válido.');
    }
    if (form.password.length < 4 || form.password.length > 15) {
      errores.push('La contraseña debe tener entre 4 y 15 caracteres.');
    }
    if (!form.fechaNacimiento) {
      errores.push('Debe ingresar una fecha de nacimiento.');
    } else {
      const hoy = new Date();
      const nacimiento = new Date(form.fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mes = hoy.getMonth() - nacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad -= 1;
      }
      if (edad < 18) {
        errores.push('Debe ser mayor de 18 años para registrarse.');
      }
    }
    if (!form.region) {
      errores.push('Debe seleccionar una región.');
    }
    if (!form.comuna) {
      errores.push('Debe seleccionar una comuna.');
    }
    if (!form.direccion.trim()) {
      errores.push('La dirección no puede estar vacía.');
    }
    return errores;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errores = validate();
    if (errores.length > 0) {
      setMessages(errores.map((text) => ({ type: 'danger', text })));
      return;
    }

    const result = register(form);
    if (!result.ok) {
      setMessages([{ type: 'danger', text: result.message }]);
      return;
    }

    const successMessage =
      result.descuento > 0
        ? `✅ Registro exitoso. Bienvenido, ${form.nombre}. 🎉 Tienes un ${result.descuento}% de descuento por ser estudiante DuocUC.`
        : `✅ Registro exitoso. Bienvenido, ${form.nombre}.`;

    setMessages([{ type: 'success', text: successMessage }]);
    setForm(initialState);

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7">
            <h2 className="text-center mb-4">Registro de Usuario</h2>
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="run">
                  RUN
                </label>
                <input
                  id="run"
                  name="run"
                  maxLength={9}
                  value={form.run}
                  onChange={handleChange}
                  required
                />
                <p className="form-hint">Ingrese RUT sin puntos ni guion</p>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  maxLength={50}
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="apellidos">
                  Apellidos
                </label>
                <input
                  id="apellidos"
                  name="apellidos"
                  maxLength={100}
                  value={form.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="correo">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  maxLength={100}
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

              <div className="mb-3">
                <label className="form-label" htmlFor="fechaNacimiento">
                  Fecha de nacimiento
                </label>
                <input
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={form.fechaNacimiento}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="region">
                  Región
                </label>
                <select
                  id="region"
                  name="region"
                  className="form-select"
                  value={form.region}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione región</option>
                  {Object.keys(regionesYComunas).map((region) => (
                    <option value={region} key={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="comuna">
                  Comuna
                </label>
                <select
                  id="comuna"
                  name="comuna"
                  className="form-select"
                  value={form.comuna}
                  onChange={handleChange}
                  required
                  disabled={!comunasDisponibles.length}
                >
                  <option value="">Seleccione comuna</option>
                  {comunasDisponibles.map((comuna) => (
                    <option value={comuna} key={comuna}>
                      {comuna}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="direccion">
                  Dirección
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  maxLength={300}
                  value={form.direccion}
                  onChange={handleChange}
                  required
                />
              </div>

              {messages.length > 0 && (
                <div className="my-3">
                  {messages.map((message, index) => (
                    <div className={`alert alert-${message.type}`} key={`${message.text}-${index}`}>
                      {message.text}
                    </div>
                  ))}
                </div>
              )}

              <button className="btn btn-primary w-100" type="submit">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
