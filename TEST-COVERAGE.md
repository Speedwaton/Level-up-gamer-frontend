# Documentación de Cobertura de Testing — Frontend (React)

Fecha: 09/12/2025
Proyecto: Level Up Gamer — Frontend
Herramientas: React 18, Jest, React Testing Library, react-scripts

## Alcance

Esta documentación explica cómo ejecutar pruebas del frontend, medir cobertura de componentes, hooks y servicios (Axios), y mantener umbrales de calidad.

## Tipos de pruebas

- Componentes: `Header`, `Navbar`, `ProductCard`, `AdminLayout` (render, interacción, rutas).
- Páginas: `Login`, `Register`, `CheckoutSuccess`, `Products`, `ProductDetail`.
- Hooks/Context: `AuthContext`, `CartContext` (estado, efectos, eventos personalizados `orderCompleted`).
- Servicios: `api.js`, `productService.js`, `adminService.js` (llamadas HTTP, headers Bearer, errores).
- Utilidades: `navbar.logic.js` (incluye `navbar.logic.spec.js`).

## Ejecutar pruebas y generar cobertura

- Ejecutar pruebas en modo CI y obtener cobertura:
```powershell
cd "d:\levelup\Level-up-gamer-frontend-master"
npm test -- --coverage --watchAll=false
```

- Reporte HTML de cobertura (Jest):
```
./coverage/lcov-report/index.html
```

## Configuración recomendada (package.json)

Asegura los flags de Jest para cobertura y umbrales mínimos:
```json
{
  "scripts": {
    "test": "react-scripts test"
  },
  "jest": {
    "collectCoverage": true,
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}",
      "!src/**/index.jsx",
      "!src/main.jsx"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 60,
        "functions": 70,
        "lines": 70,
        "statements": 70
      }
    }
  }
}
```

Si `jest` no está en `package.json`, usa `.jest.config.js` con la misma configuración.

## Mapeo de vistas/servicios a pruebas (guía)

- `AuthContext` → test de login con token, persistencia en `localStorage`, logout.
- `CartContext` → test de `orderCompleted` y refresco de `AdminLayout` mediante evento.
- `AdminLayout` → carga de usuarios/productos/órdenes, cálculo de métricas, re-render en evento.
- `api.js` → interceptor de Axios añade `Authorization: Bearer <token>`; errores 401/403.
- `Login.jsx` → flujo de envío, manejo de errores, redirección.
- `CheckoutSuccess.jsx` → cumplimiento de reglas de hooks; navegación.
- `navbar.logic.js` → ya cuenta con `navbar.logic.spec.js`; ampliar casos.

## Lectura del reporte

Abre `coverage/lcov-report/index.html`. Revisa:
- Cobertura por archivo y función.
- Ramas no cubiertas en condicionales de render y rutas.
- Servicios con rutas de error no probadas.

## Estrategia para aumentar cobertura

1. Tests de interacción reales con Testing Library (click, input, submit).
2. Mocks de Axios con `jest.mock('axios')` para controlar respuestas.
3. Cubrir estados vacíos/carga/errores en páginas y dashboards.
4. Pruebas de rutas protegidas: acceso sin token vs con token.
5. Cobertura de eventos personalizados (`orderCompleted`).

## Umbrales recomendados

- Componentes y páginas: ≥ 70% líneas.
- Context/Hooks: ≥ 80%.
- Servicios: ≥ 80% ramas.
- Global: ≥ 70% inicial; subir gradualmente.

## Ejecución rápida en CI/local

```powershell
npm test -- --coverage --watchAll=false
```

## Estado actual (plantilla)

- Ejecuta pruebas y adjunta capturas del `lcov-report/index.html` con:
  - Cobertura global
  - Archivos con menor cobertura
  - Acciones planificadas para mejorar

## Anexos

- Guías para mock de `localStorage` y `fetch/Axios`.
- Ejemplos de pruebas de rutas con `MemoryRouter`.
