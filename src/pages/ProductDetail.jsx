import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductBySlug } from '../services/productService.js';
import { useCart } from '../context/CartContext.jsx';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductBySlug(slug);
        setProduct(data);
        
        if (data.relacionados && data.relacionados.length > 0) {
          setRelated(data.relacionados);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error cargando producto:', err);
        setError('Producto no encontrado');
        navigate('/productos', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug, navigate]);

  if (loading) {
    return (
      <section>
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return null;
  }

  const handleAdd = () => {
    addItem(product, 1);
    window.alert(`✅ ${product.nombre} añadido al carrito`);
  };

  return (
    <section>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/productos">Productos</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.nombre}
            </li>
          </ol>
        </nav>

        <div className="row g-5 mb-5 align-items-start">
          <div className="col-12 col-lg-6">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="img-fluid rounded shadow"
              style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-12 col-lg-6">
            <h1 className="fw-bold mb-3">{product.nombre}</h1>
            <p className="lead text-secondary">{product.categoria}</p>
            <div className="mb-4">
              <span className="h2 fw-bold">
                {product.precio.toLocaleString('es-CL', {
                  style: 'currency',
                  currency: 'CLP'
                })}
              </span>
              <div className="mb-2 mt-2" style={{ color: '#ffc107' }}>
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-secondary mb-4">⭐ 4.8 de 5 (124 reseñas)</p>
            </div>
            <p className="mb-4">{product.descripcion}</p>
            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-lg" type="button" onClick={handleAdd}>
                Añadir al carrito
              </button>
              <div className="text-center mt-2">
                <small className="text-success d-block">✅ Envío gratis a todo Chile</small>
                <small className="text-info">🎮 Gana puntos Level-Up con esta compra</small>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12 col-md-6">
            <h3 className="mb-3 text-info">Especificaciones</h3>
            <ul className="list-checkmark">
              {product.specs?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <h3 className="mb-3 text-info">Incluye</h3>
            <ul className="list-checkmark">
              {product.incluye?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mb-5">
            <h3 className="mb-4">Productos relacionados</h3>
            <div className="row g-4">
              {related.map((item) => (
                <div className="col-12 col-md-4" key={item.slug}>
                  <div className="card h-100">
                    <img src={item.imagen} alt={item.nombre} className="card-img-top" />
                    <div className="card-body text-center">
                      <h6 className="card-title">{item.nombre}</h6>
                      <p className="fw-bold">
                        {item.precio.toLocaleString('es-CL', {
                          style: 'currency',
                          currency: 'CLP'
                        })}
                      </p>
                      <Link className="btn btn-outline-primary btn-sm" to={`/productos/${item.slug}`}>
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
