# Level Up Gamer - Frontend

Aplicación web desarrollada con React para la plataforma de e-commerce Level Up Gamer.

## Tecnologías

- React 18.3.1
- React Router 6.28.0
- Axios 1.13.2
- Bootstrap 5.3.8
- React Scripts 5.0.1

## Requisitos Previos

- Node.js 16+ y npm
- Backend corriendo en `http://localhost:8080`

## Instalación y Ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/Speedwaton/Level-up-gamer-frontend.git
cd Level-up-gamer-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar la aplicación:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Credenciales de Prueba

### Usuario Administrador
- **Email:** admin@levelupgamer.cl
- **Contraseña:** admin123

### Usuario Normal (si ya fue creado)
- Crear uno nuevo desde el registro o usar los que se hayan registrado previamente

## Funcionalidades Principales

### Para Todos los Usuarios
- Ver catálogo de productos
- Filtrar por categorías
- Ver detalles de productos
- Agregar productos al carrito
- Realizar compras (checkout)

### Para Usuarios Registrados
- Perfil de usuario
- Historial de compras
- Descuentos especiales

### Para Administradores
- Dashboard con estadísticas en tiempo real
- Gestión de productos (crear, editar, eliminar)
- Gestión de usuarios
- Reportes de ventas

## Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
│   ├── Header.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx
├── context/         # Context API
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── pages/           # Páginas principales
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── admin/       # Panel de administración
├── services/        # Servicios de API
│   ├── api.js
│   ├── adminService.js
│   └── productService.js
├── assets/          # Estilos y recursos
└── data/           # Datos estáticos
```

## Configuración de API

La URL del backend está configurada en `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:8080/api/v1';
```

Si el backend está en otra dirección, modificar esta variable.

## Características Técnicas

- **Autenticación JWT:** Los tokens se almacenan en localStorage y se envían automáticamente en cada petición
- **Actualización en Tiempo Real:** El dashboard de admin se actualiza automáticamente después de cada compra
- **Rutas Protegidas:** Las rutas de administración requieren autenticación y rol de admin
- **Validación de Stock:** Verifica disponibilidad antes de permitir agregar al carrito

## Scripts Disponibles

- `npm start` - Ejecuta la app en modo desarrollo
- `npm build` - Crea la versión de producción
- `npm test` - Ejecuta los tests
- `npm eject` - Expone la configuración de webpack (no reversible)
