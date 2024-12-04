const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const showAllButton = document.getElementById('showAllButton');
const showCompletedButton = document.getElementById('showCompletedButton');
const showPendingButton = document.getElementById('showPendingButton');

let tasks = [];

function renderTasks(filter) {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true; 
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'gray';
        }

        li.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks(filter);
        });

        li.addEventListener('dblclick', () => {
            const newText = prompt('Редактировать задачу:', task.text);
            if (newText) {
                task.text = newText;
                renderTasks(filter);
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            tasks.splice(index, 1);
            renderTasks(filter);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks('all');
    }
});

showAllButton.addEventListener('click', () => renderTasks('all'));
showCompletedButton.addEventListener('click', () => renderTasks('completed'));
showPendingButton.addEventListener('click', () => renderTasks('pending'));

renderTasks('all');