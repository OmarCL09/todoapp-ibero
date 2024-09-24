// Importamos las dependencias necesarias
const express = require('express');
const app = express();
const cors = require('cors'); // Permite que el cliente haga peticiones al servidor
app.use(cors());
app.use(express.json()); // Middleware para manejar datos JSON

// Almacenamos las tareas en un array (puede usarse una base de datos en proyectos más avanzados)
let tasks = [];

// Ruta para obtener todas las tareas
app.get('/tasks', (req, res) => {
    res.json(tasks); // Enviamos las tareas almacenadas al cliente
});

// Ruta para crear una nueva tarea
app.post('/tasks', (req, res) => {
    const task = req.body.task;  // Extraemos la propiedad 'task' del cuerpo de la solicitud
    tasks.push({ task }); // Añadimos la tarea como un objeto
    res.status(201).json({ message: "Tarea creada", task }); // Enviamos respuesta exitosa con la tarea creada
});

// Ruta para actualizar una tarea
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const updatedTask = req.body.task; // Extraemos el valor 'task'
    if (tasks[id]) { // Verificamos si la tarea existe
        tasks[id].task = updatedTask; // Actualizamos la tarea correspondiente
        res.json({ message: "Tarea actualizada", task: updatedTask }); // Enviamos la tarea actualizada
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

// Ruta para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    if (tasks[id]) { // Verificamos si la tarea existe
        tasks.splice(id, 1); // Eliminamos la tarea del array
        res.status(204).send(); // Enviamos respuesta de éxito sin contenido
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

// Configuramos el servidor para que escuche en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
