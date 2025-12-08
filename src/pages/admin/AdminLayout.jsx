import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { getAllProducts } from '../../services/productService';
import { getAllUsers, getAllOrders } from '../../services/adminService';

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
  
  // Las órdenes de la BD tienen 'items' en lugar de 'productos'
  const productosVendidos = safePurchases.reduce(
    (acc, compra) => {
      const items = compra.items || compra.productos || [];
      return acc + items.reduce((sum, item) => sum + (item.cantidad || 0), 0);
    },
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
    const items = compra.items || compra.productos || [];
    items.forEach((item) => {
      registry[item.nombre] = (registry[item.nombre] || 0) + (item.cantidad || 1);
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [purchases, setPurchases] = useState([]);
  const [pendingCart, setPendingCart] = useState(() => loadCart());
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.esAdmin) {
      window.alert('⚠️ Acceso denegado. Solo administradores pueden acceder a esta página.');
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('🔄 Iniciando carga de datos...');
        
        const [productsData, usersData, ordersData] = await Promise.all([
          getAllProducts(),
          getAllUsers(),
          getAllOrders()
        ]);
        
        console.log('📦 Productos recibidos:', productsData);
        console.log('👥 Usuarios recibidos:', usersData);
        console.log('📊 Total usuarios:', usersData?.length || 0);
        console.log('🛒 Órdenes recibidas:', ordersData);
        console.log('📊 Total órdenes:', ordersData?.length || 0);
        
        setProducts(productsData);
        setUsers(usersData);
        setPurchases(ordersData || []);
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
        console.error('❌ Detalles del error:', error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshData = async () => {
    try {
      console.log('🔄 Recargando datos desde la API...');
      const [productsData, usersData, ordersData] = await Promise.all([
        getAllProducts(),
        getAllUsers(),
        getAllOrders()
      ]);
      
      setProducts(productsData);
      setUsers(usersData);
      setPurchases(ordersData || []);
      setPendingCart(loadCart());
      
      console.log('✅ Datos recargados correctamente');
      console.log('📊 Órdenes recargadas:', ordersData?.length || 0);
    } catch (error) {
      console.error('❌ Error al recargar datos:', error);
    }
  };

  useEffect(() => {
    const handleStorage = () => refreshData();
    const handleOrderCompleted = () => {
      console.log('🔔 Nueva orden completada, recargando datos...');
      refreshData();
    };
    
    window.addEventListener('storage', handleStorage);
    window.addEventListener('orderCompleted', handleOrderCompleted);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('orderCompleted', handleOrderCompleted);
    };
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
