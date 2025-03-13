# Mechanic Diagnosis API

## Descripción

Mechanic Diagnosis API es un servicio backend diseñado para diagnosticar fallas mecánicas en vehículos. Utiliza una arquitectura modular con principios de escalabilidad y mantenibilidad en mente, proporcionando endpoints RESTful para gestionar diagnósticos y registros de vehículos.

## Arquitectura

El sistema está construido con **Node.js**, **express** y **Typescript**, siguiendo un enfoque modular para facilitar la escalabilidad y el mantenimiento del código.

### Estructura del Proyecto

```
/src
├── routes
│   ├── diagnosticos
│   ├── autos
├── models
│   ├── diagnostico
│   ├── auto
├── controllers
│   ├── diagnosticos
│   ├── autos
├── types
│   ├── models
│   ├── routes
├── services
│   ├── openai
└── index.ts
```

### Decisiones Técnicas

1. **Node.js con Express**: Se eligió **Express** como framework ligero y flexible para manejar las solicitudes HTTP de manera eficiente.
2. **TypeScript**: Se utiliza **TypeScript** para mejorar la calidad del código mediante tipado estático, facilitando la detección de errores y mejorando la mantenibilidad.
3. **Base de Datos con MongoDB y Mongoose**: Se optó por **MongoDB**, una base de datos NoSQL escalable, y **Mongoose** para facilitar la manipulación de documentos en la base de datos.
4. **CORS y Body-Parser**: Se incorporan **CORS** para permitir solicitudes desde diferentes dominios y **body-parser** para interpretar correctamente las solicitudes HTTP con datos en JSON.
5. **Variables de Entorno con dotenv**: Se utiliza **dotenv** para gestionar de manera segura las variables de entorno del proyecto.
6. **Integración con OpenAI**: Se incluye la biblioteca **openai** para aprovechar modelos de inteligencia artificial en diagnósticos avanzados.

### Librerías Utilizadas y Justificación

- **express**: Framework minimalista para gestionar las rutas y peticiones HTTP.
- **mongoose**: ORM para interactuar con MongoDB de manera eficiente.
- **body-parser**: Middleware para interpretar datos enviados en el cuerpo de las peticiones.
- **cors**: Permite configurar reglas de acceso para clientes externos a la API.
- **dotenv**: Carga variables de entorno desde un archivo `.env` para evitar exponer datos sensibles en el código.
- **openai**: Se utiliza para integrar funcionalidades de IA en los diagnósticos mecánicos.

## Instalación y Configuración

### Requisitos previos

- Node.js (v18 o superior)
- MongoDB
- Yarn o NPM

### Pasos de instalación

```sh
# Clonar el repositorio
git clone https://github.com/mdaniotti/mechanic-diagnosis-api.git
cd mechanic-diagnosis-api

# Instalar dependencias
yarn install  # o npm install

# Crear archivo de variables de entorno
cp .env.example .env

# Configurar las variables de entorno en .env

# build
npm run build

# Iniciar el servidor de desarrollo
npm run dev
```

## Uso

Una vez iniciado el servidor, la API estará disponible en:

```
http://localhost:8080/
```

## Contribuciones

Si deseas contribuir al proyecto, por favor abre un **issue** o envía un **pull request** con tus mejoras.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.
