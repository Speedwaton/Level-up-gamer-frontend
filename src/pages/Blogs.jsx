import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs.js';

const Blogs = () => (
  <section>
    <div className="container">
      <h2 className="text-center mb-5 fw-bold">Noticias importantes</h2>
      {blogs.map((blog, index) => (
        <div
          className={`row mb-5 align-items-center p-4 bg-light rounded shadow text-dark`}
          style={{ background: '#f5f6ff' }}
          key={blog.slug}
        >
          <div className={`col-12 col-md-6 ${index % 2 === 0 ? '' : 'order-md-2'}`}>
            <h3 className="fw-bold">{blog.titulo}</h3>
            <p>{blog.resumen}</p>
            <Link className="btn btn-dark" to={`/blogs/${blog.slug}`}>
              Ver caso
            </Link>
          </div>
          <div className={`col-12 col-md-6 text-center ${index % 2 === 0 ? 'order-md-2' : 'order-md-1'}`}>
            <img src={blog.imagen} alt={blog.titulo} className="img-fluid rounded shadow" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Blogs;
