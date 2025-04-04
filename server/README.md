# 🔧Configuracion Servidor

## 🚀Iniciar Servidor

Iniciar servidor.
-node server
*Desde la carpeta del servidor.

Iniciar sevidor reiniiciandolo cuando hay cambios en algun archivo.
-npx nodemon server.js
*Desde la carpeta del servidor.

# 🔎Consultas al Servidor

## 👤Usuarios

### 📥GET

--Todos los usuarios.
http://localhost:3000/api/users

--Todos los usuario de un espacio.
http://localhost:3000/api/usersSpace/:id

--Usuario filtrando mendiante el parametro que especifiques.
http://localhost:3000/api/usersFilter/:param/:value

### 📤POST

--Insertar nuevo usuario.
http://localhost:3000/api/user

### ♻️PUT

--Actualizar usuario especifico.
http://localhost:3000/api/user/:userId

--Actualizar foto de perfil de usuario
http://localhost:3000/api/userPhoto/:userId

### 🧨DELETE

--Borrar usuario especifico.
http://localhost:3000/api/user/:userId


## 🗃️Espacios

### 📥GET

--Espacio en base de la ID.
http://localhost:3000/api/usersSpace/:spaceId'

--Espacios de un usuario.
http://localhost:3000/api/userSpace/:userId'

### 📤POST

--Insertar nuevo espacio.
http://localhost:3000/api/space

### ♻️PUT

--Actualizar nombre de un espacio.
http://localhost:3000/api/upadateSpaceName/:spaceId

--Actualizar plan de un espacio.
http://localhost:3000/api/upadateSpacePlan/:spaceId

--Actualizar foto de logo de un espacio.
http://localhost:3000/api/upadateSpaceLogo/:userId

### 🧨DELETE
-Eliminar un espacio especifico.
http://localhost:3000/api/deleteSpace/:spaceId


## 💽Modulos

### 📥GET

--Todos los modulos disponibles.
http://localhost:3000/api/modules



## 📃Projectos(PM)

### 📥GET

--Todos los projectos de un modulo
http://localhost:3000/api/projects/:moduleId

--Projecto en base a su ID.
http://localhost:3000/api/project/:projectId

--Todos los projectos de un usuario.
http://localhost:3000/api/userProjects/:id

--Todos los usuarios de un proyecto
http://localhost:3000/api/projectUsers/:projectId


## 📑Tareas(PM)

### 📥GET

--Tarea mediante una ID.
http://localhost:3000/api/task/:taskId

--Todas las tareas de un projecto.
http://localhost:3000/api/projectTask/:projectId

--Todas las tareas de un projecto y un usuario especifico.
http://localhost:3000/api/userTask/:userId/:projectId


## 📑Tareas(PM)

### 📥GET

--Subtarea mediante una ID.
http://localhost:3000/api/subtask/:subtaskId

--Todas las subtareas de una tarea.
http://localhost:3000/api/taskSubtask/:taskId

--Todas las subtareas de una tarea y un usuario especifico.
http://localhost:3000/api/userSubtask/:userId/:taskId


## 📑Documents(PM)

### 📥GET

--Documentos de un projecto,tarea o subtarea especifico.
http://localhost:3000/api/PmDocument/:param/:id