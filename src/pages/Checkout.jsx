import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { products } from '../data/products.js'; // ← ✅ NUEVO
import { regionesYComunas } from '../data/regions.js'; // ADD ✅

function clp(n) {
  return Number(n || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, checkout } = useCart();
  const { user } = useAuth(); // ← si hay sesión, autocompletamos

  // ✅ buscar imagen en el catálogo por slug (o por nombre si no hay slug)
  const getImgBySlug = (slug, nombre) => {
    if (!products || !products.length) return null;
    const p =
      products.find(p => p.slug === slug) ||
      products.find(p => (p.nombre || p.title) === nombre);
    if (!p) return null;
    return p.image ?? p.imagen ?? p.img ?? p.picture ?? p.photo ?? null;
  };

  // Campos del formulario
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    calle: '',
    departamento: '',
    region: '',
    comuna: '',
    indicaciones: '',
  });

  // ADD ✅ listas derivadas desde regions.js
  const regiones = useMemo(() => {
    try {
      return Object.keys(regionesYComunas).filter(
        (r) => r && r.toLowerCase() !== 'seleccione región'
      );
    } catch {
      return [];
    }
  }, []);

  const comunas = useMemo(() => {
    try {
      return form.region ? (regionesYComunas[form.region] || []) : [];
    } catch {
      return [];
    }
  }, [form.region]);

  // Autocompletar desde el usuario si está logueado
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      nombre: user.nombre ?? f.nombre,
      apellido: user.apellido ?? f.apellido,
      email: user.email ?? f.email,
      calle: user.direccion ?? f.calle,
      region: user.region ?? f.region,
      comuna: user.comuna ?? f.comuna,
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ADD ✅ si cambia región, limpiamos comuna
    if (name === 'region') {
      setForm((f) => ({ ...f, region: value, comuna: '' }));
      return;
    }

    setForm((f) => ({ ...f, [name]: value }));
  };

  const totalFilas = useMemo(
    () => items.reduce((acc, it) => acc + (it.precio || 0) * (it.cantidad || 1), 0),
    [items]
  );

  const validar = () => {
    const req = ['nombre', 'apellido', 'email', 'calle', 'region', 'comuna'];
    const vacios = req.filter((k) => !String(form[k] || '').trim());
    if (vacios.length) {
      alert('Completa los campos obligatorios: ' + vacios.join(', '));
      return false;
    }
    return true;
  };

  // ⬇ Redirige a /checkout/exito o /checkout/error con los datos
  const handlePagar = async (e) => {
    e.preventDefault();

    // 1) Atajo para simular pago fallido: /checkout?fail=1
    const params = new URLSearchParams(window.location.search);
    if (params.get('fail') === '1') {
      const orderId = 'ORDER' + Date.now().toString().slice(-6);
      navigate('/checkout/error', {
        state: { orderId, form, items, total, message: 'Pago rechazado (demo con ?fail=1).' }
      });
      return;
    }

    // 2) Flujo normal con validación
    if (!validar()) return;

    const result = await checkout(form);
    
    if (!result.ok) {
      navigate('/checkout/error', {
        state: { 
          orderId: result.orderId || 'ERROR',
          form, 
          items, 
          total, 
          message: result.message 
        }
      });
      return;
    }

    navigate('/checkout/exito', {
      state: { 
        orderId: result.orderId,
        form, 
        items, 
        total 
      }
    });
  };
  // ⬆

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0 checkout-title">Carrito de compra</h5>
                <span className="badge bg-primary checkout-total-box">
                  Total a pagar: {clp(total)}
                </span>
              </div>

              {/* Tabla resumen */}
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="small text-muted">
                    <tr>
                      <th style={{ width: 80 }}>Imagen</th>
                      <th>Nombre</th>
                      <th className="text-end">Precio</th>
                      <th className="text-center" style={{ width: 90 }}>Cantidad</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>

                  {/* usa fallback por slug si el item no trae imagen */}
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
                            <div
                              className="ratio ratio-1x1 bg-dark rounded"
                              style={{ width: 48 }}
                            >
                              {img ? (
                                <img
                                  src={img}
                                  alt={it.nombre}
                                  className="rounded"
                                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                              ) : (
                                <span className="text-secondary small d-flex align-items-center justify-content-center">
                                  No Img
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="text-truncate" title={it.nombre}>{it.nombre}</td>
                          <td className="text-end">{clp(it.precio)}</td>
                          <td className="text-center">{it.cantidad}</td>
                          <td className="text-end">{clp((it.precio || 0) * (it.cantidad || 1))}</td>
                        </tr>
                      );
                    })}
                  </tbody>

                  <tfoot>
                    <tr>
                      <th colSpan={4} className="text-end">Total</th>
                      <th className="text-end">{clp(totalFilas)}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Formulario */}
              <hr className="my-4" />
              <form onSubmit={handlePagar} className="checkout-form">
                <div className="row g-3">
                  <div className="col-12">
                    <h6 className="mb-1">Información del cliente</h6>
                    <small className="text-muted">Completa la siguiente información</small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Nombre *</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido *</label>
                    <input name="apellido" value={form.apellido} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Correo *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <h6 className="mb-1">Dirección de entrega de los productos</h6>
                    <small className="text-muted">Ingresa dirección de forma detallada</small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Calle *</label>
                    <input name="calle" value={form.calle} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Departamento (opcional)</label>
                    <input
                      name="departamento"
                      value={form.departamento}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Región *</label>
                    <select name="region" value={form.region} onChange={handleChange} className="form-select" required>
                      <option value="">Seleccionar…</option>
                      <option>Región Metropolitana de Santiago</option>
                      <option>Región de Valparaíso</option>
                      <option>Región del Biobío</option>
                      <option>Región de La Araucanía</option>
                      {/* ADD ⤵ regiones dinámicas desde regions.js */}
                      {regiones.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Comuna *</label>
                    <select name="comuna" value={form.comuna} onChange={handleChange} className="form-select" required>
                      <option value="">Seleccionar…</option>
                      <option>Santiago</option>
                      <option>Providencia</option>
                      <option>Las Condes</option>
                      <option>Cerrillos</option>
                      {/* ADD ⤵ comunas dinámicas según región elegida */}
                      {comunas.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Indicaciones para la entrega (opcional)</label>
                    <textarea
                      name="indicaciones"
                      value={form.indicaciones}
                      onChange={handleChange}
                      className="form-control"
                      rows={2}
                      placeholder="Ej: Entre calles, color del edificio, no tiene timbre…"
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-end mt-2">
                    <button type="submit" className="btn btn-success">
                      Pagar ahora {clp(total)}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Si no hay items, avisamos y damos salida*/}
          {items.length === 0 && (
            <div className="text-center text-muted mt-3">
              Tu carrito está vacío. <button className="btn btn-link" onClick={() => navigate('/productos')}>Ir a productos</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
