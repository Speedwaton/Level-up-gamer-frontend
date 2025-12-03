import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { findBlog } from '../data/blogs.js';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = findBlog(slug);

  useEffect(() => {
    if (!blog) {
      navigate('/blogs', { replace: true });
    }
  }, [blog, navigate]);

  if (!blog) {
    return null;
  }

  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold">{blog.titulo}</h2>
          <p className="text-secondary">{blog.fecha}</p>
        </div>
        <div className="text-center mb-4">
          <img
            src={blog.imagen}
            alt={blog.titulo}
            className="img-fluid rounded shadow"
            style={{ maxWidth: '520px' }}
          />
        </div>
        {blog.contenido.map((paragraph) => (
          <p className="lead" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <div className="text-center mt-4">
          <Link className="btn btn-dark" to="/blogs">
            ⬅ Volver a Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
