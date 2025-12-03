import { useOutletContext } from 'react-router-dom';

const AdminReports = () => {
  const { stats, purchases, users, products } = useOutletContext();

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
          <li><strong>Stock Total Estimado:</strong> ${stats.stockTotal}</li>
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

  return (
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
};

export default AdminReports;
