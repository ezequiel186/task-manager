# **CONTENIDO COMPLETO DEL README.md DEL FRONTEND**

Crea el archivo `task-manager-frontend/README.md` y pega esto:

```markdown
# Task Manager - Frontend

Aplicación web desarrollada con React + Vite para gestionar tareas personales.

# Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **CSS3** - Estilos personalizados

# Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Backend corriendo en `http://localhost:3000`

# Instalación

1. **Entrar a la carpeta del frontend:**
```bash
cd frontend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

4. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

# Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── PrivateRoute.jsx  # Protección de rutas privadas
├── context/             # Context API de React
│   └── AuthContext.jsx   # Contexto de autenticación
├── pages/               # Páginas de la aplicación
│   ├── Login.jsx         # Página de inicio de sesión
│   ├── Register.jsx      # Página de registro
│   ├── Tasks.jsx         # Dashboard principal
│   ├── Auth.css          # Estilos de autenticación
│   └── Tasks.css         # Estilos del dashboard
├── services/            # Servicios y API
│   └── api.js           # Configuración de Axios
├── App.jsx              # Componente principal
├── App.css              # Estilos globales
├── index.css            # Estilos base
└── main.jsx             # Punto de entrada
```

# Funcionalidades

# **Autenticación**
- Registro de nuevos usuarios
- Inicio de sesión
- Persistencia de sesión con localStorage
- Cierre de sesión
- Protección de rutas privadas

# **Gestión de Categorías**
- Crear categorías personalizadas
- Visualizar lista de categorías
- Asignar categorías a tareas

# **Gestión de Tareas**
- Crear tareas con título, descripción y categoría
- Listar todas las tareas
- Editar tareas existentes
- Eliminar tareas
- Marcar tareas como completadas/pendientes
- Filtrar tareas por estado
- Visualización en tarjetas (cards)

# **Exportación**
- Exportar tareas a formato CSV
- Descarga automática del archivo

# **Diseño**
- Interfaz responsive (mobile-friendly)
- Animaciones y transiciones suaves
- Feedback visual de acciones
- Estados de carga

# Flujo de Autenticación

1. El usuario se registra o inicia sesión
2. El backend devuelve un token JWT
3. El token se guarda en `localStorage`
4. Todas las peticiones incluyen el token en los headers
5. Las rutas privadas verifican el token antes de renderizar

# Páginas y Rutas

| Ruta | Componente | Descripción | Protegida |
|------|-----------|-------------|-----------|
| `/` | Redirect | Redirige a `/tasks` | Sí |
| `/login` | Login | Inicio de sesión | No |
| `/register` | Register | Registro de usuarios | No |
| `/tasks` | Tasks | Dashboard principal | Sí |

# Componentes Principales

# **AuthContext**
Maneja el estado global de autenticación:
- `user` - Datos del usuario actual
- `login(email, password)` - Función de login
- `register(name, email, password)` - Función de registro
- `logout()` - Función de cierre de sesión
- `loading` - Estado de carga

# **PrivateRoute**
Componente que protege rutas privadas. Redirige a `/login` si no hay usuario autenticado.

# **Tasks**
Dashboard principal con todas las funcionalidades:
- Listado de tareas en formato grid
- Formularios para crear/editar tareas y categorías
- Botones de acción (editar, eliminar, completar)
- Exportación a CSV

# Estilos

# **Paleta de Colores**
- **Primario:** `#667eea` (Púrpura)
- **Secundario:** `#764ba2` (Púrpura oscuro)
- **Éxito:** `#66bb6a` (Verde)
- **Advertencia:** `#ffa726` (Naranja)
- **Peligro:** `#f44336` (Rojo)
- **Neutro:** `#e0e0e0` (Gris claro)

# **Diseño Responsive**
- Desktop: Grid de 3 columnas (mínimo 300px)
- Tablet: Grid de 2 columnas
- Mobile: Grid de 1 columna

# Dependencias Principales

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "vite": "^7.x"
}
```

# Scripts Disponibles

```bash
# Desarrollo (con hot-reload)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

# Flujo de Trabajo

# **1. Registro de Usuario**
```
Usuario completa formulario
    ↓
POST /api/auth/register
    ↓
Redirige a /login
```

# **2. Inicio de Sesión**
```
Usuario ingresa credenciales
    ↓
POST /api/auth/login
    ↓
Guarda token y datos en localStorage
    ↓
Redirige a /tasks
```

# **3. Crear Tarea**
```
Usuario completa formulario
    ↓
POST /api/tasks (con token JWT)
    ↓
Actualiza lista de tareas
    ↓
Cierra formulario
```

# **4. Exportar CSV**
```
Usuario hace clic en "Exportar CSV"
    ↓
GET /api/tasks/export (con token JWT)
    ↓
Descarga archivo mis-tareas.csv
```

# Solución de Problemas

# **Error: "Network Error" al hacer peticiones**
- Verifica que el backend esté corriendo en `http://localhost:3000`
- Revisa la variable `VITE_API_URL` en el archivo `.env`
- Asegúrate de que CORS esté habilitado en el backend

# **Error: "Token inválido" o sesión expirada**
- Cierra sesión y vuelve a iniciar sesión
- El token JWT expira en 7 días
- Verifica que el `JWT_SECRET` del backend sea el mismo

# **Las imágenes o estilos no cargan después del build**
- Ejecuta `npm run build` nuevamente
- Verifica que las rutas sean relativas en el código

# **La página se recarga infinitamente**
- Verifica que el `AuthContext` esté correctamente configurado
- Revisa que `localStorage` tenga los datos correctos

# Buenas Prácticas Implementadas

- Separación de responsabilidades (components, pages, services)
- Context API para gestión de estado global
- Interceptores de Axios para agregar tokens automáticamente
- Rutas protegidas con `PrivateRoute`
- Validación de formularios en cliente
- Feedback visual de acciones (alertas, confirmaciones)
- Código limpio y comentado
- Diseño responsive mobile-first

# Despliegue

# **Build para producción:**
```bash
npm run build
```

Esto genera una carpeta `dist/` con los archivos optimizados listos para desplegar en:
- Vercel
- Netlify
- GitHub Pages
- Cualquier servidor estático

# **Variables de entorno en producción:**
Asegúrate de configurar `VITE_API_URL` con la URL de tu API en producción:

```env
VITE_API_URL=https://tu-api.com/api
```

# Notas Adicionales

- Los tokens JWT se almacenan en `localStorage` (no en cookies)
- La aplicación funciona completamente en cliente (SPA)
- No hay SSR (Server-Side Rendering)
- Compatible con todos los navegadores modernos

# Créditos

Este proyecto fue desarrollado como parte del **Trabajo Práctico Integrador Final** de la materia **Programación IV** de la Universidad Tecnológica Nacional (UTN).

# **Integrantes del grupo:**
- [Nombre del integrante 1]
- [Nombre del integrante 2]

# **Profesor:**
- [Nombre del profesor]

# Licencia

Este proyecto es de uso académico.
```

---

# **Ahora crea también el archivo `.env.example`**

# **Backend: `task-manager-backend/.env.example`**

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=taskmanager
JWT_SECRET=mi_secreto_super_seguro_123
```

# **Frontend: `task-manager-frontend/.env.example`**

```env
VITE_API_URL=http://localhost:3000/api