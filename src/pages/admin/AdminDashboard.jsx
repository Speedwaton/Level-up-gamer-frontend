import { useOutletContext } from 'react-router-dom';

const AdminDashboard = () => {
  const { stats, products, users, purchases } = useOutletContext();

  return (
    <div>
      <h3 className="text-primary">📊 Dashboard General</h3>
      <p className="text-secondary mb-4">Vista general del sistema</p>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <h6 className="card-title">👥 Total Usuarios</h6>
              <h2 className="mb-0">{stats.totalUsuarios}</h2>
              <small>🎓 DuocUC: {stats.usuariosDuoc}</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <h6 className="card-title">📦 Total Productos</h6>
              <h2 className="mb-0">{products.length}</h2>
              <small>En catálogo</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body">
              <h6 className="card-title">💰 Ventas Totales</h6>
              <h2 className="mb-0">
                {stats.totalVentas.toLocaleString('es-CL', {
                  style: 'currency',
                  currency: 'CLP'
                })}
              </h2>
              <small>{purchases.length} compras</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <h6 className="card-title">📊 Productos Vendidos</h6>
              <h2 className="mb-0">{stats.productosVendidos}</h2>
              <small>Unidades totales</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title text-info">📂 Productos por Categoría</h5>
              <table className="table table-dark table-sm">
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th className="text-end">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stats.categorias).map(([categoria, cantidad]) => (
                    <tr key={categoria}>
                      <td>{categoria}</td>
                      <td className="text-end">
                        <span className="badge bg-primary">{cantidad}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title text-success">🔥 Top 5 Productos Vendidos</h5>
              {stats.topProductos.length > 0 ? (
                <table className="table table-dark table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th className="text-end">Vendidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topProductos.map(([nombre, cantidad]) => (
                      <tr key={nombre}>
                        <td>{nombre}</td>
                        <td className="text-end">
                          <span className="badge bg-success">{cantidad}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-secondary">No hay ventas registradas aún</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <strong>💡 Tip:</strong> Los datos se actualizan automáticamente cuando hay nuevas
        compras en el sistema.
      </div>
    </div>
  );
};

export default AdminDashboard;