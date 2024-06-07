# Roommates

Este proyecto consiste en crear un servidor con Node.js que sirva una interfaz HTML para el registro de gastos entre roommates. Además, se debe proporcionar una API REST que permita realizar operaciones como almacenar nuevos roommates, registrar gastos, modificar y eliminar información de gastos, entre otras funcionalidades.

## Descripción

1. Ocupar el módulo File System para la manipulación de archivos alojados en el servidor.
2. Capturar los errores para condicionar el código a través del manejo de excepciones.
3. Crear una ruta POST /roommate en el servidor que ejecute una función asíncrona importada de un archivo externo al del servidor (la función debe ser un módulo) para almacenar nuevos roommates con la API randomuser. El objeto correspondiente al usuario que se almacenará debe tener un id generado con el paquete UUID.
4. Crear una API REST que contenga las siguientes rutas:
   - GET /gastos: Devuelve todos los gastos almacenados en el archivo gastos.json.
   - POST /gasto: Recibe el payload con los datos del gasto y los almacena en un archivo JSON (gastos.json).
   - PUT /gasto: Recibe el payload de la consulta y modifica los datos almacenados en el servidor (gastos.json).
   - DELETE /gasto: Recibe el id del gasto usando las Query Strings y lo elimina del historial de gastos (gastos.json).
   - GET /roommates: Devuelve todos los roommates almacenados en el servidor (roommates.json). Se debe considerar recalcular y actualizar las cuentas de los roommates luego de este proceso.

5. Devolver los códigos de estado HTTP correspondientes a cada situación.

## Requerimientos



## Pre-requisitos

1. Clonar este repositorio desde tu computador.
2. Abre una terminal y navega hasta el directorio del proyecto con http://localhost:3000.
3. Instala las dependencias ejecutando el siguiente comando:

   npm install Axios, Express, UUID

## Despliegue

Para desplegar este proyecto, ejecuta el servidor con el siguiente comando:

   npm run dev

## Construido con 

- Node.js - Entorno de ejecución de JavaScript.
- Express.js - Framework web para Node.js.

## Autor ✒️

Jorge Leiva