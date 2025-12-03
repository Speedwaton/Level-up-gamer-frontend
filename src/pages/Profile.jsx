import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const Profile = () => {
  const { user, logout } = useAuth();
  const { itemCount, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card p-4">
              <h2 className="mb-4">Mi Perfil</h2>
              <p className="mb-1">
                <strong>Nombre:</strong> {user.nombre}
              </p>
              <p className="mb-1">
                <strong>Correo:</strong> {user.correo}
              </p>
              <p className="mb-3">
                <strong>Descuento asignado:</strong>{' '}
                {user.descuento ? (
                  <span className="badge-discount">{user.descuento}% Permanente</span>
                ) : (
                  'Sin descuento asociado'
                )}
              </p>

              <div className="mb-4">
                <h4>Actividad reciente</h4>
                <p>
                  Tienes <strong>{itemCount}</strong> productos en el carrito con un total de{' '}
                  <strong>
                    {total.toLocaleString('es-CL', {
                      style: 'currency',
                      currency: 'CLP'
                    })}
                  </strong>.
                </p>
                <Link className="btn btn-outline-light me-2" to="/carrito">
                  Ver carrito
                </Link>
                <Link className="btn btn-outline-light" to="/productos">
                  Buscar más productos
                </Link>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span className="text-secondary">
                  ¿Quieres cerrar sesión?
                </span>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
