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
{ *first_name, *last_name, *email, *pass, private, profile_picture , file_type }

### ♻️PUT

--Actualizar usuario especifico.
http://localhost:3000/api/user/:userId
{ *first_name, *last_name, *email, pass, private }

--Actualizar foto de perfil de usuario
http://localhost:3000/api/userPhoto/:userId
{ image, file_type }

### 🧨DELETE

--Borrar usuario especifico.
http://localhost:3000/api/user/:userId


## 🗃️Espacios

### 📥GET

--Espacio en base de la ID.
http://localhost:3000/api/usersSpace/:spaceId

--Espacios de un usuario.
http://localhost:3000/api/spaceUser/:userId

### 📤POST

--Insertar nuevo espacio.
http://localhost:3000/api/space
{ *name, *admin_id, *plan_id, logo, file_type }

--Insertar usuario a espacio.
http://localhost:3000/api/addUserSpace
{ spaceId, userId, role }

### ♻️PUT

--Actualizar nombre de un espacio.
http://localhost:3000/api/upadateSpaceName/:spaceId
{ name }

--Actualizar plan de un espacio.
http://localhost:3000/api/upadateSpacePlan/:spaceId
{ plan_id }

--Actualizar foto de logo de un espacio.
http://localhost:3000/api/upadateSpaceLogo/:userId
{ image, file_type }

--Actualizar rol de un usuario en un espacio.
http://localhost:3000/api/updateSpaceUserRole/:userId/:spaceId
{ role } = req.body;

### 🧨DELETE

-Eliminar un espacio especifico.
http://localhost:3000/api/deleteSpace/:spaceId

-Eliminar un usuario del espacio.
http://localhost:3000/api/deleteUserSpace/:userId/:spaceId


## 💽Modulos

### 📥GET

--Todos los modulos disponibles.
http://localhost:3000/api/modules

--Espacios asignados a un proyectos
http://localhost:3000/api/modules/:spaceId

### 📤POST

--Insertar un modulo a un espacio.
http://localhost:3000/api/modSpace
{ spaceId, moduleId}

## 📃Projectos(PM)

### 📥GET

--Todos los projectos de un modulo
http://localhost:3000/api/projects/:moduleId

--Projecto en base a su ID.
http://localhost:3000/api/project/:projectId

--Todos los projectos de un usuario.
http://localhost:3000/api/userProjects/:id

--Todos los usuarios de un proyecto.
http://localhost:3000/api/projectUsers/:projectId

### 📤POST

--Crear nuevo proyecto.
http://localhost:3000/api/project
{ *title, *description, due_date, mod_space_id, banner , file_type }

--Asignar usuario a projecto.
http://localhost:3000/api/assigProject
{ *projectId, *userId, manager }

### ♻️PUT

--Actualizar un proyecto.
http://localhost:3000/api/project/:projectId
{ *title, *description, due_date }

--Actualizar banner de un proyecto.
http://localhost:3000/api/project/:projectId
{ *image, file_type }

--Actualizar rol de un usuario en un proyecto.
http://localhost:3000/api/userManager/:assigId
{ manager }

### 🧨DELETE

--Eliminar un proyecto.
http://localhost:3000/api/project/:projectId

--Eliminar usuario de un projecto.
http://localhost:3000/api/assigProject/:assigId


## 📑Tareas(PM)

### 📥GET

--Tarea mediante una ID.
http://localhost:3000/api/task/:taskId

--Todas las tareas de un projecto.
http://localhost:3000/api/projectTask/:projectId

--Todas las tareas de un projecto y un usuario especifico.
http://localhost:3000/api/userTask/:userId/:projectId

--Subtarea mediante una ID.
http://localhost:3000/api/subtask/:subtaskId

--Todas las subtareas de una tarea.
http://localhost:3000/api/taskSubtask/:taskId

--Todas las subtareas de una tarea y un usuario especifico.
http://localhost:3000/api/userSubtask/:userId/:taskId

### 📤POST

--Crear nueva tarea.
http://localhost:3000/api/task
{ *title, *description, status, priority, due_date }

--Asignar usuario a tarea.
http://localhost:3000/api/assigTask/:taskId
{ assigId }

--Crear nueva subtarea.
http://localhost:3000/api/subtask
{ *title, *description, status, priority }

--Asignar usuario a subtarea.
http://localhost:3000/api/assigSubtask/:subtaskId
{ assigId }

### ♻️PUT

--Actualizar una tarea.
http://localhost:3000/api/task/:taskId
{ *title, *description, due_date, status, priority }

--Actualizar una subtarea.
http://localhost:3000/api/subtask/:subtaskId
{ *title, *description, status, priority }


### 🧨DELETE

--Eliminar una tarea.
http://localhost:3000/api/task/:taskId

--Eliminar usuario de una tarea.
http://localhost:3000/api/assigTask/:assigId

--Eliminar una subtarea.
http://localhost:3000/api/subtask/:subtaskId

--Eliminar usuario de una subtarea.
http://localhost:3000/api/assigSubtask/:assigId


## 📑Documents(PM)

### 📥GET

--Documentos de un projecto,tarea o subtarea especifico.
http://localhost:3000/api/PmDocument/:param/:id

### 📤POST

--Subir documento a un projecto,tarea o subtarea.
http://localhost:3000/api/PmDocument/:param/:id
{ name, *image, file_type }

### 🧨DELETE
--Eliminar documento especifico.
http://localhost:3000/api/PmDocument/:documentId


## 📬Chat(CC)

### 📥GET

--Chats de un usuario.
http://localhost:3000/api/chat/:userId

### 📤POST

--Crear chat.
http://localhost:3000/api/chat
{ name, type, mod_space_id }

--Asignar usuario a chat.
http://localhost:3000/api/userChat
{ userId, chatId }

### ♻️PUT

--Editar chat.
http://localhost:3000/api/chat
{ name, chatId }

### 🧨DELETE

--Eliminar un chat.
http://localhost:3000/api/chat/:chatId

--Eliminar usuario de un chat.
http://localhost:3000/api/userChat
{ userId, chatId }

