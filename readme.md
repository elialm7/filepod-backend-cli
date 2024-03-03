

# filepod-backend-cli

filepod-backend-cli es una herramienta de línea de comandos (CLI) que proporciona a un administrador un terminal de línea de comandos para escuchar los eventos emitidos por el backend de FilePod (https://github.com/elialm7/filepod-backend-node). Esto permite al administrador monitorear lo que sucede en el backend desde cualquier lugar, simplemente conociendo el token de autorización.

## Características

- Escucha los eventos emitidos por el backend de FilePod.
- Permite a los administradores realizar diversas acciones a través de un entorno de línea de comandos interactivo (REPL), como verificar el estado del sistema, entre otras.


### Comandos

- **.status**: Muestra el estado actual del sistema, proporcionando información relevante como la cantidad de archivos almacenados en memoria.

- **.clean**: Limpia de la memoria los archivos que han sido subidos.

- **.upload=<filename>**: Permite al usuario cargar un archivo al sistema especificando el nombre del archivo que desea subir. Este comando inicia el proceso de carga del archivo al servidor.

- **.delete=<id>**: Elimina un archivo específico del sistema utilizando su identificador único (ID). Al proporcionar el ID del archivo que se desea eliminar, el sistema procederá a eliminarlo de manera segura y permanente.

- **.exit**: Cierra la sesión actual y sale del programa o la interfaz de línea de comandos, regresando al entorno anterior o cerrando la aplicación por completo, según corresponda.

## Contribuir

¡Siéntete libre de contribuir a este proyecto! Puedes enviar problemas (issues) y solicitudes de extracción (pull requests) para mejorar la funcionalidad de la herramienta.

