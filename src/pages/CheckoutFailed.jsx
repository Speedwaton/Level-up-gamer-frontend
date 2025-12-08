import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products.js'; // para fallback de imágenes

function clp(n) {
  return Number(n || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

// Fallback: si el item no trae image/imagen/img/picture, buscarla en el catálogo por slug o nombre
const getImgBySlug = (slug, nombre) => {
  if (!products || !products.length) return null;
  const p =
    products.find(p => p.slug === slug) ||
    products.find(p => (p.nombre || p.title) === nombre);
  if (!p) return null;
  return p.image ?? p.imagen ?? p.img ?? p.picture ?? p.photo ?? null;
};

export default function CheckoutFailed() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="container my-5 text-center">
        <h3 className="mb-3">No hay datos de compra</h3>
        <button className="btn btn-primary" onClick={() => navigate('/checkout')}>
          Volver a intentar
        </button>
      </div>
    );
  }

  const { orderId, form, items = [], total, message } = state;

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card shadow-sm">
            <div className="card-body form-dark">
              {/* Encabezado */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-danger fs-5">✖</span>
                  <h5 className="m-0">
                    No se pudo realizar el pago. nro <strong>#{orderId}</strong>
                  </h5>
                </div>
                {message ? <small className="text-muted">{message}</small> : null}
              </div>

              <div className="mb-3">
                <button className="btn btn-success" onClick={() => navigate('/checkout')}>
                  VOLVER A REALIZAR EL PAGO
                </button>
              </div>

              {/* Datos del cliente */}
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Nombre</label>
                  <div className="form-control">{form?.nombre || '-'}</div>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Apellido</label>
                  <div className="form-control">{form?.apellido || '-'}</div>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Correo</label>
                  <div className="form-control">{form?.email || '-'}</div>
                </div>

                <div className="col-12 mt-3"><h6 className="mb-1">Dirección de entrega</h6></div>

                <div className="col-md-6">
                  <label className="form-label">Calle</label>
                  <div className="form-control">{form?.calle || '-'}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Departamento (opcional)</label>
                  <div className="form-control">{form?.departamento || '-'}</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Región</label>
                  <div className="form-control">{form?.region || '-'}</div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Comuna</label>
                  <div className="form-control">{form?.comuna || '-'}</div>
                </div>

                <div className="col-12">
                  <label className="form-label">Indicaciones</label>
                  <div className="form-control">{form?.indicaciones || '-'}</div>
                </div>
              </div>

              {/* Resumen de productos */}
              <div className="table-responsive mt-4">
                <table className="table align-middle">
                  <thead className="small text-muted">
                    <tr>
                      <th style={{ width: 80 }}>Imagen</th>
                      <th>Nombre</th>
                      <th className="text-end">Precio</th>
                      <th className="text-center" style={{ width: 90 }}>Cant.</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it) => {
                      const img =
                        it.image ??
                        it.imagen ??
                        it.img ??
                        it.picture ??
                        getImgBySlug(it.slug, it.nombre) ??
                        null;

                      return (
                        <tr key={it.slug}>
                          <td>
                            <div className="ratio ratio-1x1 bg-dark rounded" style={{ width: 48 }}>
                              {img ? (
                                <img
                                  src={img}
                                  alt={it.nombre}
                                  className="rounded"
                                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                              ) : null}
                            </div>
                          </td>
                          <td className="text-truncate">{it.nombre}</td>
                          <td className="text-end">{clp(it.precio)}</td>
                          <td className="text-center">{it.cantidad}</td>
                          <td className="text-end">{clp((it.precio || 0) * (it.cantidad || 1))}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={4} className="text-end">Total pagado:</th>
                      <th className="text-end">{clp(total)}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="d-flex gap-2 justify-content-center mt-3 flex-wrap">
                <button className="btn btn-success" onClick={() => navigate('/checkout')}>
                  Volver a realizar el pago
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                  Volver al inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
