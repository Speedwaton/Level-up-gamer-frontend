describe('Navbar.logic (window.NavbarLogic)', function () {
  // Por seguridad: acceder SIEMPRE vía window.NavbarLogic sin destructuring

  // toggleMenu: invierte el estado
  it('toggleMenu invierte false -> true', function () {
    expect(window.NavbarLogic.toggleMenu(false)).toBeTrue();
  });
  it('toggleMenu invierte true -> false', function () {
    expect(window.NavbarLogic.toggleMenu(true)).toBeFalse();
  });
  it('toggleMenu trata undefined como false y retorna true', function () {
    expect(window.NavbarLogic.toggleMenu(undefined)).toBeTrue();
  });

  // closeMenu: siempre cierra el menú
  it('closeMenu siempre devuelve false', function () {
    expect(window.NavbarLogic.closeMenu()).toBeFalse();
  });
  it('closeMenu ignora entradas no utilizadas', function () {
    expect(window.NavbarLogic.closeMenu('cualquier-cosa')).toBeFalse();
  });
  it('closeMenu es idempotente', function () {
    expect(window.NavbarLogic.closeMenu()).toBe(window.NavbarLogic.closeMenu());
  });

  // linkClassName: clase según isActive
  it("linkClassName devuelve 'nav-link active' si isActive=true", function () {
    expect(window.NavbarLogic.linkClassName(true)).toBe('nav-link active');
  });
  it("linkClassName devuelve 'nav-link' si isActive=false", function () {
    expect(window.NavbarLogic.linkClassName(false)).toBe('nav-link');
  });
  it('linkClassName trata valores truthy como activos', function () {
    expect(window.NavbarLogic.linkClassName('truthy')).toBe('nav-link active');
  });

  // deriveCollapseClass: clase de colapso según isOpen
  it("deriveCollapseClass incluye ' show' cuando isOpen=true", function () {
    expect(window.NavbarLogic.deriveCollapseClass(true)).toContain(' show');
  });
  it("deriveCollapseClass no incluye ' show' cuando isOpen=false", function () {
    expect(window.NavbarLogic.deriveCollapseClass(false)).not.toContain(' show');
  });
  it('deriveCollapseClass trata null como cerrado', function () {
    expect(window.NavbarLogic.deriveCollapseClass(null)).toBe('collapse navbar-collapse');
  });

  // cartBadgeCount: nunca negativo, entero, 0 para inputs inválidos
  it('cartBadgeCount retorna entero no negativo', function () {
    expect(window.NavbarLogic.cartBadgeCount(3.7)).toBe(3);
  });
  it('cartBadgeCount normaliza negativos a 0', function () {
    expect(window.NavbarLogic.cartBadgeCount(-5)).toBe(0);
  });
  it('cartBadgeCount convierte strings numéricos o NaN a 0/valor', function () {
    expect(window.NavbarLogic.cartBadgeCount('5')).toBe(5);
    expect(window.NavbarLogic.cartBadgeCount('no-num')).toBe(0);
  });

  // buildMenu: estructura de visibilidad según usuario
  it('buildMenu: sin usuario -> showAuthLinks=true, showProfile=false, showAdmin=false', function () {
    var cfg = window.NavbarLogic.buildMenu(null);
    expect(cfg.showAuthLinks).toBeTrue();
    expect(cfg.showProfile).toBeFalse();
    expect(cfg.showAdmin).toBeFalse();
    expect(Array.isArray(cfg.baseLinks)).toBeTrue();
    expect(cfg.baseLinks.length).toBeGreaterThanOrEqual(5);
  });
  it('buildMenu: usuario no admin -> auth=false, profile=true, admin=false', function () {
    var cfg = window.NavbarLogic.buildMenu({ nombre: 'Ada', esAdmin: false });
    expect(cfg.showAuthLinks).toBeFalse();
    expect(cfg.showProfile).toBeTrue();
    expect(cfg.showAdmin).toBeFalse();
  });
  it('buildMenu: usuario admin -> admin=true', function () {
    var cfg = window.NavbarLogic.buildMenu({ nombre: 'Root', esAdmin: true });
    expect(cfg.showAdmin).toBeTrue();
  });

  // handleLogout: llama logout y luego navigate con destino
  it('handleLogout invoca logout y navigate con ruta por defecto /', function () {
    var calls = { logout: 0, nav: [] };
    function logoutFn() { calls.logout++; }
    function navigateFn(path) { calls.nav.push(path); }
    var target = window.NavbarLogic.handleLogout(logoutFn, navigateFn);
    expect(target).toBe('/');
    expect(calls.logout).toBe(1);
    expect(calls.nav).toEqual(['/']);
  });
  it('handleLogout tolera funciones faltantes y retorna la ruta', function () {
    var target = window.NavbarLogic.handleLogout(null, null);
    expect(target).toBe('/');
  });
  it('handleLogout permite ruta personalizada', function () {
    var captured = null;
    function navigateFn(p) { captured = p; }
    var target = window.NavbarLogic.handleLogout(function(){}, navigateFn, '/adios');
    expect(target).toBe('/adios');
    expect(captured).toBe('/adios');
  });
});
