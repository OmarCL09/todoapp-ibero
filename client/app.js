const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

// URL del servidor
const API_URL = 'http://localhost:3000/tasks';

// Función para obtener y mostrar todas las tareas
async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    taskList.innerHTML = ''; // limpia la lista
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.task; // mostrar solo el valor de la tarea
        
        // Botón para eliminar la tarea
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteTask(index);
        
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Función para añadir una nueva tarea
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir recarga de página
    const newTask = { task: taskInput.value };  // Envolvemos el valor en un objeto
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)  // Convertimos el objeto a JSON
    });
    if (response.ok) {
        taskInput.value = ''; // Limpiamos el campo de entrada
        loadTasks(); // Cargamos las tareas nuevamente
    }
});

// Función para eliminar una tarea
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    loadTasks(); // Recargamos las tareas
}

// Cargamos las tareas al iniciar la página
loadTasks();
