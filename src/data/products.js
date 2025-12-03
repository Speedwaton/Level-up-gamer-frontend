export const products = [
  {
    slug: 'playstation-5',
    nombre: 'PlayStation 5',
    categoria: 'Consolas',
    precio: 549990,
    imagen: '/img/ps5-5.png.jpg',
    resumen: 'Gráficos 4K, ray tracing y el nuevo DualSense para una experiencia inmersiva.',
    descripcion:
      'La PlayStation 5 ofrece tiempos de carga ultrarrápidos, gráficos ray-tracing y soporte 4K, además de un catálogo exclusivo que sigue creciendo.',
    specs: [
      'CPU AMD Zen 2 de 8 núcleos a 3.5 GHz',
      'GPU RDNA 2 con 10.28 TFLOPs y Ray Tracing',
      'Unidad SSD ultra rápida de 825 GB',
      'Salida de video hasta 4K a 120 FPS',
      'Retrocompatibilidad con PS4'
    ],
    incluye: [
      '1 consola PlayStation 5',
      '1 control DualSense blanco',
      'Cable HDMI 2.1 y alimentación',
      "Astro's Playroom preinstalado"
    ],
    relacionados: ['pc-gamer-asus-rog', 'xbox-series-s', 'teclado-kurama']
  },
  {
    slug: 'pc-gamer-asus-rog',
    nombre: 'PC Gamer ASUS ROG Strix',
    categoria: 'Computadores Gamers',
    precio: 1299990,
    imagen: '/img/ROG-Strix-G16.jpg',
    resumen: 'Portátil gamer con GPU NVIDIA RTX y pantalla de 165 Hz.',
    descripcion:
      'La serie ROG Strix de ASUS combina portabilidad y potencia con gráficas NVIDIA RTX y procesadores Intel de última generación.',
    specs: [
      'Intel Core i7 de 13ª generación',
      'GPU NVIDIA GeForce RTX 4060 8GB',
      '16 GB RAM DDR5 ampliable',
      'SSD NVMe de 1 TB',
      'Pantalla 16" QHD 165 Hz'
    ],
    incluye: [
      'Cargador oficial de 240 W',
      'Mouse gamer ASUS',
      'Licencia Windows 11 Home'
    ],
    relacionados: ['playstation-5', 'monitor-aoc-curvo', 'silla-secretlab']
  },
  {
    slug: 'silla-secretlab',
    nombre: 'Silla Gamer Secretlab Titan',
    categoria: 'Sillas Gamers',
    precio: 349990,
    imagen: '/img/1689194af682e4a6eba3e59a9fcd074c.png',
    resumen: 'Silla profesional con espuma fría y soporte lumbar ajustable.',
    descripcion:
      'Secretlab Titan está pensada para sesiones intensas con soporte lumbar integrado, reclinación 165° y materiales premium resistentes.',
    specs: [
      'Reclinación hasta 165° con bloqueo',
      'Pistón de clase 4 certificado',
      'Espuma fría moldeada',
      'Soporte lumbar ajustable 4D',
      'Capacidad hasta 130 kg'
    ],
    incluye: ['Cojín magnético para cabeza', 'Kit de armado', 'Garantía 3 años'],
    relacionados: ['playstation-5', 'xbox-series-s', 'pc-gamer-asus-rog']
  },
  {
    slug: 'mouse-logitech-g502',
    nombre: 'Mouse Logitech G502 HERO',
    categoria: 'Mouse',
    precio: 49990,
    imagen: '/img/MouseLogitech.png.jpg',
    resumen: 'Sensor HERO 25K y 11 botones programables para máxima precisión.',
    descripcion:
      'El Logitech G502 HERO es uno de los mouse más populares gracias a su sensor HERO 25K, pesos ajustables y software G HUB.',
    specs: [
      'Sensor HERO 25K con 25 600 DPI',
      '11 botones programables',
      'Pesos ajustables incluidos',
      'Sistema LIGHTSYNC RGB',
      'Cable trenzado resistente'
    ],
    incluye: [
      'Set de pesos ajustables',
      'Manual rápido',
      'Garantía 2 años'
    ],
    relacionados: ['mousepad-razer-goliathus', 'teclado-kurama', 'auriculares-hyperx']
  },
  {
    slug: 'auriculares-hyperx',
    nombre: 'Auriculares HyperX Cloud II',
    categoria: 'Accesorios',
    precio: 79990,
    imagen: '/img/Proyecto Quitar fondo.png.jpg',
    resumen: 'Sonido 7.1 virtual, micrófono desmontable y almohadillas memory foam.',
    descripcion:
      'HyperX Cloud II es el estándar de la comunidad gamer: fabricado en aluminio, sonido envolvente y gran comodidad para largas sesiones.',
    specs: [
      'Sonido 7.1 virtual con control USB',
      'Drivers de 53 mm',
      'Micrófono desmontable con cancelación',
      'Estructura de aluminio resistente',
      'Compatibles con PC, PlayStation y Xbox'
    ],
    incluye: [
      'Control de audio USB',
      'Set de almohadillas extra',
      'Bolsa de transporte'
    ],
    relacionados: ['mouse-logitech-g502', 'mousepad-razer-goliathus', 'playstation-5']
  },
  {
    slug: 'xbox-series-s',
    nombre: 'Xbox Series S',
    categoria: 'Consolas',
    precio: 310000,
    imagen: '/img/61QKAlzPSfL._UF1000,1000_QL80_.png',
    resumen: 'Consola next-gen totalmente digital con 512 GB SSD.',
    descripcion:
      'Xbox Series S es la consola más compacta y silenciosa de Microsoft, perfecta para Game Pass y juegos en 1440p a 120 FPS.',
    specs: [
      'CPU AMD Zen 2 de 8 núcleos',
      'GPU RDNA 2 con 4 TFLOPs',
      '512 GB SSD NVMe',
      'Salida 1440p hasta 120 FPS',
      'Soporte Dolby Atmos y Dolby Vision'
    ],
    incluye: [
      'Control inalámbrico Xbox Series blanco',
      'Cable HDMI de ultra velocidad',
      'Prueba Game Pass Ultimate (14 días)'
    ],
    relacionados: ['playstation-5', 'control-xbox-series-x', 'monitor-aoc-curvo']
  },
  {
    slug: 'teclado-kurama',
    nombre: 'Teclado Mecánico Kurama',
    categoria: 'Teclado',
    precio: 44000,
    imagen: '/img/71FSIp+tDNL._AC_SL1500_.png.jpg',
    resumen: 'Switches red, iluminación RGB y estructura metálica.',
    descripcion:
      'Kurama combina switches lineales red con iluminación RGB y placa metálica para brindar respuesta y durabilidad.',
    specs: [
      'Switches mecánicos red lineales',
      'Iluminación RGB direccionable',
      'Cable USB desmontable',
      'Construcción metálica',
      'Incluye software de macros'
    ],
    incluye: ['Extractor de keycaps', 'Keycaps extra', 'Manual en español'],
    relacionados: ['mouse-logitech-g502', 'mousepad-razer-goliathus', 'pc-gamer-asus-rog']
  },
  {
    slug: 'monitor-aoc-curvo',
    nombre: 'Monitor AOC Curvo 27" 180 Hz',
    categoria: 'Monitores',
    precio: 180000,
    imagen: '/img/shopping.png',
    resumen: 'Panel VA curvo 1500R con 1 ms de respuesta y FreeSync.',
    descripcion:
      'El monitor curvo AOC 27" entrega inmersión total gracias a su curvatura 1500R, tasa de refresco 180 Hz y 1 ms MPRT.',
    specs: [
      'Resolución 1920 x 1080 Full HD',
      'Tasa de refresco 180 Hz',
      '1 ms MPRT',
      'Tecnología AMD FreeSync Premium',
      'Soporte ajustable en inclinación'
    ],
    incluye: ['Cable DisplayPort', 'Cable HDMI', 'Kit de montaje VESA'],
    relacionados: ['pc-gamer-asus-rog', 'xbox-series-s', 'mouse-logitech-g502']
  },
  {
    slug: 'mousepad-razer-goliathus',
    nombre: 'Mousepad Razer Goliathus Extended',
    categoria: 'Mousepad',
    precio: 29990,
    imagen: '/img/Mousepad.png.jpg',
    resumen: 'Superficie optimizada para control y velocidad con base antideslizante.',
    descripcion:
      'Razer Goliathus Extended cubre teclado y mouse con superficie texturizada para control preciso y base de goma anti deslizante.',
    specs: [
      'Dimensiones 920 x 294 mm',
      'Base de goma antideslizante',
      'Superficie microtexturizada',
      'Bordes cosidos para mayor durabilidad',
      'Compatible con sensores ópticos y láser'
    ],
    incluye: ['Bolsa de transporte reutilizable'],
    relacionados: ['mouse-logitech-g502', 'teclado-kurama', 'pc-gamer-asus-rog']
  },
  {
    slug: 'polera-level-up',
    nombre: "Polera Gamer 'Level-Up'",
    categoria: 'Poleras Personalizadas',
    precio: 14990,
    imagen: '/img/polera_gamer_life.png.jpg',
    resumen: 'Algodón premium con estampado glow in the dark edición Level-Up.',
    descripcion:
      'Nuestra polera Level-Up está confeccionada en algodón premium 100% y cuenta con estampado glow in the dark para destacar en eventos LAN.',
    specs: [
      'Algodón 100% 200 g/m²',
      'Estampado glow in the dark',
      'Corte unisex',
      'Disponible de S a XXL',
      'Lavado apto en lavadora'
    ],
    incluye: ['Packaging coleccionable Level-Up'],
    relacionados: ['mousepad-razer-goliathus', 'auriculares-hyperx', 'silla-secretlab']
  },
  {
    slug: 'control-xbox-series-x',
    nombre: 'Control Xbox Series X',
    categoria: 'Accesorios',
    precio: 59990,
    imagen: '/img/19311564-964f-4c51-ae32-cd1f4a31e006.png.jpg',
    resumen: 'Control oficial con agarre texturizado y botón Share dedicado.',
    descripcion:
      'El control inalámbrico Xbox Series incorpora texturas antideslizantes, gatillos híbridos y botón Share para capturar clips al instante.',
    specs: [
      'Reconexión rápida con Bluetooth LE',
      'Puerto USB-C y jack 3.5 mm',
      'Agarre antideslizante en gatillos',
      'Compatibilidad multiplataforma',
      'Hasta 40 horas de autonomía'
    ],
    incluye: ['Cable USB-C', 'Pilas AA (2)'],
    relacionados: ['xbox-series-s', 'playstation-5', 'auriculares-hyperx']
  },
  {
    slug: 'carcassonne',
    nombre: 'Carcassonne',
    categoria: 'Juegos de Mesa',
    precio: 24990,
    imagen: '/img/juegodemesa.jpg',
    resumen: 'Juego de colocación de losetas para toda la familia. Versión en español.',
    descripcion:
      'Carcassonne es un clásico de táctica y construcción de caminos donde cada partida es diferente. Ideal para 2 a 5 jugadores.',
    specs: [
      'Edad recomendada: 7+',
      'Duración: 35 minutos aprox.',
      'Incluye expansión del río',
      'Versión en español Latinoamérica',
      'Componentes de cartón reforzado'
    ],
    incluye: ['72 losetas de territorio', '5 meeples por jugador', 'Tablero marcador de puntos'],
    relacionados: ['catan', 'polera-level-up', 'playstation-5']
  },
  {
    slug: 'catan',
    nombre: 'Catan',
    categoria: 'Juegos de Mesa',
    precio: 34990,
    imagen: '/img/Adobe Express - file.png.jpg',
    resumen: 'El juego de comercio y construcción más premiado del mundo.',
    descripcion:
      'Catan enfrenta a los jugadores a colonizar una isla mediante comercio, estrategia y construcción. Perfecto para noches de juego.',
    specs: [
      'Edad recomendada: 10+',
      'Duración: 75 minutos aprox.',
      '3 a 4 jugadores',
      'Edición en español',
      'Incluye dados personalizados'
    ],
    incluye: ['19 hexágonos de terreno', '95 cartas de recursos', '4 tableros de puntos'],
    relacionados: ['carcassonne', 'polera-level-up', 'xbox-series-s']
  }
];

export const findProduct = (slug) => products.find((item) => item.slug === slug);

export const featuredProducts = products.slice(0, 4);
