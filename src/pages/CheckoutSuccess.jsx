import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products.js'; // 👈 Fallback al catálogo

function clp(n) {
  return Number(n || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="container my-5 text-center">
        <h3 className="mb-3">No hay datos de compra</h3>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Ir al inicio
        </button>
      </div>
    );
  }

  const { orderId, form, items, total } = state;

  // 🧩 Index rápido por slug para buscar imagen en el catálogo si falta en el item
  const catalogImageBySlug = React.useMemo(() => {
    try {
      return Object.fromEntries(
        (products || []).map((p) => [
          p.slug,
          p.image ?? p.imagen ?? p.img ?? p.picture ?? p.photo ?? null,
        ])
      );
    } catch {
      return {};
    }
  }, []);

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card shadow-sm">
            <div className="card-body form-dark">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-success fs-5">✔</span>
                  <h5 className="m-0">
                    Se ha realizado la compra. nro <strong>#{orderId}</strong>
                  </h5>
                </div>
                <small className="text-muted">Código orden: {orderId}</small>
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
                    {items?.map((it) => {
                      // 🖼️ Toma la imagen del item, y si no existe, la busca en el catálogo por slug
                      const img =
                        it.image ??
                        it.imagen ??
                        it.img ??
                        it.picture ??
                        catalogImageBySlug[it.slug] ??
                        null;

                      return (
                        <tr key={it.slug}>
                          <td>
                            <div className="ratio ratio-1x1 bg-light rounded" style={{ width: 48 }}>
                              {img ? (
                                <img
                                  src={img}
                                  alt={it.nombre}
                                  className="rounded"
                                  style={{ objectFit: 'cover' }}
                                />
                              ) : null}
                            </div>
                          </td>
                          <td className="text-truncate">{it.nombre}</td>
                          <td className="text-end">{clp(it.precio)}</td>
                          <td className="text-center">{it.cantidad}</td>
                          <td className="text-end">
                            {clp((it.precio || 0) * (it.cantidad || 1))}
                          </td>
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
                <button className="btn btn-danger" onClick={() => window.print()}>
                  Imprimir boleta en PDF
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => alert('📧 Boleta enviada por email (demo).')}
                >
                  Enviar boleta por email
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
