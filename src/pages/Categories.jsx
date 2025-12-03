import React from 'react';

const TOP_CATS = [
  { name: 'Categoría Consolas',        img: '/img/Categorias/cat1.jpg' },
  { name: 'Categoría Computadores',    img: '/img/Categorias/cat6.jpg' },
  { name: 'Categoría Monitores',       img: '/img/Categorias/cat2.jpg' },
  { name: 'Categoría Perifericos',     img: '/img/Categorias/cat3.jpg' },
  { name: 'Categoría Juegos de mesa',  img: '/img/Categorias/cat4.jpg' },
  { name: 'Categoría Sillas',          img: '/img/Categorias/cat5.jpg' },
];

export default function Categories() {
  return (
    <>
      <section
        className="py-4 mb-3"
        style={{ background: '#0c0c0f', color: '#fff', borderBottom: '2px solid #7b2cff' }}
      >
        <div className="container">
          <nav className="small mb-2">
            <span style={{ opacity: 0.75 }}>Home</span> <span className="mx-1">/</span> <strong>Categorías</strong>
          </nav>
          <h1 className="h4 m-0">Categorías</h1>
        </div>
      </section>

      <div className="container mb-4">
        <div className="d-flex gap-3 flex-wrap">
          {TOP_CATS.map((c) => (
            <a
              key={c.name}
              href={`/productos?cat=${encodeURIComponent(c.name)}`}
              className="text-decoration-none text-center"
              style={{ width: 340 }}
              title={c.name}
            >
              <div className="card shadow-sm">
                <div className="ratio ratio-16x9 rounded-top">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="img-fluid rounded-top"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.src = '/img/Categorias/cat1.jpg'; }}
                  />
                </div>
                <div className="card-body p-2">
                  <div
                    className="small text-dark text-truncate"
                    style={{ fontSize: '1rem', color: '#ffffff' }}
                  >
                    {c.name}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
