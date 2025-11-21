/proyecto_pizzeria/
backend/
├── 📂 config/
│   └── ✅ db.js                // Conexión a MySQL (Ya funciona).
│
├── 📂 middleware/
│   └── ✅ auth.js              // Seguridad: Verifica Token y ahora ROL (Admin/Cajero).
│
├── 📂 models/                  // Consultas SQL
│   ├── ✅ user.model.js        // Buscar usuarios y roles (Ya funciona).
│   ├── 🚧 product.model.js     // (TÚ) Consultas para obtener pizzas y categorías.
│   └── 🆕 order.model.js       // (Persona 4) Consultas para crear pedidos.
│
├── 📂 controllers/             // Lógica de control
│   ├── ✅ auth.controller.js   // Login y generación de Token (Ya funciona).
│   ├── 🚧 product.controller.js// (TÚ) Enviar el JSON del menú al cliente.
│   └── 🆕 order.controller.js  // (Persona 4) Recibir y procesar pedidos.
│
├── 📂 routes/                  // Definición de URLs
│   ├── ✅ auth.routes.js       // POST /api/auth/login (Ya funciona).
│   ├── ✅ pos.routes.js        // Rutas protegidas para el Cajero (Ya probaste el 403).
│   └── 🚧 client.routes.js     // (TÚ) Rutas públicas (GET /api/products).
│
├── ✅ server.js                // Archivo principal (Ya configurado, faltan conectar nuevas rutas).
├── ✅ package.json             // Dependencias instaladas.
└── ✅ _createHash.js           // Herramienta útil para crear contraseñas.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

frontend/
│
├── 🆕 index.html           // (TÚ) El MAESTRO. Reemplaza a login.html.
│                           // Es el marco vacío que carga Vue y los estilos.
│
├── 💀 login.html           // (BORRAR) Ya no lo necesitas, su código se muda a LoginView.js
├── 💀 login.js             // (BORRAR) Se muda a LoginView.js
│
├── 📂 css/                 // Estilos
│   ├── 🆕 style.css        // (TÚ) Estilos globales (fuentes, reset).
│   ├── 🆕 client.css       // (Persona 2) Estilo Burger King (Grid, colores).
│   └── 🆕 pos.css          // (Persona 3) Estilo Sistema de Cajero (Tablas, botones).
│
├── 📂 js/
│   ├── 🚧 app.js           // (TÚ) El CEREBRO de Vue.
│   │                       // Importa las vistas y decide cuál mostrar según el login.
│   │
│   └── 📂 views/           // LOS COMPONENTES (Aquí trabaja el equipo sin estorbarse)
│       ├── 🚧 LoginView.js   // (TÚ) Migra aquí la lógica que tenías en login.js.
│       ├── 🆕 ClientView.js  // (Persona 2) El Menú estilo Burger King.
│       └── 🆕 PosView.js     // (Persona 3) El Dashboard del Cajero.
│
└── 📂 assets/              // Imágenes
    ├── logo.png
    ├── pizza_pepperoni.png
    └── ... (y todas las imagenes que usaremos)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

database/
└── ✅ schema.sql           // Tu script de creación de tablas (Ya está en MySQL).