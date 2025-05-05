# Client Gateway

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

Client Gateway es un microservicio desarrollado con NestJS que actúa como puerta de enlace para gestionar las comunicaciones entre los clientes y otros microservicios del sistema.

## Características

- Desarrollado con NestJS
- Arquitectura de microservicios
- Validación de datos con Zod
- Soporte para TypeScript
- Testing con Jest
- Linting y formateo de código con ESLint y Prettier

## Requisitos Previos

- Node.js (versión recomendada: >=18)
- pnpm (gestor de paquetes)
- NestJS CLI

## Instalación

```bash
# Clonar el repositorio
$ git clone https://github.com/Nest-Microservices-PabloH/client-gateway.git

# Navegar al directorio del proyecto
$ cd client-gateway

# Instalar dependencias
$ pnpm install

# Configurar variables de entorno
$ cp .env.example .env
```

## Ejecución

```bash
# Desarrollo
$ pnpm start:dev

# Producción
$ pnpm build
$ pnpm start:prod
```

## Estructura del Proyecto

```
client-gateway/
├── src/                    # Código fuente
├── test/                   # Tests
├── dist/                   # Código compilado
├── node_modules/           # Dependencias
├── .gitignore             # Archivos ignorados por git
├── .prettierrc            # Configuración de Prettier
├── eslint.config.mjs      # Configuración de ESLint
├── nest-cli.json          # Configuración de NestJS
├── package.json           # Dependencias y scripts
├── pnpm-lock.yaml         # Lock file de pnpm
├── pnpm-workspace.yaml    # Configuración de workspace
├── tsconfig.json          # Configuración de TypeScript
└── tsconfig.build.json    # Configuración de TypeScript para build
```

## Tecnologías Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)


