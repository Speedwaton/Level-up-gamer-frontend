// navbar.logic.js (Navbar.logic.js)
// Lógica pura extraída de src/components/Navbar.jsx
// Todas las funciones viven bajo window.NavbarLogic (y alias window.navbarLogic para compatibilidad)
// No dependen de React ni de imports/exports.

(function initNavbarLogic(global) {
  // Evita redeclaración si ya existe
  var NS = (global.NavbarLogic = global.NavbarLogic || {});

  // Constantes base de navegación (mismas rutas visibles en la UI)
  var BASE_LINKS = [
    { to: '/productos', label: 'Productos' },
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/blogs', label: 'Blog' },
    { to: '/contacto', label: 'Contacto' },
    { to: '/categorias', label: 'Categorías' }
  ];

  // toggleMenu: invierte el estado del menú hamburguesa
  // - Entrada: prev (boolean | any)
  // - Salida: boolean (true si debe abrirse, false si debe cerrarse)
  NS.toggleMenu = function toggleMenu(prev) {
    return !Boolean(prev);
  };

  // closeMenu: fuerza el menú a estado cerrado
  // - Ignora entradas, siempre devuelve false
  NS.closeMenu = function closeMenu() {
    return false;
  };

  // linkClassName: compone la clase de NavLink en función de isActive
  // - Entrada: isActive (boolean | any)
  // - Salida: 'nav-link' o 'nav-link active'
  NS.linkClassName = function linkClassName(isActive) {
    return 'nav-link' + (isActive ? ' active' : '');
  };

  // deriveCollapseClass: calcula la clase del contenedor colapsable
  // - Entrada: isOpen (boolean | any)
  // - Salida: 'collapse navbar-collapse' (+ ' show' si abierto)
  NS.deriveCollapseClass = function deriveCollapseClass(isOpen) {
    return 'collapse navbar-collapse' + (isOpen ? ' show' : '');
  };

  // cartBadgeCount: normaliza el contador del carrito a entero >= 0
  // - Entrada: count (number | any)
  // - Salida: number (>= 0)
  NS.cartBadgeCount = function cartBadgeCount(count) {
    var n = Number(count);
    if (!isFinite(n) || isNaN(n)) return 0;
    if (n < 0) return 0;
    return Math.floor(n);
  };

  // buildMenu: decide qué bloques de navegación mostrar según el usuario
  // - Entrada: user (objeto o null/undefined) con campos opcionales { esAdmin: boolean }
  // - Salida: objeto con estructura:
  //   {
  //     baseLinks: [...],          // enlaces visibles para todos
  //     showAuthLinks: boolean,    // mostrar 'Iniciar sesión' y 'Registrar usuario'
  //     showProfile: boolean,      // mostrar menú de perfil
  //     showAdmin: boolean         // mostrar acceso a /admin si es admin
  //   }
  NS.buildMenu = function buildMenu(user) {
    var hasUser = !!(user && typeof user === 'object');
    var isAdmin = !!(hasUser && user.esAdmin);
    return {
      baseLinks: BASE_LINKS.slice(),
      showAuthLinks: !hasUser,
      showProfile: hasUser,
      showAdmin: isAdmin
    };
  };

  // handleLogout: encapsula el flujo de logout + navegación
  // - Entradas:
  //   logoutFn: función (opcional) a invocar para cerrar sesión
  //   navigateFn: función (opcional) para navegar a la ruta indicada
  //   to: string (opcional) ruta a donde navegar; por defecto '/'
  // - Salida: string con la ruta objetivo (útil para pruebas)
  // - Comportamiento: llama a logoutFn() si existe; luego navigateFn(to) si existe
  NS.handleLogout = function handleLogout(logoutFn, navigateFn, to) {
    var target = typeof to === 'string' && to.length ? to : '/';
    try {
      if (typeof logoutFn === 'function') logoutFn();
    } catch (e) {
      // no propagar errores de logout en lógica pura
    }
    try {
      if (typeof navigateFn === 'function') navigateFn(target);
    } catch (e) {
      // no propagar errores de navegación en lógica pura
    }
    return target;
  };

  // Alias de compatibilidad: mantener window.navbarLogic apuntando a la misma API
  if (!global.navbarLogic) {
    global.navbarLogic = NS;
  }
})(window);
