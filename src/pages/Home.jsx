import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { getFeaturedProducts } from '../services/productService.js';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
        setError(null);
      } catch (err) {
        console.error('Error cargando productos destacados:', err);
        setError('Error al cargar productos destacados');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1 className="fw-bold">Tienda Online</h1>
          <p className="hero-subtitle">
            ¡Explora lo último en tecnología y accesorios gamers en Chile!
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/productos">
              Ver productos
            </Link>
            <Link className="btn btn-outline-light btn-lg" to="/blogs">
              Leer novedades
            </Link>
          </div>
          <img
            src="/img/ps5-5.png.jpg"
            alt="PlayStation 5"
            className="hero-image mt-4"
          />
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">Productos Destacados</h2>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div className="row g-4">
              {featuredProducts.map((product) => (
                <div className="col-12 col-md-6 col-lg-3" key={product.slug}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card card-gradient p-4 p-md-5">
            <h3>Beneficios Level-Up</h3>
            <ul className="list-checkmark">
              <li>Despachos a todo Chile dentro de 72 horas hábiles</li>
              <li>Garantía oficial en todos los productos</li>
              <li>Descuento automático 20% para correos Duoc y profesor Duoc</li>
              <li>Puntos Level-Up por cada compra completada</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="footer-logos" aria-label="Métodos de pago aceptados">
            <img src="/img/visa.jpg" alt="Pago con Visa" title="Visa" />
            <img src="/img/mastercardd.jpg" alt="Pago con Mastercard" title="Mastercard" />
            <img src="/img/webpay.jpg" alt="Pago con Webpay" title="Webpay" />
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>¿Listo para subir de nivel?</h2>
          <p className="mb-4">
            Únete a la comunidad Level-Up Gamer y disfruta beneficios exclusivos,
            lanzamientos anticipados y soporte especializado.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/registro">
              Crear cuenta
            </Link>
            <Link className="btn btn-outline-light" to="/contacto">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;