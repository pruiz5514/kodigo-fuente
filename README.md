# Kódigo Fuente — Módulo de Gestión de Promociones

Aplicación web para registrar y gestionar promociones de productos y categorías, controlando su estado (`Programado` → `Activo` → `Finalizado`) y su vigencia.

Frontend en React + Vite, backend en Node/Express con PostgreSQL vía Sequelize. El detalle de por qué se eligió cada cosa está en [`DECISIONS.md`](DECISIONS.md).

## Cómo levantarlo

Necesitas Docker y Docker Compose instalados. Con eso:

1. Clona el repo y copia el archivo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

   Completa los valores de `.env` (usuario, contraseña y nombre de la base de datos, puertos, etc.).

2. Levanta todo el stack:

   ```bash
   docker compose up --build
   ```

   Esto levanta el frontend, el backend y Postgres. Cuando termine vas a tener:
   - Frontend en http://localhost:5173
   - API en http://localhost:8000/api
   - Health check en http://localhost:8000/health

3. La base de datos se crea sola al arrancar el backend, pero queda vacía. Si quieres datos de ejemplo (categorías, productos, tipos de descuento):

   ```bash
   cd backend
   npm install
   npm run db:seed
   ```

Para bajar todo: `docker compose down` (o `docker compose down -v` si además quieres borrar los datos de Postgres).

## CI/CD

Hay un workflow de GitHub Actions (`.github/workflows/ci.yml`) que corre en cada push a `main`: lint → tests → build de las imágenes Docker → smoke test (levanta el stack completo y verifica que `/health` responda 200). El smoke test necesita los mismos nombres de variables del `.env.example` configurados como GitHub Secrets del repo; si falta alguno, el pipeline falla y te dice cuál.
