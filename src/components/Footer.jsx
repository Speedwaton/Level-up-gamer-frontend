const Footer = () => (
  <footer className="text-center">
    <div className="container">
      <p className="mb-1">© 2025 Level-Up Gamer - Todos los derechos reservados</p>
      <div className="d-flex justify-content-center gap-3 mb-3">
        <a href="#" className="text-light">Categoría X</a>
        <span>|</span>
        <a href="#" className="text-light">Categoría Y</a>
        <span>|</span>
        <a href="#" className="text-light">Categoría Z</a>
      </div>

      {/* ✅ Métodos de pago (ACTUALIZADO A .jpg si tus imágenes son .jpg) */}
      <div className="footer-logos">
        <img src="/img/visa.jpg" alt="Visa" />
        <img src="/img/mastercardd.jpg" alt="MasterCard" />
        <img src="/img/webpay.jpg" alt="WebPay" />
      </div>

      <form className="d-flex flex-column flex-md-row justify-content-center align-items-md-end gap-3">
        <div className="text-start w-100 w-md-auto" style={{ maxWidth: '280px' }}>
          <label htmlFor="correo-footer" className="form-label">Correo electrónico</label>
          <input
            type="email"
            id="correo-footer"
            name="correo"
            className="form-control"
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Suscribirse</button>
      </form>
    </div>
  </footer>
);

export default Footer;
