// src/components/Header.jsx
import React from 'react';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">Level Up Gamer</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="/">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="/products">Productos</a></li>
            <li className="nav-item"><a className="nav-link" href="/categorias">Categorías</a></li>
            <li className="nav-item"><a className="nav-link" href="/ofertas">Ofertas</a></li>
            <li className="nav-item"><a className="nav-link btn btn-success ms-2" href="/cart">🛒 Carrito</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
