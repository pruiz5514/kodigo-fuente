# Decisiones técnicas

## Backend: Node.js + Express

Elegí Node.js con Express porque es el stack con el que tengo más experiencia y conocimiento, así que me permitió avanzar rápido y con confianza en el tiempo que tenía. Además, esta es una aplicación pequeña, con pocas entidades y reglas de negocio, así que la simplicidad de Express es justo lo que se necesita: no tenía sentido meter la estructura más pesada de un framework como Nest o Laravel para un proyecto de este tamaño, hubiera sido complejidad de más sin ningún beneficio real.

## Frontend: React + Vite

Era requisito obligatorio de la prueba. Vite igual ayuda porque da un dev server rápido y una configuración mínima para arrancar un proyecto React + TypeScript sin fricción.

## Estilos: Tailwind CSS

Elegí Tailwind por su facilidad y rapidez.

## Base de datos: PostgreSQL

De las tres opciones permitidas (PostgreSQL, SQL Server o MongoDB) elegí PostgreSQL porque el modelo de datos es claramente relacional: los descuentos se relacionan con categorías, productos y tipos de descuento, con reglas como "debe tener categoría o producto, pero no ambos". Eso encaja mejor con una base relacional que con MongoDB, y ya tenía experiencia usándolo junto con Sequelize como ORM.

## Validaciones: Zod en el frontend, Joi en el backend

Escogí Zod y Joi para hacer todas las validaciones, uno en cada lado. Zod va de la mano con React Hook Form (vía `@hookform/resolvers`) y da feedback inmediato en el formulario sin necesidad de golpear la API, además de integrarse muy bien con TypeScript. Joi lo usé en el backend para no depender de lo que llegue validado (o no) desde el cliente: toda la data se vuelve a validar del lado del servidor antes de tocar la base de datos. No busqué compartir un único schema entre frontend y backend a propósito; son capas distintas y cada una valida con la herramienta que mejor le queda a su entorno.

## Contenedores: Docker + Docker Compose

Todo el proyecto (frontend, backend y Postgres) levanta con un solo `docker compose up`, tal como pedía la prueba. El backend expone `/health` verificando también la conexión a la base de datos, para que el smoke test del pipeline de CI tenga algo real que comprobar.
