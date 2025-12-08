export const blogs = [
  {
    slug: 'lanzamiento-playstation-5',
    titulo: 'El lanzamiento de la PlayStation 5',
    imagen: '/img/ps5-5.png.jpg',
    resumen:
      'La consola más esperada llega a Level-Up Gamer con stock limitado y despacho a todo Chile.',
    contenido: [
      'La consola de última generación de Sony, la PlayStation 5, llegó oficialmente a Level-Up Gamer con unidades limitadas.',
      'Ofrece gráficos impresionantes, tiempos de carga ultrarrápidos y catálogo exclusivo. Aprovecha los beneficios de usuario registrado, incluidos descuentos para correos Duoc.',
      'Contamos con despacho a todo Chile y retiro en tienda. ¡No te quedes sin la tuya!'
    ],
    fecha: '10 de junio 2025'
  },
  {
    slug: 'auriculares-hyperx-cloud-ii',
    titulo: 'HyperX Cloud II: sonido envolvente para competir',
    imagen: '/img/Proyecto Quitar fondo.png.jpg',
    resumen:
      'Uno de los headsets favoritos de la comunidad gamer chilena ahora disponible en Level-Up Gamer.',
    contenido: [
      'Los HyperX Cloud II combinan ligereza, sonido envolvente y micrófono desmontable, ideales para sesiones largas.',
      'Su estructura de aluminio y almohadillas memory foam garantizan durabilidad y comodidad. Además, el control USB integra mute instantáneo y balance de chat.',
      'Ahora disponibles con entrega en 48 horas para Santiago y promociones especiales para estudiantes Duoc.'
    ],
    fecha: '25 de mayo 2025'
  }
];

export const findBlog = (slug) => blogs.find((item) => item.slug === slug);
