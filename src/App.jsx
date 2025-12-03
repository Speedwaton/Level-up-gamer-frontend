import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminReports from './pages/admin/AdminReports.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Categories from './pages/Categories';
import Checkout from './pages/Checkout.jsx'; 
import CheckoutSuccess from './pages/CheckoutSuccess.jsx'; 
import CheckoutFailed from './pages/CheckoutFailed.jsx';

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-shell">
          <ScrollToTop />
          {!isAdminRoute && <Navbar />}
          <main className={isAdminRoute ? 'page-content-admin' : 'page-content'}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/productos/:slug" element={<ProductDetail />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} /> 
              <Route path="/checkout/exito" element={<CheckoutSuccess />} /> 
              <Route path="/checkout/error" element={<CheckoutFailed />} /> 
              <Route path="/contacto" element={<Contact />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/perfil" element={<Profile />} />

              <Route path="/categorias" element={<Categories />} />

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="usuarios" element={<AdminUsers />} />
                <Route path="productos" element={<AdminProducts />} />
                <Route path="reportes" element={<AdminReports />} />
              </Route>
            </Routes>
          </main>
          {!isAdminRoute && <Footer />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
