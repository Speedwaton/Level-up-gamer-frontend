import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const links = [
  { to: '/productos', label: 'Productos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/blogs', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' },
  // ✅ agregado:
  { to: '/categorias', label: 'Categorías' }
];

const Navbar = () => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src="/img/d6b71733-7d4f-471a-bdb7-61d09902c0e2.png"
            alt="Level-Up Gamer"
            width="40"
            height="40"
            className="me-2"
          />
          LEVEL-UP GAMER
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {links.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link${isActive ? ' active' : ''}`
                    }
                    to="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    Iniciar sesión
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link${isActive ? ' active' : ''}`
                    }
                    to="/registro"
                    onClick={() => setIsOpen(false)}
                  >
                    Registrar usuario
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="btn btn-primary ms-lg-2" to="/carrito" onClick={() => setIsOpen(false)}>
                🛒 Carrito (<span>{itemCount}</span>)
              </Link>
            </li>
            {user && (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="navbarPerfil"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  {user.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarPerfil">
                  <li>
                    <Link className="dropdown-item" to="/perfil" onClick={() => setIsOpen(false)}>
                      Mi Perfil
                    </Link>
                  </li>
                  {user.esAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/admin" onClick={() => setIsOpen(false)}>
                        Panel Admin
                      </Link>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" type="button" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
