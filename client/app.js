// Referencias a los elementos del DOM
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const loginScreen = document.getElementById('loginScreen');
const todoApp = document.getElementById('todoApp');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

// URL del servidor
const API_URL = 'http://localhost:3000/tasks';

// Credenciales ficticias para el login
const validUsername = "usuario";
const validPassword = "1234";

// Manejo del formulario de login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir recarga de página
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificación de credenciales
    if (username === validUsername && password === validPassword) {
        // Si las credenciales son correctas, ocultamos la pantalla de login y mostramos la To-Do App
        loginScreen.style.display = 'none';
        todoApp.style.display = 'block';
        loadTasks(); // Cargamos las tareas al iniciar la aplicación
    } else {
        // Si las credenciales son incorrectas, mostramos un mensaje de error
        loginMessage.textContent = 'Credenciales incorrectas. Inténtelo de nuevo.';
    }
});

// Función para obtener y mostrar todas las tareas
async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    taskList.innerHTML = ''; // Limpia la lista de tareas
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Campo de texto para editar la tarea
        const taskText = document.createElement('input');
        taskText.type = 'text';
        taskText.value = task.task;
        taskText.disabled = true; // Deshabilitado por defecto
        
        // Botón para habilitar la edición
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => {
            taskText.disabled = !taskText.disabled; // Alternar entre habilitar y deshabilitar
            if (!taskText.disabled) {
                editButton.textContent = 'Guardar';
            } else {
                editButton.textContent = 'Editar';
                updateTask(index, { task: taskText.value }); // Guardar la tarea editada
            }
        };

        // Botón para eliminar la tarea
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteTask(index);
        
        li.appendChild(taskText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Función para añadir una nueva tarea
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir recarga de página
    const newTask = { task: taskInput.value };  // Envolvemos el valor de la tarea en un objeto
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)  // Convertimos el objeto a JSON
    });
    if (response.ok) {
        taskInput.value = ''; // Limpiamos el campo de entrada
        loadTasks(); // Recargamos las tareas nuevamente
    }
});

// Función para eliminar una tarea
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    loadTasks(); // Recargamos las tareas
}

// Función para actualizar una tarea
async function updateTask(id, updatedTask) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    });
    loadTasks(); // Recargamos las tareas
}

// Cargamos las tareas al iniciar la página
loadTasks();
