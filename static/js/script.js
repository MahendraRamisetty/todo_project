const apiURL = 'http://127.0.0.1:8000/api/tasks/';

async function fetchTasks() {
    try {
        const response = await fetch(apiURL);
        const tasks = await response.json();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            taskList.innerHTML += `
                <li class="list-group-item">
                    <span>${task.title}</span>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </li>
            `;
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

async function addTask() {
    const title = document.getElementById('task-title').value;
    if (!title) {
        alert('Please enter a task title.');
        return;
    }

    try {
        await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, completed: false }),
        });
        document.getElementById('task-title').value = '';
        fetchTasks();
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${apiURL}${id}/`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

fetchTasks();
