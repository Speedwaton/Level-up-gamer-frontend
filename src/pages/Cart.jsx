import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom'; // ✅ agregado
/* NUEVO */ import { products } from '../data/products.js';

const Cart = () => {
  const {
    items,
    subtotal,
    discountPercentage,
    discountAmount,
    total,
    itemCount,
    updateQuantity,
    removeItem,
    clearCart,
    checkout
  } = useCart();

  /* NUEVO: intento detectar una función para agregar al carrito si existe en tu contexto */
  const cartApi = useCart();
  const addToCart = cartApi.addItem || cartApi.addToCart || cartApi.add || null;

  const navigate = useNavigate(); // ✅ agregado

  const handleCheckout = () => {
    const result = checkout();
    if (!result.ok) {
      window.alert(result.message);
      return;
    }
    window.alert('✅ Compra realizada con éxito. ¡Gracias por tu pedido!');
  };

  /* NUEVO: pequeña ayuda para CLP (solo para la lista izquierda) */
  const formatCLP = (n) =>
    Number(n || 0).toLocaleString('es-CL', { maximumFractionDigits: 0 });

  return (
    <section>
      <div className="container">
        <h1 className="text-center mb-4">🛒 Carrito de Compras</h1>

        {/* NUEVO: layout de dos columnas como en la figura */}
        <div className="row g-4">
          {/* Columna izquierda: Lista de productos */}
          <div className="col-12 col-lg-7">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white border-0">
                <strong>Lista de productos</strong>
              </div>

              <div className="card-body">
                <div className="row g-3">
                  {products.slice(0, 8).map((p) => (
                    <div key={p.slug || p.id} className="col-6 col-md-4">
                      <div className="card h-100">
                        <div className="ratio ratio-1x1 bg-dark rounded-top d-flex align-items-center justify-content-center">
                          {(() => {
                            const img =
                              p.image ??
                              p.imagen ??
                              p.img ??
                              p.picture ??
                              p.photo ??
                              null;
                            if (img) {
                              return (
                                <img
                                  src={img}
                                  alt={p.title || p.nombre}
                                  className="img-fluid rounded-top"
                                  style={{ objectFit: 'cover' }}
                                />
                              );
                            }
                            return (
                              <span className="text-white-50 small">
                                Sin imagen
                              </span>
                            );
                          })()}
                        </div>

                        <div className="card-body p-2 d-flex flex-column">
                          <div
                            className="small fw-semibold text-truncate"
                            title={p.title || p.nombre}
                          >
                            {p.title || p.nombre}
                          </div>
                          <div className="small text-muted mb-2">
                            ${formatCLP(p.price ?? p.precio)} CLP
                          </div>
                          <button
                            className="btn btn-sm btn-primary mt-auto w-100"
                            onClick={() => {
                              if (addToCart) {
                                addToCart(p);
                              } else {
                                window.alert(
                                  '⚠️ Aún no hay función de “Agregar al carrito” expuesta por el contexto.'
                                );
                              }
                            }}
                          >
                            Añadir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!products.length && (
                    <div className="text-muted">
                      No hay productos para mostrar.
                    </div>
                  )}
                </div>
              </div>
              <div className="card-footer small text-muted">
                * Haz clic en <em>Añadir</em> para enviar un producto al carrito.
              </div>
            </div>
          </div>

          {/* Columna derecha: tu carrito */}
          <div className="col-12 col-lg-5">
            {itemCount === 0 ? (
              <div className="text-center py-5">
                <p className="lead">Tu carrito está vacío.</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.slug}>
                          <td>{item.nombre}</td>
                          <td>
                            {item.precio.toLocaleString('es-CL', {
                              style: 'currency',
                              currency: 'CLP'
                            })}
                          </td>
                          <td style={{ width: '120px' }}>
                            <input
                              type="number"
                              min={1}
                              className="form-control bg-dark text-light text-center"
                              value={item.cantidad}
                              onChange={(event) =>
                                updateQuantity(
                                  item.slug,
                                  Number(event.target.value) || 1
                                )
                              }
                            />
                          </td>
                          <td>
                            {(item.precio * item.cantidad).toLocaleString(
                              'es-CL',
                              {
                                style: 'currency',
                                currency: 'CLP'
                              }
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              type="button"
                              onClick={() => removeItem(item.slug)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-end mt-4">
                  <p>
                    Subtotal:{' '}
                    <strong>
                      {subtotal.toLocaleString('es-CL', {
                        style: 'currency',
                        currency: 'CLP'
                      })}
                    </strong>
                  </p>
                  {discountPercentage > 0 && (
                    <p className="text-success">
                      Descuento {discountPercentage}% aplicado:{' '}
                      <strong>
                        -
                        {discountAmount.toLocaleString('es-CL', {
                          style: 'currency',
                          currency: 'CLP'
                        })}
                      </strong>
                    </p>
                  )}
                  <h3>
                    Total:{' '}
                    <span>
                      {total.toLocaleString('es-CL', {
                        style: 'currency',
                        currency: 'CLP'
                      })}
                    </span>
                  </h3>
                  <div className="d-flex gap-3 justify-content-end mt-3 flex-wrap">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={clearCart}
                    >
                      Vaciar carrito
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => navigate('/checkout')} // ✅ aquí va la navegación al checkout
                    >
                      Pagar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
