const About = () => (
  <section>
    <div className="container">
      <div className="mb-5">
        <h1 className="text-center mb-4">Sobre Nosotros</h1>
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-6">
            <p>
              <strong>Level-Up Gamer</strong> nació con la misión de llevar la mejor experiencia gamer a todo Chile. Somos un equipo
              apasionado por la tecnología, los videojuegos y la innovación. Nuestro compromiso es ofrecer productos de alta calidad,
              soporte dedicado y las últimas tendencias para que cada jugador pueda alcanzar su máximo nivel.
            </p>
            <p>
              Desde consolas de última generación hasta periféricos profesionales, trabajamos con marcas reconocidas para garantizar
              rendimiento, calidad y garantía oficial.
            </p>
            <p>¡Únete a nuestra comunidad y vive la experiencia <span className="text-info">LEVEL-UP</span>!</p>
          </div>
          <div className="col-12 col-lg-6 text-center">
            <img
              src="/img/d6b71733-7d4f-471a-bdb7-61d09902c0e2.png"
              alt="Level-Up Gamer"
              className="img-fluid rounded shadow"
              style={{ maxWidth: '320px' }}
            />
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <div className="text-center mb-5">
        <h2 className="mb-3">Nuestra Visión</h2>
        <p>
          Ser la tienda gamer de referencia en Chile, inspirando a jugadores de todas las edades a descubrir nuevas aventuras digitales.
        </p>
      </div>

      <div>
        <h2 className="text-center mt-5 mb-4">Nuestros Valores</h2>
        <div className="row g-4 text-center">
          <div className="col-12 col-md-4">
            <div className="card p-4 h-100">
              <h3>Calidad</h3>
              <p>Productos originales y garantía oficial en cada compra.</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card p-4 h-100">
              <h3>Innovación</h3>
              <p>Traemos lo último en tecnología gamer para tu setup.</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card p-4 h-100">
              <h3>Comunidad</h3>
              <p>Un espacio para compartir experiencias y pasión por los videojuegos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
