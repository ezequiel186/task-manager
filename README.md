# CONTENIDO DEL README.md PRINCIPAL

Crea el archivo `task-manager/README.md` en la carpeta raíz y pega esto:

# Task Manager - Sistema de Gestión de Tareas

Sistema completo de gestión de tareas personales desarrollado como Trabajo Práctico Integrador Final de Programación IV (UTN).

# Descripción General

Task Manager es una aplicación web full-stack que permite a los usuarios gestionar sus tareas de forma organizada mediante categorías, con funcionalidades de creación, edición, eliminación, marcado de completado y exportación a CSV.

# Arquitectura del Proyecto

```

task-manager/
├── backend/                 # API REST con NestJS
│   ├── src/
│   │   ├── auth/           # Autenticación JWT
│   │   ├── users/          # Gestión de usuarios
│   │   ├── categories/     # Gestión de categorías
│   │   └── tasks/          # Gestión de tareas
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
└── frontend/               # SPA con React + Vite
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── context/        # Context API
│   ├── pages/          # Páginas de la aplicación
│   └── services/       # Cliente API
├── .env.example
├── package.json
└── README.md

```

# Stack Tecnológico

# Backend
- NestJS - Framework de Node.js con arquitectura modular
- TypeORM - ORM para gestión de base de datos
- MySQL - Base de datos relacional
- JWT - Autenticación con tokens
- Swagger - Documentación automática de API
- bcrypt - Encriptación de contraseñas
- class-validator - Validación de DTOs

# Frontend
- React 18 - Biblioteca de UI
- Vite - Build tool ultrarrápido
- React Router DOM - Enrutamiento del lado del cliente
- Axios - Cliente HTTP con interceptores
- Context API - Gestión de estado global
- CSS3 - Estilos personalizados con animaciones

# Modelo de Datos

# Diagrama de Relaciones

```

┌─────────────┐
│    User     │
├─────────────┤
│ id          │──┐
│ email       │  │
│ password    │  │
│ name        │  │
└─────────────┘  │
│
┌────────┴────────┐
│                 │
▼                 ▼
┌─────────────┐   ┌─────────────┐
│  Category   │   │    Task     │
├─────────────┤   ├─────────────┤
│ id          │◄──│ id          │
│ name        │   │ title       │
│ userId      │   │ description │
└─────────────┘   │ completed   │
│ userId      │
│ categoryId  │
└─────────────┘

```

# Entidades

**User:**
- Almacena información de los usuarios registrados  
- Relación 1:N con Category y Task

**Category:**
- Categorías personalizadas por usuario  
- Relación 1:N con Task

**Task:**
- Tareas con título, descripción y estado  
- Pertenece a un User y opcionalmente a una Category

# Funcionalidades Implementadas

# Autenticación y Seguridad
- Registro de usuarios con validación de email único  
- Inicio de sesión con JWT  
- Contraseñas hasheadas con bcrypt  
- Protección de rutas con Guards  
- Tokens con expiración de 7 días  
- Interceptores automáticos para incluir token en peticiones

# Gestión de Categorías
- Crear categorías personalizadas  
- Listar categorías del usuario  
- Eliminar categorías  
- Asignar categorías a tareas

# Gestión de Tareas
- CRUD completo de tareas  
- Título, descripción y categoría  
- Estado: pendiente/completada  
- Filtrado por usuario (cada usuario ve solo sus tareas)  
- Edición inline  
- Confirmación antes de eliminar

# Exportación
- Exportar tareas a CSV  
- Descarga automática del archivo  
- Formato: Título, Descripción, Estado, Categoría

# Interfaz de Usuario
- Diseño responsive (mobile, tablet, desktop)  
- Animaciones y transiciones suaves  
- Feedback visual de acciones  
- Formularios con validación en tiempo real  
- Grid de tarjetas con información organizada

# Flujo de Negocio

# 1. Registro e Inicio de Sesión
```

Usuario nuevo → Registro → Login → Dashboard
Usuario existente → Login → Dashboard

```

# 2. Gestión de Tareas
```

Dashboard → Nueva Tarea → Formulario → Crear
Dashboard → Editar Tarea → Formulario → Actualizar
Dashboard → Marcar Completada → PATCH → Actualizar vista
Dashboard → Eliminar → Confirmar → DELETE → Actualizar vista

```

