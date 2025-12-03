const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert('✅ Se ha enviado correctamente');
  };

  return (
    <section>
      <div className="container">
        <div className="text-center mb-5">
          <img
            src="/img/d6b71733-7d4f-471a-bdb7-61d09902c0e2.png"
            alt="Level-Up Gamer"
            width="120"
            height="120"
            className="mb-3 mx-auto"
          />
          <h2 className="fw-bold">Level-Up Gamer</h2>
          <p className="text-secondary">
            Estamos aquí para ayudarte. Completa el formulario y te contactaremos.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <form className="form-card" onSubmit={handleSubmit}>
              <h4 className="text-center mb-4">Formulario de Contacto</h4>

              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre completo
                </label>
                <input type="text" id="nombre" required />
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo
                </label>
                <input type="email" id="correo" required />
              </div>

              <div className="mb-3">
                <label htmlFor="contenido" className="form-label">
                  Contenido
                </label>
                <textarea id="contenido" rows={4} required />
              </div>

              <button className="btn btn-primary w-100" type="submit">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
