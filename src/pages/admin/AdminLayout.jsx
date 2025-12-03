import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { getAllProducts } from '../../services/productService';

const PURCHASES_KEY = 'historialCompras';
const CART_KEY = 'carrito';

const SECTIONS = [
  {
    path: '/',
    label: 'Dashboard',
    icon: '📊',
    description: 'Vista general del sistema'
  },
  {
    path: '/usuarios',
    label: 'Usuarios',
    icon: '👥',
    description: 'Gestionar usuarios registrados'
  },
  {
    path: '/productos',
    label: 'Productos',
    icon: '📦',
    description: 'Administrar catálogo'
  },
  {
    path: '/reportes',
    label: 'Reportes',
    icon: '📈',
    description: 'Estadísticas y ventas'
  }
];

const loadPurchases = () => {
  try {
    const raw = localStorage.getItem(PURCHASES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('No se pudo leer el historial de compras', error);
    return [];
  }
};

const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const calculateStats = ({ purchases, users, pendingCart, products }) => {
  // Validar que los arrays existan
  const safePurchases = purchases || [];
  const safeUsers = users || [];
  const safePendingCart = pendingCart || [];
  const safeProducts = products || [];

  const totalVentas = safePurchases.reduce((sum, compra) => sum + (compra.total || 0), 0);
  const productosVendidos = safePurchases.reduce(
    (acc, compra) => acc + (compra.productos?.reduce((sum, item) => sum + (item.cantidad || 0), 0) ?? 0),
    0
  );

  const categorias = safeProducts.reduce((registry, product) => {
    registry[product.categoria] = (registry[product.categoria] || 0) + 1;
    return registry;
  }, {});

  const usuariosDuoc = safeUsers.filter((u) =>
    u.correo?.toLowerCase().endsWith('@duocuc.cl') || u.correo?.toLowerCase().endsWith('@profesor.duoc.cl')
  ).length;

  const vendidasPorProducto = safePurchases.reduce((registry, compra) => {
    compra.productos?.forEach((producto) => {
      registry[producto.nombre] = (registry[producto.nombre] || 0) + (producto.cantidad || 1);
    });
    return registry;
  }, {});

  const topProductos = Object.entries(vendidasPorProducto)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    totalUsuarios: safeUsers.length,
    totalVentas,
    productosVendidos,
    categorias,
    usuariosDuoc,
    stockTotal: safeProducts.length * 10, // Sin inventario real, se estima
    topProductos,
    carritosPendientes: safePendingCart.length > 0 ? 1 : 0
  };
};

const AdminLayout = () => {
  const { user, users, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [purchases, setPurchases] = useState(() => loadPurchases());
  const [pendingCart, setPendingCart] = useState(() => loadCart());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.esAdmin) {
      window.alert('⚠️ Acceso denegado. Solo administradores pueden acceder a esta página.');
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const refreshData = () => {
    setPurchases(loadPurchases());
    setPendingCart(loadCart());
  };

  useEffect(() => {
    const handleStorage = () => refreshData();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const stats = useMemo(
    () => calculateStats({ purchases, users, pendingCart, products }),
    [purchases, users, pendingCart, products]
  );

  const currentPath = location.pathname.replace('/admin', '') || '/';

  const goTo = (path) => {
    navigate(path === '/' ? '/admin' : `/admin${path}`);
  };

  const outletContext = useMemo(
    () => ({
      users,
      purchases,
      pendingCart,
      products,
      stats,
      refreshData,
      loading
    }),
    [users, purchases, pendingCart, products, stats, loading]
  );

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      logout();
      navigate('/login', { replace: true });
    }
  };

  if (!user?.esAdmin) {
    return null;
  }

  return (
    <div className="admin-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/img/d6b71733-7d4f-471a-bdb7-61d09902c0e2.png"
              alt="Level-Up Gamer"
              width="40"
              height="40"
              className="me-2"
            />
            LEVEL-UP GAMER
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="adminNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item">
                <Link className="nav-link" to="/">🏠 Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">📦 Productos</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger ms-lg-2" type="button" onClick={handleLogout}>
                  🔒 Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-5">
        <div className="text-center mb-5">
          <img
            src="/img/d6b71733-7d4f-471a-bdb7-61d09902c0e2.png"
            alt="Level-Up Gamer"
            width="80"
            height="80"
            className="mb-3"
          />
          <h2 className="fw-bold text-primary">Panel de Administración - {user.nombre}</h2>
          <p className="text-secondary">Gestiona tu tienda gamer desde aquí</p>
        </div>

        <div className="row g-3 mb-4">
          {SECTIONS.map((section) => (
            <div className="col-12 col-md-3" key={section.path}>
              <div
                className={`card bg-dark text-light h-100 admin-card ${
                  currentPath === section.path ? 'border-success' : ''
                }`}
                role="button"
                tabIndex={0}
                onClick={() => goTo(section.path)}
              >
                <div className="card-body text-center">
                  <h5 className="card-title">{`${section.icon} ${section.label}`}</h5>
                  <p className="card-text">{section.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="bg-dark text-light p-4 rounded">
            <Outlet context={outletContext} />
          </div>
        )}
      </main>

      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <p>© 2025 Level-Up Gamer - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
