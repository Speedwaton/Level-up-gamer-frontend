import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { products } from '../data/products.js';

const PURCHASES_KEY = 'historialCompras';
const CART_KEY = 'carrito';

const loadPurchases = () => {
  try {
    const raw = localStorage.getItem(PURCHASES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('No se pudo leer el historial', error);
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

const Admin = () => {
  const { user, users } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [purchases, setPurchases] = useState(() => loadPurchases());
  const [pendingCart, setPendingCart] = useState(() => loadCart());

  useEffect(() => {
    if (!user?.esAdmin) {
      window.alert('⚠️ Acceso denegado. Solo administradores pueden acceder a esta página.');
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleStorage = () => {
      setPurchases(loadPurchases());
      setPendingCart(loadCart());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const stats = useMemo(() => {
    const totalVentas = purchases.reduce((sum, compra) => sum + (compra.total || 0), 0);
    const productosVendidos = purchases.reduce(
      (sum, compra) => sum + (compra.productos?.reduce((acc, item) => acc + (item.cantidad || 0), 0) ?? 0),
      0
    );
    const categorias = products.reduce((acc, product) => {
      acc[product.categoria] = (acc[product.categoria] || 0) + 1;
      return acc;
    }, {});

    const stockTotal = products.length * 10; // placeholder sin inventario real

    const usuariosDuoc = users.filter((u) =>
      u.correo?.toLowerCase().includes('@duocuc.cl') || u.correo?.toLowerCase().includes('@profesor.duoc.cl')
    ).length;

    const vendidasPorProducto = purchases.reduce((acc, compra) => {
      compra.productos?.forEach((producto) => {
        acc[producto.nombre] = (acc[producto.nombre] || 0) + (producto.cantidad || 1);
      });
      return acc;
    }, {});

    const topProductos = Object.entries(vendidasPorProducto)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      totalUsuarios: users.length,
      totalVentas,
      productosVendidos,
      categorias,
      stockTotal,
      usuariosDuoc,
      topProductos,
      carritosPendientes: pendingCart.length > 0 ? 1 : 0
    };
  }, [users, purchases, pendingCart]);

  const handleExport = () => {
    const payload = {
      tienda: 'Level-Up Gamer',
      fecha_exportacion: new Date().toLocaleString('es-CL'),
      resumen: {
        total_usuarios: stats.totalUsuarios,
        total_compras: purchases.length,
        total_productos: products.length,
        total_ventas: stats.totalVentas
      },
      usuarios: users,
      compras: purchases,
      productos: products,
      estadisticas: stats
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `level-up-gamer-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    window.alert('✅ Datos exportados exitosamente');
  };

  const handleReport = () => {
    const fechaActual = new Date().toLocaleDateString('es-CL');
    const reporteHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #007bff; text-align: center;">Level-Up Gamer - Reporte Administrativo</h1>
        <p style="text-align: center; color: #666;">Fecha: ${fechaActual}</p>
        <hr />
        <h2>📊 Estadísticas Generales</h2>
        <ul>
          <li><strong>Total de Usuarios:</strong> ${stats.totalUsuarios}</li>
          <li><strong>Total de Productos:</strong> ${products.length}</li>
          <li><strong>Ventas Totales:</strong> ${stats.totalVentas.toLocaleString('es-CL')}</li>
          <li><strong>Stock Total Estimado:</strong> ${stats.stockTotal} unidades</li>
        </ul>
        <h2>📦 Distribución por Categorías</h2>
        <ul>
          ${Object.entries(stats.categorias)
            .map(([cat, count]) => `<li><strong>${cat}:</strong> ${count} productos</li>`)
            .join('')}
        </ul>
        <hr />
        <p style="text-align: center; color: #888; font-size: 12px;">Reporte generado automáticamente por el sistema Level-Up Gamer</p>
      </div>
    `;

    const windowReport = window.open('', '_blank');
    windowReport.document.write(reporteHTML);
    windowReport.document.close();
    window.alert('📄 Reporte generado. Para guardar como PDF utiliza las opciones de impresión de tu navegador.');
  };

  const renderDashboard = () => (
    <div>
      <div className="row g-4">
        <div className="col-12 col-md-3">
          <div className="card bg-primary text-white text-center">
            <div className="card-body">
              <h5 className="card-title">👥 Usuarios</h5>
              <p className="card-text display-6">{stats.totalUsuarios}</p>
              <small>Usuarios registrados</small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card text-white text-center" style={{ background: 'linear-gradient(45deg, #6e14ff, #148dff)' }}>
            <div className="card-body">
              <h5 className="card-title">📦 Productos</h5>
              <p className="card-text display-6">{products.length}</p>
              <small>En catálogo</small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card text-white text-center" style={{ background: 'linear-gradient(45deg, #14ffec, #148dff)' }}>
            <div className="card-body">
              <h5 className="card-title">💰 Ventas</h5>
              <p className="card-text display-6">
                {stats.totalVentas.toLocaleString('es-CL', {
                  style: 'currency',
                  currency: 'CLP'
                })}
              </p>
              <small>Total vendido</small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card bg-success text-white text-center">
            <div className="card-body">
              <h5 className="card-title">🛒 Carritos pendientes</h5>
              <p className="card-text display-6">{stats.carritosPendientes}</p>
              <small>Con productos activos</small>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <h4 className="text-light">¡Panel administrativo en tiempo real!</h4>
        <p className="text-secondary">
          Los datos se actualizan automáticamente con las compras y registros.
        </p>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">👥 Gestión de Usuarios</h3>
        <button className="btn btn-success" type="button" onClick={() => setActiveSection('dashboard')}>
          🔄 Volver al dashboard
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Descuento</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map((entry, index) => (
                <tr key={entry.correo}>
                  <td>{index + 1}</td>
                  <td>
                    {entry.nombre} {entry.apellidos}
                  </td>
                  <td>{entry.correo}</td>
                  <td>
                    {entry.descuento ? (
                      <span className="badge bg-success">{entry.descuento}%</span>
                    ) : (
                      <span className="badge bg-primary">Usuario</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">📦 Catálogo de productos</h3>
        <span className="badge bg-info">{products.length} productos</span>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Relacionados</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug}>
                <td>{product.nombre}</td>
                <td>
                  <span className="badge bg-info">{product.categoria}</span>
                </td>
                <td>
                  {product.precio.toLocaleString('es-CL', {
                    style: 'currency',
                    currency: 'CLP'
                  })}
                </td>
                <td>{product.relacionados?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div>
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card bg-dark border-primary h-100">
            <div className="card-header bg-primary text-white">📊 Resumen de ventas</div>
            <div className="card-body">
              <p>
                <strong>Total vendido:</strong>{' '}
                {stats.totalVentas.toLocaleString('es-CL', {
                  style: 'currency',
                  currency: 'CLP'
                })}
              </p>
              <p>
                <strong>Número de compras:</strong> {purchases.length}
              </p>
              <p>
                <strong>Productos vendidos:</strong> {stats.productosVendidos}
              </p>
              <p>
                <strong>Promedio por compra:</strong>{' '}
                {purchases.length
                  ? (stats.totalVentas / purchases.length).toLocaleString('es-CL', {
                      style: 'currency',
                      currency: 'CLP'
                    })
                  : '$0'}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card bg-dark border-success h-100">
            <div className="card-header bg-success text-white">👥 Usuarios</div>
            <div className="card-body">
              <p>
                <strong>Total usuarios:</strong> {stats.totalUsuarios}
              </p>
              <p>
                <strong>Usuarios DuocUC:</strong> {stats.usuariosDuoc}
              </p>
              <p>
                <strong>Categorías activas:</strong> {Object.keys(stats.categorias).length}
              </p>
              <p>
                <strong>Stock total estimado:</strong> {stats.stockTotal}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-6">
          <div className="card bg-dark border-info h-100">
            <div className="card-header bg-info text-white">🏆 Productos más vendidos</div>
            <div className="card-body">
              {stats.topProductos.length === 0 ? (
                <p className="text-secondary">No hay ventas registradas aún.</p>
              ) : (
                stats.topProductos.map(([nombre, cantidad], index) => (
                  <div className="d-flex justify-content-between mb-2" key={nombre}>
                    <span>
                      {index + 1}. {nombre}
                    </span>
                    <span className="badge bg-warning text-dark">{cantidad} vendidos</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card bg-dark border-warning h-100">
            <div className="card-header bg-warning text-dark">📋 Categorías</div>
            <div className="card-body">
              {Object.entries(stats.categorias).map(([categoria, cantidad]) => (
                <div className="d-flex justify-content-between mb-2" key={categoria}>
                  <span>{categoria}</span>
                  <span className="badge bg-primary">{cantidad} productos</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 d-flex gap-3 flex-wrap">
        <button className="btn btn-primary" type="button" onClick={handleExport}>
          📥 Exportar datos
        </button>
        <button className="btn btn-info" type="button" onClick={handleReport}>
          📄 Generar reporte PDF
        </button>
      </div>
    </div>
  );

  if (!user?.esAdmin) {
    return null;
  }

  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
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
          <div className="col-12 col-md-3">
            <div
              className={`card bg-dark text-light h-100 admin-card ${activeSection === 'dashboard' ? 'border-success' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => setActiveSection('dashboard')}
            >
              <div className="card-body text-center">
                <h5 className="card-title">📊 Dashboard</h5>
                <p className="card-text">Vista general del sistema</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div
              className={`card bg-dark text-light h-100 admin-card ${activeSection === 'usuarios' ? 'border-success' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => setActiveSection('usuarios')}
            >
              <div className="card-body text-center">
                <h5 className="card-title">👥 Usuarios</h5>
                <p className="card-text">Gestionar usuarios registrados</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div
              className={`card bg-dark text-light h-100 admin-card ${activeSection === 'productos' ? 'border-success' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => setActiveSection('productos')}
            >
              <div className="card-body text-center">
                <h5 className="card-title">📦 Productos</h5>
                <p className="card-text">Administrar catálogo</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div
              className={`card bg-dark text-light h-100 admin-card ${activeSection === 'reportes' ? 'border-success' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => setActiveSection('reportes')}
            >
              <div className="card-body text-center">
                <h5 className="card-title">📈 Reportes</h5>
                <p className="card-text">Estadísticas y ventas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark text-light p-4 rounded">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'usuarios' && renderUsers()}
          {activeSection === 'productos' && renderProducts()}
          {activeSection === 'reportes' && renderReports()}
        </div>
      </div>
    </section>
  );
};

export default Admin;
