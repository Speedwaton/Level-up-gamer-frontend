import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, 1);
    window.alert(`✅ ${product.nombre} añadido al carrito`);
  };

  return (
    <div className="card h-100 shadow">
      <img src={product.imagen} alt={product.nombre} className="card-img-top" />
      <div className="card-body text-center d-flex flex-column">
        <h5 className="card-title">{product.nombre}</h5>
        <p className="text-secondary mb-2">{product.categoria}</p>
        <p className="fw-bold mb-3">
          {product.precio.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
          })}
        </p>
        <button className="btn btn-primary w-100 mb-2" type="button" onClick={handleAdd}>
          Añadir al carrito
        </button>
        <Link className="btn btn-outline-light w-100 mt-auto" to={`/productos/${product.slug}`}>
          Detalle del producto
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