# 3. Exportación
```

Dashboard → Exportar CSV → GET /tasks/export → Descarga archivo

````

# Requisitos del Sistema

# Software Necesario
- Node.js 18 o superior  
- MySQL 8.0 o superior  
- npm o yarn  
- Git

# Requisitos Mínimos de Hardware
- 4 GB de RAM  
- 2 GB de espacio en disco  
- Procesador dual-core

# Instalación y Configuración

# 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd task-manager
````

# 2. Configurar Backend

```bash
cd backend

npm install

cp .env.example .env

mysql -u root -p
CREATE DATABASE taskmanager;
EXIT;

npm run start:dev
```

El backend estará en: `http://localhost:3000`
Swagger: `http://localhost:3000/api/docs`

# 3. Configurar Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```

El frontend estará en: `http://localhost:5173`

# Uso de la Aplicación

# Primera Vez

1. Abre `http://localhost:5173`
2. Haz clic en "Regístrate aquí"
3. Completa el formulario de registro
4. Inicia sesión con tus credenciales

# Crear Categorías

1. En el dashboard, haz clic en "Nueva Categoría"
2. Ingresa el nombre (ej: "Trabajo", "Personal", "Estudios")
3. Haz clic en "Crear"

# Crear Tareas

1. Haz clic en "Nueva Tarea"
2. Completa:

   * **Título:** Nombre de la tarea
   * **Descripción:** Detalles opcionales
   * **Categoría:** Selecciona una o deja en blanco
3. Haz clic en "Crear"

# Gestionar Tareas

* **Completar:** Clic en "Pendiente" → Cambia a "Completada"
* **Editar:** Clic en "Editar" → Modifica → "Actualizar"
* **Eliminar:** Clic en "Eliminar" → Confirmar

# Exportar

1. Haz clic en "Exportar CSV"
2. Se descargará automáticamente `mis-tareas.csv`

# Reglas de Negocio Implementadas

1. **Aislamiento de Datos:**
   Cada usuario solo puede ver y gestionar sus propias tareas y categorías
   No es posible acceder a datos de otros usuarios

2. **Validaciones:**
   Email debe ser único
   Contraseña mínimo 6 caracteres
   Título obligatorio
   Descripción opcional

3. **Categorías:**
   Una tarea puede no tener categoría
   Al eliminar una categoría, sus tareas quedan sin categoría

4. **Autenticación:**
   Las rutas requieren autenticación
   Los tokens expiran en 7 días
   Al cerrar sesión, se elimina el token del cliente

# Comandos Útiles

# Backend

```bash
npm run start:dev
npm run build
npm run start:prod
npm run test
npm run start:dev | bunyan
```

# Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

# Documentación Adicional

* [Documentación del Backend](./backend/README.md)
* [Documentación del Frontend](./frontend/README.md)
* [Swagger API Docs](http://localhost:3000/api/docs)

# Solución de Problemas Comunes

# Backend no conecta a MySQL

```bash
sudo service mysql status
```

# Frontend no se conecta al Backend

* Verifica que el backend esté corriendo
* Revisa el archivo `.env`
* Abre la consola del navegador (F12) y busca errores

# Error "Port already in use"

```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

# Tokens expirados

* Cierra sesión y vuelve a iniciar
* Si persiste, limpia `localStorage`

# Alcance del Proyecto (Grupo de 2)

Cumple con:

* Mínimo 3 entidades (User, Category, Task)
* CRUD completo con validaciones
* Filtros/búsqueda
* Exportación a CSV
* Rol único: user
* Autenticación JWT
* Documentación con Swagger y README
* Diseño responsive

# Información Académica

# Materia

Programación IV

# Institución

Universidad Tecnológica Nacional (UTN)

# Año

2024

# Integrantes del Grupo

* [Tourn Ezequiel] - [tourne75@gmail.com]

# Profesor

* [Alexis Bianchi]

# Estructura de Entrega

```
task-manager/
├── backend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── README.md
└── DECISIONES_TECNICAS.md
```

# Enlaces Útiles

* [NestJS Documentation](https://docs.nestjs.com/)
* [React Documentation](https://react.dev/)
* [TypeORM Documentation](https://typeorm.io/)
* [Vite Documentation](https://vitejs.dev/)