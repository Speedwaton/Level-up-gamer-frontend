import { useOutletContext } from 'react-router-dom';

const AdminProducts = () => {
  const { products } = useOutletContext();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">📦 Gestión de productos</h3>
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
      <p className="text-secondary mt-3">
        💡 Tip: Mantén actualizadas las relaciones de productos para mostrar recomendaciones relevantes en la tienda.
      </p>
    </div>
  );
};

export default AdminProducts;
