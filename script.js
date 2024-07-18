// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    //function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localstorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        //task creation logic
        if (taskText === undefined){
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();
        }
        // Check if the task text is not empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new li element and set its text content to the task text
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add = ('remove-btn');

        // Assign an onclick event to the remove button to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the task item, and the task item to the task list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Clear the task input field
        taskInput.value = '';

       // Save task to Local Storage if 'save' is true
       if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); 
    }
}
      // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Attach event listeners
    addButton.addEventListener('click', function() {
        addTask();
     });
     
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
