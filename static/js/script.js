const apiURL = 'http://127.0.0.1:8000/api/tasks/';

// Fetch Tasks from API
async function fetchTasks() {
    try {
        const response = await fetch(apiURL);
        const tasks = await response.json();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span>${task.title}</span>
                <button onclick="deleteTask(${task.id})" class="btn btn-danger">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            taskList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Add a New Task
async function addTask() {
    const title = document.getElementById('task-title').value.trim();
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

// Delete a Task
async function deleteTask(id) {
    try {
        await fetch(`${apiURL}${id}/`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Load Tasks on Page Load
fetchTasks();
